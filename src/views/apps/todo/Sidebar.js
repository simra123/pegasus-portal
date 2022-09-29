// ** React Imports
import { Link } from "react-router-dom";

// ** Third Party Components
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Mail, Star, Check, Trash, Plus } from "react-feather";
import "../../../@core/scss/base/pages/app-todo.scss";
// ** Reactstrap Imports
import { Button, ListGroup, ListGroupItem } from "reactstrap";

const TodoSidebar = (props) => {
	// ** Props
	const {
		handleTaskSidebar,
		setMainSidebar,
		mainSidebar,
		dispatch,
		getTasks,
		params,
		setActiveTab,
	} = props;

	// ** Functions To Handle List Item Filter
	const handleFilter = (filter) => {
		dispatch(getTasks({ ...params, filter }));
	};

	const handleTag = (tag) => {
		dispatch(getTasks({ ...params, tag }));
	};

	// ** Functions To Active List Item
	const handleActiveItem = (value) => {
		setActiveTab(value);
		if (
			(params.filter && params.filter === value) ||
			(params.tag && params.tag === value)
		) {
			return true;
		} else {
			return false;
		}
	};

	// ** Functions To Handle Add Task Click
	const handleAddClick = () => {
		handleTaskSidebar();
		setMainSidebar();
	};

	return (
		<div className='sidebar-detached sidebar-left'>
			<div className='sidebar'>
				<div
					className={classnames("sidebar-shop", {
						show: mainSidebar === true,
					})}>
					<div className='todo-app-menu'>
						{/* <div className='add-task'>
							<Button
								color='primary'
								onClick={handleAddClick}
								block>
								Add Task
							</Button>
						</div> */}
						<PerfectScrollbar
							className='sidebar-menu-list'
							options={{ wheelPropagation: false }}>
							<ListGroup
								tag='div'
								className='list-group-filters'>
								<ListGroupItem
									tag={Link}
									to={"/apps/todo/products"}
									active={handleActiveItem("products")}
									onClick={() => handleFilter("important")}
									action>
									<Star
										className='me-75'
										size={18}
									/>
									<span className='align-middle'>Shop</span>
								</ListGroupItem>
								<ListGroupItem
									action
									tag={Link}
									to={"/apps/seller/view/9"}
									active={params.filter === "" && params.tag === ""}
									onClick={() => handleFilter("")}>
									<Mail
										className='me-75'
										size={18}
									/>
									<span className='align-middle'>Products</span>
								</ListGroupItem>
								<ListGroupItem
									tag={Link}
									to={"/apps/todo/completed"}
									active={handleActiveItem("completed")}
									onClick={() => handleFilter("completed")}
									action>
									<Check
										className='me-75'
										size={18}
									/>
									<span className='align-middle'>Account</span>
								</ListGroupItem>
								<ListGroupItem
									tag={Link}
									to={"/apps/todo/deleted"}
									active={handleActiveItem("deleted")}
									onClick={() => handleFilter("deleted")}
									action>
									<Trash
										className='me-75'
										size={18}
									/>
									<span className='align-middle'>Team</span>
								</ListGroupItem>
							</ListGroup>

							{/* <ListGroup className='list-group-labels'>
								<ListGroupItem
									active={handleActiveItem("team")}
									className='d-flex align-items-center'
									tag={Link}
									to='/apps/todo/tag/team'
									onClick={() => handleTag("team")}
									action>
									<span className='bullet bullet-sm bullet-primary me-1'></span>
									<span className='align-middle'>Team</span>
								</ListGroupItem>
								<ListGroupItem
									active={handleActiveItem("low")}
									className='d-flex align-items-center'
									tag={Link}
									to='/apps/todo/tag/low'
									onClick={() => handleTag("low")}
									action>
									<span className='bullet bullet-sm bullet-success me-1'></span>
									<span className='align-middle'>Low</span>
								</ListGroupItem>
								<ListGroupItem
									active={handleActiveItem("medium")}
									className='d-flex align-items-center'
									tag={Link}
									to='/apps/todo/tag/medium'
									onClick={() => handleTag("medium")}
									action>
									<span className='bullet bullet-sm bullet-warning me-1'></span>
									<span className='align-middle'>Medium</span>
								</ListGroupItem>
								<ListGroupItem
									active={handleActiveItem("high")}
									className='d-flex align-items-center'
									tag={Link}
									to='/apps/todo/tag/high'
									onClick={() => handleTag("high")}
									action>
									<span className='bullet bullet-sm bullet-danger me-1'></span>
									<span className='align-middle'>High</span>
								</ListGroupItem>
								<ListGroupItem
									active={handleActiveItem("update")}
									className='d-flex align-items-center'
									tag={Link}
									to='/apps/todo/tag/update'
									onClick={() => handleTag("update")}
									action>
									<span className='bullet bullet-sm bullet-info me-1'></span>
									<span className='align-middle'>Update</span>
								</ListGroupItem>
							</ListGroup> */}
						</PerfectScrollbar>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TodoSidebar;
