// ** React Imports
import { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// ** Third Party Components
import classnames from "classnames";

// ** Todo App Components
import Tasks from "./Tasks";
import Sidebar from "./Sidebar";
import TaskSidebar from "./TaskSidebar";
import { Menu, Grid, List } from "react-feather";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import {
	getTasks,
	updateTask,
	selectTask,
	addTask,
	deleteTask,
	reOrderTasks,
} from "./store";
import Products from "./products";
// ** Styles
import "../../../@core/scss/base/pages/app-todo.scss";
import "../../../@core/scss/base/pages/dashboard-ecommerce.scss";
import "@styles/react/apps/app-ecommerce.scss";

const TODO = () => {
	// ** States
	const [sort, setSort] = useState("");
	const [query, setQuery] = useState("");
	const [mainSidebar, setMainSidebar] = useState(false);
	const [openTaskSidebar, setOpenTaskSidebar] = useState(false);
	const [activeTab, setActiveTab] = useState("products");

	// ** Store Vars
	const dispatch = useDispatch();
	const store = useSelector((state) => state.todo);

	// ** URL Params
	const paramsURL = useParams();
	const params = {
		filter: paramsURL.filter || "",
		q: query || "",
		sortBy: sort || "",
		tag: paramsURL.tag || "",
	};

	// ** Function to handle Left sidebar & Task sidebar
	const handleMainSidebar = () => setMainSidebar(!mainSidebar);
	const handleTaskSidebar = () => setOpenTaskSidebar(!openTaskSidebar);

	// ** Get Tasks on mount & based on dependency change
	useEffect(() => {
		dispatch(
			getTasks({
				filter: paramsURL.filter || "",
				q: query || "",
				sortBy: sort || "",
				tag: paramsURL.tag || "",
			})
		);
	}, [store.tasks.length, paramsURL.filter, paramsURL.tag, query, sort]);

	console.log(activeTab, "activeTab");
	return (
		<Fragment>
			<Sidebar
				store={store}
				params={params}
				getTasks={getTasks}
				dispatch={dispatch}
				mainSidebar={mainSidebar}
				urlFilter={paramsURL.filter}
				setMainSidebar={setMainSidebar}
				handleTaskSidebar={handleTaskSidebar}
				setActiveTab={setActiveTab}
			/>
			<div className='content-detached content-right'>
				<div className='content-body'>
					{/* <div
						className={classnames("body-content-overlay", {
							show: mainSidebar === true,
						})}
						onClick={handleMainSidebar}></div> */}
					<button
						className='navbar-toggler shop-sidebar-toggler'
						onClick={handleMainSidebar}>
						<span className='navbar-toggler-icon d-block d-lg-none'>
							<Menu size={14} />
						</span>
					</button>

					{activeTab === "products" ? (
						<Products />
					) : store ? (
						<Products />
					) : null}
					{/* {tab === 'Intelligence' ? (
						<Dashboard data={companyDetails} />
					) : tab === 'Profile' ? (
						<Profile data={companyDetails} />
					) : tab === 'Contact' ? (
						<ContactTable data={companyDetails} />
					)  : null} */}
					<TaskSidebar
						store={store}
						params={params}
						addTask={addTask}
						dispatch={dispatch}
						open={openTaskSidebar}
						updateTask={updateTask}
						selectTask={selectTask}
						deleteTask={deleteTask}
						handleTaskSidebar={handleTaskSidebar}
					/>
				</div>
			</div>
		</Fragment>
	);
};

export default TODO;
