// ** React Imports
import { useState, useEffect, forwardRef } from "react";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import { getAllData, getData } from "@src/views/apps/user/store";
import CoreHttpHandler  from "../../../http/services/CoreHttpHandler";
// ** Third Party Components
import ReactPaginate from "react-paginate";
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";

// ** Reactstrap Imports
import { Card, Input, Row, Col, Button } from "reactstrap";

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";
// ** React Imports
import { Link } from "react-router-dom";
// ** Custom Components
import Avatar from "@components/avatar";
import Swal from "sweetalert2";

// ** Store & Actions
import { store } from "@store/store";
import { getUser } from "@src/views/apps/user/store";

// ** Icons Imports
import { Slack, User, Settings, Database, Edit2, Eye } from "react-feather";

// ** Reactstrap Imports
import { Badge} from "reactstrap";
import moment from "moment/moment";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
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


// ** Table Header
const CustomHeader = ({
	plan,
	handlePlanChange,
	handlePerPage,
	rowsPerPage,
	handleFilter,
	searchTerm,
}) => {
	return (
		<div className='invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75'>
			<Row>
				<Col
					xl='6'
					className='d-flex align-items-center p-0'>
					<div className='d-flex align-items-center w-100'>
						<label htmlFor='rows-per-page'>Show</label>
						<Input
							className='mx-50'
							type='select'
							id='rows-per-page'
							value={rowsPerPage}
							onChange={handlePerPage}
							style={{ width: "5rem" }}>
							<option value='10'>10</option>
							<option value='25'>25</option>
							<option value='50'>50</option>
						</Input>
						<label htmlFor='rows-per-page'>Entries</label>
					</div>
				</Col>
				<Col
					xl='6'
					className='d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pe-lg-1 p-0 mt-lg-0 mt-1'>
					<div className='d-flex align-items-center mb-sm-0 mb-1 me-1'>
						<label
							className='mb-0'
							htmlFor='search-invoice'>
							Search:
						</label>
						<Input
							type='text'
							value={searchTerm}
							id='search-invoice'
							className='ms-50 w-100'
							onChange={(e) => handleFilter(e.target.value)}
						/>
					</div>
					{/* <Input
						value={plan}
						type='select'
						style={{ width: "10rem" }}
						onChange={(e) => handlePlanChange(e.target.value)}>
						<option value=''>Select Role</option>
						<option value='basic'>Basic</option>
						<option value='company'>Company</option>
						<option value='enterprise'>Enterprise</option>
						<option value='team'>Team</option>
					</Input> */}
				</Col>
			</Row>
		</div>
	);
};

const Table = (props) => {
	const {path} = props
	const [type,setType] = useState('')
	// ** Store Vars
	const dispatch = useDispatch();
	const store = useSelector((state) => state.users);

	// ** States
	const [plan, setPlan] = useState("");
	const [sort, setSort] = useState("desc");
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [sortColumn, setSortColumn] = useState("id");
	const [data, setData] = useState([])

	const renderClient = (row) => {
    const stateNum = Math.floor(Math.random() * 6),
      states = [
        "light-success",
        "light-danger",
        "light-warning",
        "light-info",
        "light-primary",
        "light-secondary",
      ],
      color = states[stateNum];

    if (row.image) {
      return (
        <Avatar className="me-1" img={row.image} width="32" height="32" />
      );
    } else {
      return (
        <Avatar
          color={color || "primary"}
          className="me-1"
          content={row.username || "John Doe"}
          initials
        />
      );
    }
  	};

	// ** Renders Role Columns
	const renderRole = (row) => {
		const roleObj = {
		subscriber: {
			class: "text-primary",
			icon: User,
		},
		maintainer: {
			class: "text-success",
			icon: Database,
		},
		editor: {
			class: "text-info",
			icon: Edit2,
		},
		seller: {
			class: "text-warning",
			icon: User,
		},
		admin: {
			class: "text-danger",
			icon: Slack,
		},
		};

		const Icon = roleObj[row.role] ? roleObj[row.role].icon : Edit2;

		return (
		<span className="text-truncate text-capitalize align-middle">
			<Icon
			size={18}
			className={`${
				roleObj[row.role] ? roleObj[row.role].class : ""
			} me-50`}
			/>
			{row.role}
		</span>
		);
	};

	const statusObj = {
		pending: "light-warning",
		active: "light-success",
		inactive: "light-secondary",
	};


	const columns = [
    {
      name: "Name",
      sortable: true,
      minWidth: "297px",
      sortField: "username",
      selector: (row) => row.username,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          {renderClient(row)}
          <div className="d-flex flex-column">
            <Link
              to={`/apps/seller/view/9`}
              className="user_name text-truncate text-body"
              onClick={() => store.dispatch(getUser(row.id))}
            >
              <span className="fw-bold">{row.username}</span>
            </Link>
            <small className="text-truncate text-muted mb-0">{row.email}</small>
          </div>
        </div>
      ),
    },
    {
      name: "Role",
      sortable: true,
      minWidth: "172px",
      sortField: "role",
      selector: (row) => row.role,
      cell: (row) => renderRole(row),
    },
    {
      name: "Number",
      sortable: true,
      minWidth: "150px",
      sortField: "billing",
      selector: (row) => row.number,
      sortField: "billing",
      selector: (row) => row.number,
      cell: (row) => <span className="text-capitalize">{row.number}</span>,
    },
    {
      name: "Date",
      sortable: true,
      minWidth: "180px",
      sortField: "dt",
      selector: (row) => row.dt,
      cell: (row) => <span>{moment(row.dt).format("DD-MM-YY, h:mm a")}</span>,
    },
    {
      name: "Status",
      sortable: true,
      minWidth: "150px",
      sortField: "enabled",
      selector: (row) => (row.enabled == false ? "pending" : ""),
      cell: (row) => (
        <Badge
          className="text-capitalize"
          color={row.enabled == false ? statusObj["pending"] : ""}
          pill
        >
          {row.enabled == false ? "Pending" : "Pending"}
        </Badge>
      ),
    },
    {
      name: "Actions",
      minWidth: "50px",
      cell: (row) => (
        <Button color="danger" size="sm" onClick={(e) => Approval(row.id)}>
          Approve
        </Button>
        // <Link to={`/apps/seller/view/9`}>

        // </Link>
      ),
    },
    {
      name: "Details",
      minWidth: "50px",
      cell: (row) => (
         <Link to={`/apps/user/view/${row.id}`}>
			<Button color="primary" size="sm">
				View
			</Button>
        </Link>
      ),
    },
  ];

  	const columnsProduct = [
      {
        name: "Name",
        sortable: true,
        minWidth: "297px",
        sortField: "name",
        selector: (row) => row.name,
        cell: (row) => (
          <div className="d-flex justify-content-left align-items-center">
            <img
              width="60"
              height="35"
              className="img-fluid"
              src={
                row?.attachment?.val[
                  row?.attachment["type"]?.findIndex((t) => t == "0")
                ]
              }
            />
            <div className="d-flex flex-column">
             
                <span style={{marginLeft: "20px"}} className="fw-bold">{row.name}</span>

            </div>
          </div>
        ),
      },
      {
        name: "Product Category",
        sortable: true,
        minWidth: "220px",
        sortField: "product_category",
        selector: (row) => row.product_category,
        cell: (row) => (
          <span style={{ marginLeft: "30px" }}>{row.product_category}</span>
        ),
      },
      {
        name: "Date",
        sortable: true,
        minWidth: "180px",
        sortField: "dt",
        selector: (row) => row.dt,
        cell: (row) => <span>{moment(row.dt).format("DD-MM-YY, h:mm a")}</span>,
      },
      {
        name: "Status",
        sortable: true,
        minWidth: "150px",
        sortField: "enabled",
        selector: (row) => (row.enabled == false ? "pending" : ""),
        cell: (row) => (
          <Badge
            className="text-capitalize"
            color={row.enabled == false ? statusObj["pending"] : ""}
            pill
          >
            {row.enabled == false ? "pending" : "Pending"}
          </Badge>
        ),
      },
      {
        name: "Actions",
        minWidth: "50px",
        cell: (row) => (
          <Button color="danger" size="sm" onClick={(e) => Approval(row.id)}>
            Approve
          </Button>
          // <Link to={`/apps/seller/view/9`}>

          // </Link>
        ),
      },
      {
        name: "Details",
        minWidth: "50px",
        cell: (row) => (
          <Button color="primary" size="sm">
            View
          </Button>
          // <Link to={`/apps/seller/view/9`}>

          // </Link>
        ),
      },
    ];



	// ** Get data on mount
	useEffect(() => {
		dispatch(getAllData());
		dispatch(
			getData({
				sort,
				role: "",
				sortColumn,
				status: "",
				q: searchTerm,
				currentPlan: plan,
				page: currentPage,
				perPage: rowsPerPage,
			})
		);
	}, [dispatch, store.data.length]);

	const getUsersData = () =>{

		if (type == "users") {
			
			CoreHttpHandler.request(
				"users",
				"unapproved",
				{},
				(response) => {
				const res = response.data.data;
				setData(res);
				},
				(failure) => {}
			);
		} else if (type == "products") {
				CoreHttpHandler.request(
					"products",
					"unapproved",
					{},
					(response) => {
						const res = response.data.data;
						setData(res);
					},
              (failure) => {}
            );
		}

	}

	useEffect(() => {
	if(path){
		console.log(path,'pathhtth')
		if(path == "/apps/users/verify"){
			setType("users")
		}else if (path == "/apps/products/verify") setType("products");
	}
    getUsersData(path);
  }, [path,type]);

	// ** Function in get data on page change
	const handlePagination = (page) => {
		dispatch(
			getData({
				sort,
				role: "",
				status: "",
				sortColumn,
				q: searchTerm,
				currentPlan: plan,
				perPage: rowsPerPage,
				page: page.selected + 1,
			})
		);
		setCurrentPage(page.selected + 1);
	};

	// ** Function in get data on rows per page
	const handlePerPage = (e) => {
		const value = parseInt(e.currentTarget.value);
		dispatch(
			getData({
				sort,
				role: "",
				sortColumn,
				status: "",
				q: searchTerm,
				perPage: value,
				currentPlan: plan,
				page: currentPage,
			})
		);
		setRowsPerPage(value);
	};

	const Approval = (id) => {
		MySwal.fire({
            title: 'Are you sure?',
            icon: 'warning',
			padding: "50px",
            showCancelButton: true,
			customClass: {
        	confirmButton: 'btn btn-primary',
        	cancelButton: 'btn btn-outline-danger ms-1'
      		},
			background: "#020202",
      		buttonsStyling: false,
            confirmButtonText: 'Yes'
        }).then((result) => {
			console.log(result,'reddd')
			 if (result.value) {
					MySwal.fire({
						title: "Approved!",
						text: "Seller has been Approved",
						icon: "success",
						width: "450px",
						height: "300px",
						fontSize: "12px !important",
						background: "#020202",

					});
					if(type == "users"){
						CoreHttpHandler.request(
						"sellers",
						"approval",
						{ key: ":id", value: id },
						(response) => {
						if (response) {
							getUsersData();
						}
					}
					);
					}else if(type == "products"){
						CoreHttpHandler.request(
						"products",
						"approval",
						{ key: ":id", value: id },
						(response) => {
						if (response) {
							getUsersData();
						}
					}
					);
					}
					
			 	}

		},(error)=>{});
	};


	// ** Function in get data on search query change
	const handleFilter = (val) => {
		setSearchTerm(val);
		dispatch(
			getData({
				q: val,
				sort,
				role: "",
				sortColumn,
				status: "",
				currentPlan: plan,
				page: currentPage,
				perPage: rowsPerPage,
			})
		);
	};

	const handlePlanChange = (val) => {
		setPlan(val);
		dispatch(
			getData({
				sort,
				role: val,
				sortColumn,
				status: "",
				q: searchTerm,
				currentPlan: plan,
				page: currentPage,
				perPage: rowsPerPage,
			})
		);
	};

	// ** Custom Pagination
	const CustomPagination = () => {
		const count = Number(Math.ceil(store.total / rowsPerPage));

		return (
			<ReactPaginate
				previousLabel={""}
				nextLabel={""}
				pageCount={count || 1}
				activeClassName='active'
				forcePage={currentPage !== 0 ? currentPage - 1 : 0}
				onPageChange={(page) => handlePagination(page)}
				pageClassName={"page-item"}
				nextLinkClassName={"page-link"}
				nextClassName={"page-item next"}
				previousClassName={"page-item prev"}
				previousLinkClassName={"page-link"}
				pageLinkClassName={"page-link"}
				containerClassName={
					"pagination react-paginate justify-content-end my-2 pe-1"
				}
			/>
		);
	};
	// ** Table data to render
	const dataToRender = () => {
		console.log(type,'tytyty')
		if (type == "users") {

			return data.users;

		}else if (type == "products") {
			console.log(data,'dttaaa')
      		return data.data;
    	}
		// const filters = {
		// 	q: searchTerm,
		// };

		// const isFiltered = Object.keys(filters).some(function (k) {
		// 	return filters[k].length > 0;
		// });

		// if (store.data.length > 0) {
		// 	return store.data;
		// } else if (store.data.length === 0 && isFiltered) {
		// 	return [];
		// } else {
		// 	return store.allData.slice(0, rowsPerPage);
		// }
	};

	const handleSort = (column, sortDirection) => {
		setSort(sortDirection);
		setSortColumn(column.sortField);
		dispatch(
			getData({
				sort,
				role: "",
				sortColumn,
				status: "",
				q: searchTerm,
				currentPlan: plan,
				page: currentPage,
				perPage: rowsPerPage,
			})
		);
	};

	return (
		<Card>
			<div className='react-dataTable roles-table'>
				<DataTable
					noHeader
					subHeader
					pagination
					responsive
					paginationServer
					columns={type == "users" ? columns : type == "products" ? columnsProduct : []}
					onSort={handleSort}
					data={dataToRender()}
					sortIcon={<ChevronDown />}
					className='react-dataTable'
					paginationComponent={CustomPagination}
					selectableRowsComponent={BootstrapCheckbox}
					subHeaderComponent={
						<CustomHeader
							plan={plan}
							searchTerm={searchTerm}
							rowsPerPage={rowsPerPage}
							handleFilter={handleFilter}
							handlePerPage={handlePerPage}
							handlePlanChange={handlePlanChange}
						/>
					}
				/>
			</div>
		</Card>
	);
};

export default Table;
