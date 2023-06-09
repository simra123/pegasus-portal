// ** React Imports
import { useState, useEffect } from "react";
import CoreHttpHandler from "@src/http/services/CoreHttpHandler";
import { BsSearch } from "react-icons/bs";
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
		setChatsLoading,
		totalItemsNum,
	} = props;

	const [searchText, setSearchText] = useState("");
	const [filtered, setFiltered] = useState(null);
	const [chatLoading, setChatLoading] = useState(null);
	const [pageNo, setPageNo] = useState(1);
	const [pageNo2, setPageNo2] = useState(1);
	const searchCustomers = (page) => {
		setChatsLoading(true);

		CoreHttpHandler.request(
			"conversations",
			"numbers_search",
			{
				key: "pageVal",
				value: page == undefined ? 0 : page,
				key3: "typeVal",
				value3: activeTab == "sellers" ? "customer_seller" : "customer_rider",
				key2: "valSearch",
				value2: searchText,
			},
			(response) => {
				setChatsLoading(false);
				const res = response.data.data.data;
				console.log(res.data, "filtered");
				if (searchText) {
					if (res.data) {
						setFiltered(res.data);
					} else {
						setFiltered([]);
					}
				} else {
					setFiltered(null);
				}
			},
			(error) => {
				console.log(error);
			}
		);
	};
	function handleSearchText(event) {
		setSearchText(event.target.value);
		setChatLoading("on");
	}
	useEffect(() => {
		setSearchText("");
		setFiltered(null);
	}, [activeTab]);
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
							<>
								{activeTab == "sellers" ? (
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
								) : (
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
								)}
							</>
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
					<div className='chat-fied-search'>
						<div
							className='d-flex align-items-center m-1'
							style={{ width: "90%" }}>
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
									onClick={() => searchCustomers()}
									color='primary'>
									<BsSearch />
								</Button>
							</InputGroup>
						</div>
					</div>

					<PerfectScrollbar
						className='chat-user-list-wrapper list-group'
						options={{ wheelPropagation: false }}>
						<Row className='justify-content-center'>
							<Col
								xs='5'
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
								xs='5'
								className='m-0 p-0'>
								<Button
									className='w-100'
									color={"light"}
									onClick={() => setActiveTab("riders")}
									style={{
										borderRadius: "0px",
										border: "1px solid white",
										backgroundColor:
											activeTab == "sellers" ? "transparent" : " #f3ac3b",
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
