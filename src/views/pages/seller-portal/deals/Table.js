// ** React Imports
import { useState, useEffect, forwardRef } from "react";
import { useHistory, Link } from "react-router-dom";
import moment from "moment";
import logo from "@src/assets/images/logo/image.png";

import {
	Loader,
	Pagination,
	DatePicker,
	ToastAlertError,
	SearchFilters,
} from "../../reuseable";
import {
	Card,
	Input,
	Row,
	Col,
	Button,
	Badge,
	Table,
	CardBody,
	Label,
	InputGroup,
	InputGroupText,
	Modal,
	ModalHeader,
	ModalBody,
	Form,
} from "reactstrap";
import Select from "react-select";

import Avatar from "@components/avatar";

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";
import CoreHttpHandler from "../../../../http/services/CoreHttpHandler";
import { MdAddCircle } from "react-icons/md";
import { useForm } from "react-hook-form";
import { selectThemeColors } from "@utils";
import Swal from "sweetalert2";
import Flatpickr from "react-flatpickr";


// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
	<div className='form-check'>
		<Input
			type='checkbox'
			ref={ref}
			{...props}
		/>
	</div>
));

const SellersTable = (props) => {
	const {storeData, productsData} = props
	const handleDetails = (e) => {
		history.push({
			pathname: "/apps/sellers/details",
			state: { id: e.store_id, data: e },
		});
	};

	const [data, setData] = useState([]);
	const [tempTotal, setTempTotal] = useState(0);
	const [data2, setData2] = useState([]);
	const [loading, setLoading] = useState(true);
	const [totalPages, setTotalPages] = useState(0);
	const [picker, setPicker] = useState(new Date());
	const [filter, setFilter] = useState("all");
	const [searchVal, setSearchVal] = useState("");
	const [showCreate, setShowCreate] = useState(false);
	const [product_ids,setProduct_ids] = useState([])
	const [avatar, setAvatar] = useState(logo);
	const [name,setName] = useState("")
	const [regularPrice, setRegularPrice] = useState("");
	const [dealPrice, setDealPrice] = useState("");
	const [date, setDate] = useState("");
	const [image, setImage] = useState("");


	const [currentParams, setCurrentParams] = useState({
		limit: 10,
		page: 0,
	});

	const history = useHistory();

	const getDealsData = (start, end, val) => {
		setLoading(true);
		CoreHttpHandler.request(
			"deals",
			"fetch_deals",
			{
				store_id: storeData?.id,
				enabled: true,
				...currentParams,
			},
			(response) => {
				setLoading(false);
				const res = response.data.data.data;
				setTotalPages(res.totalPages);
				// if (filter == "all" || filter == "") {
				// 	setData2(res.data);
				// 	setTempTotal(res.totalPages);
				// }
				setData(res.hotDeals);
			},
			(failure) => {
				setLoading(false);
			}
		);
	};

	const {
       reset,
       control,
       setError,
       handleSubmit,
       formState: { errors },
     } = useForm({
       defaultValues: {
         name: "",
		 date: "",
		 regular_price: "",
		 deal_price: "",
		 image: "",
		 product_ids: []
       },
     });

	useEffect(() => {
		if(storeData){
			getDealsData();

		}
	}, [currentParams,storeData]);

	const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "suspended", label: "Suspended" },
  ];

  	const onChange = (e) => {
      const reader = new FileReader(),
        files = e.target.files;
      reader.onload = function () {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(files[0]);
    };

	const handleImgReset = () => {
      setAvatar(require("@src/assets/images/logo/image.png").default);
    };

	const onSubmit = (data) =>{
		let ids = product_ids.map(p => p.value)
		let startDate = moment(picker[0]).format("YYYY-MM-DD");
		let endDate = moment(picker[1]).format("YYYY-MM-DD");

	}
	
	const handleFilter = () => {
		if (filter) {
			setCurrentParams({
				limit: 10,
				page: 0,
			});
		}
		if (picker[0] && picker[1]) {
			getUsersData(
				`${moment(picker[0]).format("YYYY-MM-DD")} 00:00:00`,
				`${moment(picker[1]).format("YYYY-MM-DD")} 00:00:00`
			);
		} else {
			getUsersData();
		}
	};
	return (
    <>
      {showCreate ? (
        <>
          <Modal
            isOpen={showCreate}
            toggle={() => setShowCreate(!showCreate)}
            className="modal-dialog-centered modal-lg"
          >
            <ModalHeader
              className="bg-transparent"
              toggle={() => setShowCreate(!showCreate)}
            ></ModalHeader>
            <ModalBody className="px-sm-5 pt-50 pb-5">
              <div className="text-center mb-2">
                <h1 className="mb-1">Add New Deal</h1>
              </div>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className="gy-1 pt-75">
                  <Col md={6} xs={12}>
                    <Label className="form-label" for="firstName">
                      Name
                    </Label>
                    <Input
                      defaultValue=""
                      control={control}
                      id="firstName"
                      name="name"
                      placeholder="Deal name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Col>
                  <Col md={6} xs={12}>
                    <Label className="form-label" for="range-picker">
                      Date Picker
                    </Label>
                    <Flatpickr
                      placeholder="Add Deal Start Date and End Date"
                      style={{ fontSize: "11px" }}
                      value={picker}
                      id="range-picker"
                      className="form-control"
                      onChange={(date) => setPicker(date)}
                      options={{
                        mode: "range",
                      }}
                    />
                  </Col>
                  <Col md={6} xs={12}>
                    <Label className="form-label" for="firstName">
                      Regular Price
                    </Label>
                    <Input
                      defaultValue=""
                      control={control}
                      id="regular"
                      name="regular"
                      placeholder="Amount"
                      value={regularPrice}
                      onChange={(e) => setRegularPrice(e.target.value)}
                    />
                  </Col>
                  <Col md={6} xs={12}>
                    <Label className="form-label" for="range-picker">
                      Deal Price
                    </Label>
                    <Input
                      defaultValue=""
                      control={control}
                      id="Deal_price"
                      name="Deal_price"
                      placeholder="Amount"
                      value={dealPrice}
                      onChange={(e) => setDealPrice(e.target.value)}
                    />
                  </Col>
                  <Col xs={12} style={{ marginTop: "20px" }}>
                    <Label className="form-label" for="range-picker">
                      Add Products
                    </Label>
                    <Select
                      id="label"
                      name="label"
                      isClearable={false}
                      className="react-select"
                      classNamePrefix="select"
                      options={productsData}
                      theme={selectThemeColors}
                      isMulti={true}
                      value={product_ids.length ? [...product_ids] : null}
                      onChange={(data) => {
                        if (product_ids.length >= 2 && data.length >= 2) {
                          Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Product limit Exceeded",
                            confirmButtonColor: "#ff3600",
                            padding: "50px",
                            customClass: {
                              confirmButton: "btn btn-primary",
                              cancelButton: "btn btn-outline-danger ms-1",
                            },
                            background: "#020202",
                            buttonsStyling: false,
                          });
                          return;
                        }
                        setProduct_ids([...data]);
                      }}
                    />
                  </Col>
                  <div className="me-25">
                    <img
                      className="rounded me-50"
                      src={avatar}
                      alt="Generic placeholder image"
                      height="150"
                      width="180"
                    />
                  </div>
                  <div style={{ marginTop: "10px" }}>
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
                    <p className="mb-0">
                      Allowed JPG or PNG. Max size of 800kB
                    </p>
                  </div>
                  <Col xs={12} className="text-center mt-2 pt-50">
                    <Button type="submit" className="me-1" color="primary">
                      Submit
                    </Button>
                    <Button
                      type="reset"
                      color="secondary"
                      outline
                      onClick={() => {
                        // handleReset();
                        setShowCreate(false);
                      }}
                    >
                      Discard
                    </Button>
                  </Col>
                </Row>
              </Form>
            </ModalBody>
          </Modal>
        </>
      ) : null}
      <Card>
        <CardBody>
          {/* <SearchFilters
            filter={filter}
            setFilter={setFilter}
            setSearchVal={setSearchVal}
            searchVal={searchVal}
            getData={getDealsData}
            data2={data2}
            handleFilter={handleFilter}
            setPicker={setPicker}
            picker={picker}
            setData={setData}
            tempTotal={tempTotal}
            setTotalPages={setTotalPages}
          /> */}
          {!loading && data ? (
            <>
              <Table striped responsive className="border-none">
                <thead>
                  <tr style={{ fontSize: "11px" }}>
                    <th>SN</th>
                    <th>Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Status</th>
                    <th>Created Date</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((deal, index) => {
                    return (
                      <tr key={deal.id}>
                        <td>{index + 1}</td>

                        <td>{deal.name}</td>
                        <td>{moment(deal.start_date).format("YYYY-MM-DD")}</td>
                        <td>{moment(deal.end_date).format("YYYY-MM-DD")}</td>
                        <td>
                          {deal.enabled ? (
                            <Badge pill color="light-primary" className="mr-1">
                              Active
                            </Badge>
                          ) : (
                            <Badge pill color="light-danger" className="mr-1">
                              In Review
                            </Badge>
                          )}
                        </td>
                        <td>{moment(deal.dt).format("YYYY-MM-DD")}</td>

                        <td>
                          {" "}
                          <Button
                            color="primary"
                            size="sm"
                            onClick={() => handleDetails(deal)}
                          >
                            view
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </>
          ) : null}
          {!loading && !data?.length && (
            <div className="text-ceter">No Data Found</div>
          )}
          <Loader loading={loading} />
        </CardBody>
      </Card>
      <Pagination
        total={totalPages}
        handlePagination={(e) =>
          setCurrentParams({ limit: 10, page: e.selected })
        }
      />
      <MdAddCircle
        color="#f3ac3b"
        size="35"
        style={{
          marginTop: "200px",
          cursor: "pointer",
          float: "right",
          marginRight: "30px",
        }}
        onClick={() => setShowCreate(true)}
      />
    </>
  );
};

export default SellersTable;
