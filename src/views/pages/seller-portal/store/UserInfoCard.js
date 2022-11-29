// ** React Imports
import { useState, Fragment, useEffect } from 'react'

// ** Reactstrap Imports
import { Row, Col, Card, Form, CardBody, Button, Badge, Modal, Input, Label, ModalBody, ModalHeader } from 'reactstrap'

// ** Third Party Components
import Swal from 'sweetalert2'
import Select from 'react-select'
import { Check, Briefcase, X, Navigation } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'
import withReactContent from 'sweetalert2-react-content'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import store from '../../invoice/store'
import CoreHttpHandler from '../../../../http/services/CoreHttpHandler'
import { LoadingButton } from '../../reuseable'
import ContentUploadHandler from '../../../../http/services/ContentUploadHandler'
import { url } from '../../../../image-service-url'

const roleColors = {
  editor: 'light-info',
  admin: 'light-danger',
  author: 'light-warning',
  maintainer: 'light-success',
  subscriber: 'light-primary'
}

const statusColors = {
  active: 'light-success',
  pending: 'light-warning',
  inactive: 'light-secondary'
}

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'suspended', label: 'Suspended' }
]

const countryOptions = [
  { value: 'uk', label: 'UK' },
  { value: 'usa', label: 'USA' },
  { value: 'france', label: 'France' },
  { value: 'russia', label: 'Russia' },
  { value: 'canada', label: 'Canada' }
]

const categories = [
  { value: 'vape', label: 'Vape' },
  { value: 'E-cigs', label: 'E-cigs' }
]

const MySwal = withReactContent(Swal)

const UserInfoCard = ({ storeData, orders, getStores }) => {
  // ** State
  const [show, setShow] = useState(false);

  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: storeData?.name,
    },
  });
  // ** render user img
  const [category, setCategory] = useState(storeData?.type);
  const [name, setName] = useState(storeData?.name);
  const [city, setCity] = useState(storeData?.city);
  const [number, setNumber] = useState(storeData?.number);
  const [country, setCountry] = useState(storeData?.country);
  const [description, setDescription] = useState(storeData?.description);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(storeData?.image);
  const [avatar, setAvatar] = useState(storeData?.image);
  const [fileName, setFileName] = useState(storeData?.image);

  useEffect(() => {
    if (storeData) {
      setName(storeData?.name);
      setCity(storeData?.city);
      setNumber(storeData?.number);
      setCountry(storeData?.country);
      setDescription(storeData?.description);
      setCategory({ label: storeData?.type, type: storeData?.type });
      setImage(storeData?.image);
      setAvatar(storeData?.image);
    }
  }, [storeData]);

  const renderUserImg = () => {
    // if (selectedUser !== null && selectedUser.avatar.length) {
    return (
      <img
        height="100"
        width="160"
        alt="user-avatar"
        src={avatar?.includes("data") ? avatar : `${url}${avatar}`}
        className="img-fluid rounded mt-3 mb-2"
      />
    );
  };

  const onSubmit = () => {
    setLoading(true);
    let data = {
      name,
      description,
      type: category.type,
      country,
      store_id: storeData.id,
      city,
      location: storeData?.location,
      number,
    };
    if (typeof image == "object") {
      const _data = new FormData();

      _data.append("file", image, `${new Date().getTime()}_${fileName.name}`);
      ContentUploadHandler.request(
        "content",
        "upload",
        {
          params: _data,
        },
        (response) => {
          data["image"] = response.data.data.file;

          CoreHttpHandler.request(
            "stores",
            "update_seller",
            data,
            (response) => {
              setLoading(false);
              document.body.style.opacity = 1;
              Swal.fire({
                icon: "success",
                title: "Success",
                text: "Successfully Updated Store.",
                showCancelButton: false,
                customClass: {
                  confirmButton: "btn btn-primary",
                  cancelButton: "btn btn-outline-danger ms-1",
                },
                background: "#020202",
              });
              setShow(false);
              getStores();
              //  getDealsData();
              //  setShowCreate(false);
            },
            (error) => {}
          );
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      data["image"] = image;
      CoreHttpHandler.request(
        "stores",
        "update_seller",
        data,
        (response) => {
          setLoading(false);
          document.body.style.opacity = 1;
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Successfully Updated Store.",
            showCancelButton: false,
            customClass: {
              confirmButton: "btn btn-primary",
              cancelButton: "btn btn-outline-danger ms-1",
            },
            background: "#020202",
          });
          setShow(false);
          getStores();
          //  getDealsData();
          //  setShowCreate(false);
        },
        (error) => {}
      );
    }
  };

  const onChange = (e) => {
    let _name = e.target.files[0].name;

    if (!_name.includes(".png")) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "PNG images are allowed",
        confirmButtonColor: "#ff3600",
      });
      return;
    }
    const reader = new FileReader(),
      files = e.target.files;
    reader.onload = function () {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(files[0]);
    _name = _name.replace(/\s/g, "");
    setFileName(_name);
    setImage(e.target.files[0]);
  };

  const handleImgReset = () => {
    setImage(image);
  };

  return (
    <Fragment>
      <div>
        <Card style={{ width: "350px" }}>
          <CardBody>
            <div className="user-avatar-section">
              <div className="d-flex align-items-center flex-column">
                {renderUserImg()}
                <div className="d-flex flex-column align-items-center text-center">
                  <div className="user-info">
                    <h4>{storeData?.name}</h4>
                    {/* {storeData !== null ? (
                    <Badge color="green" className='text-capitalize'>
                      {selectedUser.role}
                    </Badge>
                  ) : null} */}
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-around my-2 pt-75">
              <div className="d-flex align-items-start me-2">
                <Badge color="light-primary" className="rounded p-75">
                  <Check className="font-medium-2" />
                </Badge>
                <div className="ms-75">
                  <h4 className="mb-0">1.23k</h4>
                  <small>Reviews</small>
                </div>
              </div>
              <div className="d-flex align-items-start">
                <Badge color="light-primary" className="rounded p-75">
                  <Briefcase className="font-medium-2" />
                </Badge>
                <div className="ms-75">
                  <h4 className="mb-0">{orders?.count}</h4>
                  <small>Total Orders</small>
                </div>
              </div>
            </div>
            <h4 className="fw-bolder border-bottom pb-50 mb-1">Details</h4>
            <div className="info-container">
              {storeData !== null ? (
                <ul className="list-unstyled">
                  <li className="mb-75">
                    <span className="fw-bolder me-25">Name:</span>
                    <span>{storeData?.name}</span>
                  </li>
                  <li className="mb-75">
                    <span className="fw-bolder me-25">Status:</span>
                    <Badge className="text-capitalize" color="primary">
                      Active
                    </Badge>
                  </li>
                  <li className="mb-75">
                    <span className="fw-bolder me-25">Type:</span>
                    <span className="text-capitalize">{storeData?.type}</span>
                  </li>
                  <li className="mb-75">
                    <span className="fw-bolder me-25">City</span>
                    <span>{storeData?.city}</span>
                  </li>
                  <li className="mb-75">
                    <span className="fw-bolder me-25">Description:</span>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: storeData?.description,
                      }}
                    ></div>
                  </li>
                </ul>
              ) : null}
            </div>
            <div className="d-flex justify-content-center pt-2">
              <Button
                color="primary"
                onClick={() => {
                  setShow(true);
                }}
              >
                Edit
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>

      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}
        ></ModalHeader>
        <ModalBody className="px-sm-5 pt-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">Edit Store Information</h1>
          </div>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            <Row>
              <Col sm="6" className="mb-1">
                <div className="d-flex">
                  <div className="me-25">
                    <img
                      className="rounded me-50"
                      src={
                        avatar?.includes("data") ? avatar : `${url}${avatar}`
                      }
                      alt="Generic placeholder image"
                      height="100"
                      width="100"
                    />
                  </div>
                  <div
                    className="d-flex align-items-end mt-75 ms-1"
                    style={{ float: "right" }}
                  >
                    <div>
                      <Button
                        tag={Label}
                        className="mb-75 me-75"
                        size="sm"
                        color="primary"
                      >
                        Upload
                        <Input
                          type="file"
                          onChange={onChange}
                          hidden
                          accept="image/*"
                        />
                      </Button>
                      <Button
                        className="mb-75"
                        color="secondary"
                        size="sm"
                        outline
                        onClick={handleImgReset}
                      >
                        Reset
                      </Button>
                      <p className="mb-0">Allowed PNG. Max size of 1 MB</p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="gy-1 pt-75">
              <Col md={6} xs={12}>
                <Label className="form-label" for="firstName">
                  Store Name
                </Label>
                <Input
                  defaultValue=""
                  control={control}
                  id="firstName"
                  name="firstName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  // render={({ field }) => (
                  //   <Input {...field} id='firstName' placeholder='John' invalid={errors.firstName && true} />
                  // )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="lastName">
                  Location
                </Label>
                <br></br>

                <a
                  style={{ paddingTop: "20x" }}
                  href={`https://www.google.com/maps/place/${storeData?.location}`}
                  target="_blank"
                >
                  <Navigation size="20" />
                </a>
              </Col>
              <Col xs={12}>
                <Label className="form-label" for="username">
                  Description
                </Label>
                <Input
                  defaultValue=""
                  control={control}
                  id="username"
                  name="username"
                  type="textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  // render={({ field }) => (
                  //   <Input {...field} id='username' placeholder='john.doe.007' invalid={errors.username && true} />
                  // )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="billing-email">
                  Type
                </Label>

                <Select
                  id="status"
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={categories}
                  theme={selectThemeColors}
                  value={category}
                  onChange={(e) => setCategory(e)}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="status">
                  Contact Number
                </Label>
                <Input
                  value={number}
                  type="text"
                  onChange={(e) => setNumber(e.target.value)}
                />
              </Col>
              <Col md={6} xs={12} style={{ zIndex: 20 }}>
                <Label className="form-label" for="language">
                  City
                </Label>
                <Input
                  value={city}
                  type="text"
                  onChange={(e) => setCity(e.target.value)}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="country">
                  Country
                </Label>
                <Input
                  value={country}
                  type="text"
                  onChange={(e) => setCountry(e.target.value)}
                />
              </Col>
              <Col xs={12} className="text-center mt-2 pt-50">
                <LoadingButton
                  text={"Submit"}
                  className="me-1"
                  loading={loading}
                  // onClick={() => handleSubmit()}
                />
                <Button
                  type="reset"
                  color="secondary"
                  onClick={() => setShow(!show)}
                  outline
                >
                  Discard
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default UserInfoCard
