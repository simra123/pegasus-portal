// ** React Imports
import { useState, useEffect } from "react";
import CoreHttpHandler from "@src/http/services/CoreHttpHandler";

// ** Custom Components
import Avatar from "@components/avatar";
// ** Utils

// ** Third Party Components
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";
import { X, Search, CheckSquare, Bell, User, Trash } from "react-feather";
import {
	CardText,
	InputGroup,
	Button,
	Row,
	Col,
	InputGroupText,
	Badge,
	Input,
	Spinner,
} from "reactstrap";
import ContactList from "./contactList";

const SidebarLeft = (props) => {
	// ** Props & Store
	const {
		sidebar,
		handleSidebar,
		userSidebarLeft,
		handleUserSidebarLeft,
		sellerChats,
		riderChats,
		selectedRecipient,
		latestMessage,
		isShown,
		isActive,
		getNumberSellers,
		getNumberRiders,
		activeTab,
		setActiveTab,
		updateAgentStatus,
		status,
		totalItemsNum,
	} = props;

	const [searchText, setSearchText] = useState("");
	const [filtered, setFiltered] = useState(null);
	const [chatLoading, setChatLoading] = useState(null);
	const [pageNo, setPageNo] = useState(1);
	const [pageNo2, setPageNo2] = useState(1);
	const searchCustomers = () => {
		// CoreHttpHandler.request(
		// 	"conversations",
		// 	"search_customer",
		// 	{
		// 		search: searchText,
		// 		type: "history",
		// 	},
		// 	(response) => {
		// 		setChatLoading(null);
		// 		if (searchText) {
		// 			if (response.data.data.list) {
		// 				setFiltered([response.data.data.list]);
		// 			} else {
		// 				setFiltered([]);
		// 			}
		// 		} else {
		// 			setFiltered(null);
		// 		}
		// 	},
		// 	(error) => {
		// 		console.log(error);
		// 	}
		// );
	};
	function handleSearchText(event) {
		setSearchText(event.target.value);
		setChatLoading("on");
	}

	useEffect(() => {
		//getData();
		searchCustomers();
	}, [searchText]);
	console.log(
		totalItemsNum,
		riderChats.length > Number(props.totalItemsNum),
		"items"
	);
	// ** Renders Chat
	const renderChats = () => {
		return (
			<>
				{filtered == null ? (
					activeTab == "sellers" ? (
						sellerChats?.map((item) => {
							return (
								<ContactList
									selectedRecipient={selectedRecipient}
									isShown={isShown}
									key={item.room_id}
									id={item.room_id}
									activeTab={activeTab}
									contact={item}
									onContactClick={(e) => props.onContactClick(item)}
									isActive={isActive}
								/>
							);
						})
					) : (
						riderChats?.map((item) => {
							return (
								<ContactList
									selectedRecipient={selectedRecipient}
									isShown={isShown}
									key={item.order_id}
									activeTab={activeTab}
									id={item.order_id}
									contact={item}
									onContactClick={(e) => props.onContactClick(item)}
									isActive={isActive}
								/>
							);
						})
					)
				) : filtered?.length ? (
					filtered.map((item) => {
						return (
							<ContactList
								selectedRecipient={selectedRecipient}
								latestMessage={latestMessage}
								isShown={isShown}
								key={item.id}
								contact={item}
								onContactClick={(e) => props.onContactClick(item)}
								isActive={isActive}
							/>
						);
					})
				) : (
					<p style={{ width: "100%", textAlign: "center" }}>
						no customers found
					</p>
				)}
			</>
		);
	};

	return (
		<div className='sidebar-left'>
			<div className='sidebar'>
				<div
					className={classnames("sidebar-content", {
						show: sidebar === true,
					})}>
					<div
						className='sidebar-close-icon'
						onClick={handleSidebar}>
						<X size={14} />
					</div>
					<div className='chat-fixed-search'>
						<div className='d-flex align-items-center w-100'>
							{/* <div
								className='sidebar-profile-toggle'
								onClick={handleUserSidebarLeft}>
								{UserData && UserData?.image == "N/A" ? (
									<div
										className='bg-primary rounded-circle h-4 w-4 text-light font-semibold'
										style={{ padding: "12px 15px", fontWeight: "600" }}>
										<span>
											{UserData && UserData.username.substr(0, 1).toUpperCase()}
										</span>
									</div>
								) : (
									<Avatar
										img={UserData?.image}
										imgHeight='40'
										imgWidth='40'
										status={userOnline}
									/>
								)}
							</div> */}
							<InputGroup className='input-group-merge ml-1 w-100'>
								<Input
									placeholder='Search by number 92xxxxxxx'
									disableUnderline
									fullWidth
									className='round'
									value={searchText}
									onChange={handleSearchText}
								/>

								<Button
									className='round'
									style={{ backgroundColor: "transparent" }}>
									{chatLoading ? (
										<Spinner
											color='primary'
											size='sm'
										/>
									) : null}
								</Button>
							</InputGroup>
						</div>
					</div>

					<PerfectScrollbar
						className='chat-user-list-wrapper list-group'
						options={{ wheelPropagation: false }}>
						<Row>
							<Col
								xs='6'
								className='m-0 p-0'>
								<Button
									className='w-100'
									onClick={() => setActiveTab("sellers")}
									color={activeTab == "seller" ? "primary" : "light"}
									style={{
										borderRadius: "0px",
										border: "1px solid white",
										backgroundColor:
											activeTab == "sellers" ? " #f3ac3b" : "transparent",
										color: "white",
									}}>
									Seller
								</Button>
							</Col>
							<Col
								xs='6'
								className='m-0 p-0'>
								<Button
									className='w-100'
									color={activeTab == "riders" ? "primary" : "light"}
									onClick={() => setActiveTab("riders")}
									style={{
										borderRadius: "0px",
										border: "1px solid white",
										backgroundColor:
											activeTab == "riders" ? " #f3ac3b" : "transparent",
										color: "white",
									}}>
									Rider
								</Button>
							</Col>
						</Row>
						<h4 className='chat-list-title'>Chats</h4>
						{props.chatsLoading ? (
							<div style={{ width: "100%", textAlign: "center" }}>
								<Spinner
									color='primary'
									size={30}
								/>
							</div>
						) : (
							<ul className='chat-users-list chat-list media-list'>
								{renderChats()}
							</ul>
						)}
						{activeTab == "sellers" ? (
							<Button
								color='primary'
								size='sm'
								onClick={() => {
									setPageNo(pageNo + 1);
									getNumberSellers(pageNo);
								}}
								style={{
									display:
										sellerChats.length >= Number(props.totalItemsNum) ||
										props.chatsLoading
											? "none"
											: "block",
									width: "150px",
									margin: "10px auto",
								}}>
								Load More
							</Button>
						) : (
							<Button
								color='primary'
								size='sm'
								onClick={() => {
									setPageNo2(pageNo + 1);
									getNumberRiders(pageNo2);
								}}
								style={{
									display:
										riderChats.length >= Number(props.totalItemsNum) ||
										props.chatsLoading
											? "none"
											: "block",
									width: "150px",
									margin: "10px auto",
								}}>
								Load More
							</Button>
						)}
					</PerfectScrollbar>
				</div>
			</div>
		</div>
	);
};

export default SidebarLeft;
