// ** React Imports
import { Fragment, useState, useEffect } from "react";
import WebSocket from "@src/socket/WebSocket";
import React, { useRef } from "react";
// ** Chat App Component Imports
import Chat from "./chat";
import Sidebar from "./SidebarLeft";
import copy from "copy-to-clipboard";
//import { RecordState } from "audio-react-recorder";

import CoreHttpHandler from "@src/http/services/CoreHttpHandler";

// ** Third Party Components
import classnames from "classnames";

// ** Store & Actions
//import { EventEmitter } from "../../../events";
import { useDispatch, useSelector } from "react-redux";
import "@styles/base/pages/app-chat.scss";
import "@styles/base/pages/app-chat-list.scss";
import { RiChatOffLine } from "react-icons/ri";
import { ToastAlertError, ToastAlertSuccess } from "../reuseable";
import { Button } from "reactstrap";
const AppChat = () => {
	// ** Store Vars
	const dispatch = useDispatch();

	// ** States
	const [user, setUser] = useState({});
	const [sidebar, setSidebar] = useState(false);
	const [userSidebarRight, setUserSidebarRight] = useState(false);
	const [userSidebarLeft, setUserSidebarLeft] = useState(false);
	const [activeTab, setActiveTab] = useState("sellers");

	// ** Sidebar & overlay toggle functions
	const handleSidebar = () => setSidebar(!sidebar);
	const handleUserSidebarLeft = () => setUserSidebarLeft(!userSidebarLeft);
	const handleUserSidebarRight = () => setUserSidebarRight(!userSidebarRight);
	const handleOverlayClick = () => {
		setSidebar(false);
		setUserSidebarRight(false);
		setUserSidebarLeft(false);
	};

	// ** Set user function for Right Sidebar

	const [mobileChatsSidebarOpen, setmobileChatsSidebarOpen] = useState(false);
	const [numbers, setnumbers] = useState([]);
	const [dummy, setDummy] = useState(null);
	const [lastmessage, setlastmessage] = useState([]);
	const [messages, setmessages] = useState([]);
	const [message, setmessage] = useState(null);
	const [showLatestMessage, setshowLatestMessage] = useState(false);
	const [userDrawer, setuserDrawer] = useState(false);
	const [selectedRecipient, setselectedRecipient] = useState(null);
	const [removeConversation, setRemoveConversation] = useState(null);
	const [moreMenuEl, setMoreMenuEl] = useState(null);
	const [anchorEl, setAnchorEl] = useState(null);
	const [enableAudioNotification, setEnableAudioNotification] = useState(false);
	const [totalItemsNum, setTotalItemsNum] = useState(0);
	const [isShowChat, setIsShowChat] = useState(true);
	const [selectedLabel, setSelectedLabel] = useState(null);
	const [labelMessage, setLabelMessage] = useState("");

	const [listPage, setListPage] = useState(0);
	const [msgPage, setMsgPage] = useState(0);
	const [chatsLoading, setChatsLoading] = useState(false);
	const [msgsLoading, setMsgsLoading] = useState(false);
	const [latestMessage, setLatestMessage] = useState([]);
	const [totalPages, setTotalPages] = useState(0);
	const [totalItems, setTotalItems] = useState(0);

	const [sound, setSound] = useState("");
	const [flag, setFlag] = useState(false);
	const [showSendIcon, setShowSendIcon] = useState(true);
	const [riderChats, setRiderChats] = useState([]);
	const [isActive, setIsActive] = useState("");
	const [timer, setTimer] = useState("");
	const [audioLoader, setAudioLoader] = useState(true);
	const [counts, setCounts] = useState("0");
	const [loadMore, setLoadMore] = useState(false);
	const [status, setStatus] = useState("offline");
	const [generateHist, setGenerateHist] = useState(false);

	const selectedRecipientt = (e) => {
		if (sidebar) {
			setSidebar(!sidebar);
		}
		setCounts("0");

		if (sound) {
			setShowSendIcon(true);
			setFlag(false);
			setSound("");
		}
		if (activeTab == "sellers") {
			setIsActive(e.room_id);
			getConversation(e);
		} else {
			setIsActive(e.order_id);
			getRiderConversation(e);
		}

		setselectedRecipient(e);
		setmobileChatsSidebarOpen(false);
	};

	const getNumberSellers = (page) => {
		setChatsLoading(true);

		CoreHttpHandler.request(
			"conversations",
			"seller_customer",
			{
				key: "pageVal",
				value: page == undefined ? 0 : page,
				key2: "limitVal",
				value2: 10,
			},

			(response) => {
				const res = response.data.data.data;
				const numberrrrrr = response.data.data.data.data;
				let data;
				if (page) {
					data = [...numbers];
				} else {
					clearData();
					data = [];
				}

				setnumbers([...data, ...numberrrrrr]);

				setTotalItemsNum(res.totalItems);

				setChatsLoading(false);
			},
			(error) => {}
		);
	};
	const getNumberRiders = (page) => {
		setChatsLoading(true);
		CoreHttpHandler.request(
			"conversations",
			"rider_customer",
			{
				key: "pageVal",
				value: page == undefined ? 0 : page,
				key2: "limitVal",
				value2: 10,
			},

			(response) => {
				const res = response.data.data.data;
				const numberrrrrr = response.data.data.data.data;
				let data;
				if (page) {
					data = [...riderChats];
				} else {
					data = [];
				}

				setRiderChats([...data, ...numberrrrrr]);
				setTotalItemsNum(res.totalItems);

				setChatsLoading(false);
			},
			(error) => {}
		);
	};
	const socket = WebSocket.getSocket();

	const getConversation = (e, msgPages, loadMore) => {
		let page;
		if (loadMore == true) {
			if (messages.length != 0 && e.id != messages[0].receiver_id) {
				setMsgPage(1);
				page = 0;
			} else {
				setMsgPage(msgPage + 1);
				page = msgPage + 1;
			}
		} else {
			setMsgPage(0);
		}
		setAudioLoader(true);
		if (loadMore) {
			setLoadMore(true);
		}

		setMsgsLoading(true);

		CoreHttpHandler.request(
			"conversations",
			"seller_customer_chats",
			{
				key: "pageVal",
				value: page ? page : 0,
				key2: "limitVal",
				value2: 100,
				key3: "chatId",
				value3: e?.room_id,
			},
			(response) => {
				const res = response.data.data.data;
				const messagesssss = res.data.reverse();
				setMsgsLoading(false);
				if (loadMore) {
					const savedHeight = document.body.offsetHeight;
					setshowLatestMessage(true);
					setMsgsLoading(false);
					setmessages([...messagesssss, ...messages]);
					window.scrollTo(0, savedHeight);
				} else {
					setshowLatestMessage(true);
					setMsgsLoading(false);
					setmessages(messagesssss);

					// let dateeee = moment(messages[messages.length - 1]?.dt);
				}
			},
			(response) => {
				console.log(response, "error");
			}
		);
	};
	const getRiderConversation = (e, msgPages, loadMore) => {
		let page;
		if (loadMore == true) {
			if (messages.length != 0 && e.id != messages[0].receiver_id) {
				setMsgPage(1);
				page = 0;
			} else {
				setMsgPage(msgPage + 1);
				page = msgPage + 1;
			}
		} else {
			setMsgPage(0);
		}
		if (loadMore) {
			setLoadMore(true);
		}

		setMsgsLoading(true);

		CoreHttpHandler.request(
			"conversations",
			"rider_customer_chats",
			{
				key: "pageVal",
				value: page ? page : 0,
				key2: "limitVal",
				value2: 100,
				key3: "orderId",
				value3: e?.order_id,
			},
			(response) => {
				const res = response.data.data.data;
				const messagesssss = res.data.reverse();
				setMsgsLoading(false);
				if (loadMore) {
					const savedHeight = document.body.offsetHeight;
					setshowLatestMessage(true);
					setMsgsLoading(false);
					setmessages([...messagesssss, ...messages]);
					window.scrollTo(0, savedHeight);
				} else {
					setshowLatestMessage(true);
					setMsgsLoading(false);
					setmessages(messagesssss);

					// let dateeee = moment(messages[messages.length - 1]?.dt);
				}
			},
			(response) => {
				console.log(response, "error");
			}
		);
	};

	const conversationActionsCallback = (action) => {
		if (action === "export") conversationExport();
		//if (action === "shift") conversationShift();
	};

	const [counter, setCounter] = useState(true);
	const myRef = useRef();

	useEffect(() => {
		socket.on("newMessage", (data) => {
			setmessage(data);
			setmessages([...messages, data]);
			setLatestMessage(data);
			myRef?.current?.scrollTo();
		});

		// socket.on("newConversation", (data) => {
		// 	setDummy(data);

		// 	// value && notificationTone.play();
		// });

		// socket.on("newConversationMessage", (data) => {
		// });

		// EventEmitter.subscribe("Online", (event) => checkOnline(event));

		// EventEmitter.subscribe("ShowConversation", (event) =>
		// 	setTimeout(() => {
		// 		selectedRecipientt(event);
		// 		getNumberSellers();
		// 	}, 1000)
		// );
		// socket.on("removeConversation", (data) => {
		// 	setRemoveConversation(data);
		// });

		// socket.on("updateCustomerMessages", (data) => {
		// 	setUpdateCustomerMessages(data);
		// });

		return () => {
			socket.removeListener("newMessage");
		};
	}, []);

	// React.useEffect(() => {
	// 	if (selectedRecipient) {
	// 		//readMessage();
	// 	}
	// }, [selectedRecipient]);
	// React.useEffect(() => {
	// 	if (removeConversation) {
	// 		if (removeConversation.byNumber) {
	// 			let number = removeConversation.number;
	// 			if (number) {
	// 				if (numbers && numbers.length) {
	// 					let _numbers = numbers.filter((el) => el && el.number != number);
	// 					setnumbers(_numbers);
	// 				}

	// 				if (selectedRecipient && selectedRecipient.number == number) {
	// 					setselectedRecipient(null);
	// 					setmessages([]);
	// 				}
	// 			}
	// 		}
	// 	}
	// }, [removeConversation]);
	// React.useEffect(() => {
	// 	if (updateCustomerMessages) {
	// 		if (numbers && numbers.length) {
	// 			let _numbers = numbers.map((el) => {
	// 				if (el.id == updateCustomerMessages.id) {
	// 					updateCustomerMessages.name = updateCustomerMessages.assign_name;
	// 					if (updateCustomerMessages.assign_name != undefined)
	// 						delete updateCustomerMessages.assign_name;

	// 					let _selectedRecipient = selectedRecipient;

	// 					Object.keys(updateCustomerMessages).map((key) => {
	// 						if (el[key] != updateCustomerMessages[key]) {
	// 							el[key] = updateCustomerMessages[key];
	// 							if (_selectedRecipient)
	// 								_selectedRecipient[key] = updateCustomerMessages[key];
	// 						}
	// 					});
	// 					if (_selectedRecipient) setselectedRecipient(_selectedRecipient);
	// 				}

	// 				return el;
	// 			});
	// 			setnumbers(_numbers);
	// 		}
	// 	}
	// }, [updateCustomerMessages]);

	React.useEffect(() => {
		clearData();
		if (activeTab == "sellers") {
			getNumberSellers();
		} else {
			getNumberRiders();
		}
		// if (dummy) {
		// 	let _tempNumbers = [];
		// 	if (numbers && numbers.length) {
		// 		_tempNumbers = numbers;
		// 	}
		// 	let _numbers = [dummy, ..._tempNumbers.filter((el) => el.id != dummy.id)];
		// 	if (selectedRecipient) {
		// 		_numbers = _numbers.map((number) => {
		// 			if (selectedRecipient.id == number.id) {
		// 				number.message_count = 0;
		// 			}
		// 			return number;
		// 		});
		// 	}

		// 	setnumbers(_numbers);
		// }
	}, [activeTab]);

	const clearData = () => {
		setselectedRecipient(null);
		setmessages([]);
	};

	return (
		<Fragment>
			<Sidebar
				selectedRecipient={selectedRecipient}
				lastMessage={lastmessage}
				latestMessage={latestMessage}
				isShown={true}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				sellerChats={numbers}
				riderChats={riderChats}
				chatsLoading={chatsLoading}
				totalItemsNum={totalItemsNum}
				getNumberSellers={getNumberSellers}
				getNumberRiders={getNumberRiders}
				isActive={isActive}
				onContactClick={(e) => {
					selectedRecipientt(e);
				}}
				//userOnline={UserOnline}
				//updateAgentStatus={updateAgentStatus}
				sidebar={sidebar}
				handleSidebar={handleSidebar}
				userSidebarLeft={userSidebarLeft}
				handleUserSidebarLeft={handleUserSidebarLeft}
			/>
			<div className='content-right'>
				<div className='content-wrapper'>
					<div className='content-body'>
						<div
							className={classnames("body-content-overlay", {
								show:
									userSidebarRight === true ||
									sidebar === true ||
									userSidebarLeft === true,
							})}
							onClick={handleOverlayClick}></div>

						<Chat
							handleSidebar={handleSidebar}
							userSidebarLeft={userSidebarLeft}
							handleUserSidebarRight={handleUserSidebarRight}
							ref={myRef}
							//	conversationUpdate={conversationUpdate}
							className='flex flex-1 z-10'
							messages={messages}
							getConversation={getConversation}
							msgsLoading={msgsLoading}
							selectedRecipient={selectedRecipient}
							clearBlock={clearData}
							isShowChat={isShowChat}
							totalItems={totalItems}
							totalPages={totalPages}
							flag={flag}
							//	conversationActionsCallback={conversationActionsCallback}
							sound={sound}
							activeTab={activeTab}
							setFlag={setFlag}
							setSound={setSound}
							//	setRecordState={setRecordState}
							//	recordState={recordState}
							numbers={numbers}
							showSendIcon={showSendIcon}
							//RecordState={RecordState}
							//	conversationContextMenuCallback={conversationContextMenuCallback}
							audioLoader={audioLoader}
							//	userOnline={UserOnline}
							generateHist={generateHist}
						/>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default AppChat;
