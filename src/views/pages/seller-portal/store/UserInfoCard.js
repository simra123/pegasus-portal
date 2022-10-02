// ** React Imports
import { useState, Fragment } from 'react'

// ** Reactstrap Imports
import { Row, Col, Card, Form, CardBody, Button, Badge, Modal, Input, Label, ModalBody, ModalHeader } from 'reactstrap'

// ** Third Party Components
import Swal from 'sweetalert2'
import Select from 'react-select'
import { Check, Briefcase, X } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'
import withReactContent from 'sweetalert2-react-content'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'

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

const languageOptions = [
  { value: 'english', label: 'English' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'french', label: 'French' },
  { value: 'german', label: 'German' },
  { value: 'dutch', label: 'Dutch' }
]

const MySwal = withReactContent(Swal)

const UserInfoCard = ({ storeData }) => {
  // ** State
  const [show, setShow] = useState(false)

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
  const renderUserImg = () => {
    // if (selectedUser !== null && selectedUser.avatar.length) {
      return (
        <img
          height='100'
          width='160'
          alt='user-avatar'
          src={storeData?.image}
          className='img-fluid rounded mt-3 mb-2'
        />
      )
  }
  console.log(storeData,'glglg')
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
                    <h4>The Vape Company </h4>
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
                  <h4 className="mb-0">568</h4>
                  <small>Orders Completed</small>
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
                    <span>
                      {"  "}Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book.
                    </span>
                  </li>
                </ul>
              ) : null}
            </div>
            <div className="d-flex justify-content-center pt-2">
              <Button
                color="primary"
                onClick={() => {
                  setShow(true)
                }}
              >
                Edit
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>

      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 pt-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>Edit Store Information</h1>
            <p>Updating store details will receive a privacy audit.</p>
          </div>
          <Form>
            <Row className='gy-1 pt-75'>
              <Col md={6} xs={12}>
                <Label className='form-label' for='firstName'>
                  Store Name
                </Label>
                <Input
                  defaultValue=''
                  control={control}
                  id='firstName'
                  name='firstName'
                  // render={({ field }) => (
                  //   <Input {...field} id='firstName' placeholder='John' invalid={errors.firstName && true} />
                  // )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='lastName'>
                  Status
                </Label>
                <Input
                  defaultValue=''
                  control={control}
                  id='lastName'
                  name='lastName'
                  // render={({ field }) => (
                  //   <Input {...field} id='lastName' placeholder='Doe' invalid={errors.lastName && true} />
                  // )}
                />
              </Col>
              <Col xs={12}>
                <Label className='form-label' for='username'>
                  Description
                </Label>
                <Input
                  defaultValue=''
                  control={control}
                  id='username'
                  name='username'
                  // render={({ field }) => (
                  //   <Input {...field} id='username' placeholder='john.doe.007' invalid={errors.username && true} />
                  // )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='billing-email'>
                  Type
                </Label>
                <Input
                  type='email'
                  id='billing-email'
                  // defaultValue={selectedUser.email}
                  // placeholder='example@domain.com'
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='status'>
                  Contact
                </Label>
                <Select
                  id='status'
                  isClearable={false}
                  className='react-select'
                  classNamePrefix='select'
                  // options={statusOptions}
                  // theme={selectThemeColors}
                  // defaultValue={statusOptions[statusOptions.findIndex(i => i.value === selectedUser.status)]}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='language'>
                  City
                </Label>
                <Select
                  id='language'
                  isClearable={false}
                  className='react-select'
                  classNamePrefix='select'
                  // options={languageOptions}
                  // theme={selectThemeColors}
                  // defaultValue={languageOptions[0]}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='country'>
                  Country
                </Label>
                <Select
                  id='country'
                  isClearable={false}
                  className='react-select'
                  classNamePrefix='select'
                  // options={countryOptions}
                  // theme={selectThemeColors}
                  // defaultValue={countryOptions[0]}
                />
              </Col>
              <Col xs={12} className='text-center mt-2 pt-50'>
                <Button type='submit' className='me-1' color='primary'>
                  Submit
                </Button>
                <Button
                  type='reset'
                  color='secondary'
                  outline
                  // onClick={() => {
                  //   handleReset()
                  //   setShow(false)
                  // }}
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
}

export default UserInfoCard
