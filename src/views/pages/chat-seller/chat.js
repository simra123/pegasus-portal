// ** React Imports
import React, { useState, useEffect, useRef, forwardRef } from "react";
import { BiCheck, BiCheckDouble } from "react-icons/bi";
import { AiOutlineSend } from "react-icons/ai";
import { DefaultUser } from "../reuseable";

import {
	VideoMessageType,
	DocumentMessageType,
	ImageMessageType,
} from "../../message_type";

import { FiPower } from "react-icons/fi";
// ** Custom Components
//import ReadMoreReact from "read-more-react";
//import AudioAnalyser from "react-audio-analyser";
//import DefaultAvatar from "@src/assets/images/avatars/userDefault.jpg";
import Avatar from "@components/avatar";
import CoreHttpHandler from "@src/http/services/CoreHttpHandler";
import Picker from "emoji-picker-react";
import WebSocket from "@src/socket/WebSocket";

// ** Store & Actions
import { useDispatch } from "react-redux";
import {
	BsFillJournalBookmarkFill,
	BsFillEmojiSmileFill,
} from "react-icons/bs";
import moment from "moment";
// ** Third Party Components
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
	MessageSquare,
	Menu,
	MoreVertical,
	Mic,
	Image,
	Send,
} from "react-feather";
import {
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Form,
	Label,
	InputGroup,
	Button,
	Input,
	InputGroupText,
	Spinner,
	UncontrolledTooltip,
	UncontrolledButtonDropdown,
} from "reactstrap";
import { ToastAlertError, ToastAlertSuccess } from "../reuseable";
import { AiOutlineCloseCircle, AiOutlineConsoleSql } from "react-icons/ai";
const ChatLog = forwardRef((props, ref) => {
	// ** Props & Store
	const {
		handleUser,
		handleUserSidebarRight,
		handleSidebar,
		userSidebarLeft,
		conversationContextMenuCallback,
	} = props;

	// ** Refs & Dispatch

	// ** State
	const socket = WebSocket.getSocket();
	// ** Formats chat data based on sender

	const dispatch = useDispatch();
	const {
		messages,
		selectedRecipient,
		setRecordState,
		setSound,
		setFlag,
		flag,
		sound,
		audioState,
		numbers,
		RecordState,
		activeTab,
	} = props;
	const [chosenEmoji, setChosenEmoji] = useState(false);
	const chatRef = useRef(null);
	const [messageText, setMessageText] = useState("");
	const [messageTextNew, setMessageTextNew] = useState("");
	const [emo, setEmo] = useState([]);
	const [block, setBlock] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const [imgSrc, setImgSrc] = useState(null);
	const [sendDialogData, setsendDialogData] = useState({
		url: "",
		caption: "",
		attributes: null,
	});
	const [shiftAgentsList, setshiftAgentsList] = useState([]);
	const [dialogOpenShift, setdialogOpenShift] = useState(false);
	const [sendActionType, setsendActionType] = useState(null);
	const [sendDialogOpen, setsendDialogOpen] = useState(false);
	const [sendDialogTitle, setsendDialogTitle] = useState(false);
	const [dialogOpenConfirmBlock, setdialogOpenConfirmBlock] = useState(false);
	const [cannedMessagesList, setcannedMessagesList] = useState([]);
	const [dialogOpenCanned, setdialogOpenCanned] = useState(false);
	const [status, setStatus] = useState(null);

	const [blockReason, setblockReason] = useState("");
	const [isDisabled, setDisabled] = useState(false);
	const [msgPage, setMsgPage] = useState(1);
	const [msgPage2, setMsgPage2] = useState(1);
	const [customerProfileData, setcustomerProfileData] = useState({
		id: 0,
		number: null,
		assign_name: "",
		attributes: [],
		countries: [],
	});
	const [soundLoader, setSoundLoader] = useState(false);

	const [showCanvas, setShowCanvas] = useState(false);
	const [textLength, setTextLength] = useState(800);
	const [dialogOpenCmp, setdialogOpenCmp] = useState(false);
	const [audioFilePath, setAudioFilePath] = useState("");
	const [loadingForModals, setLoadingForModals] = useState(false);
	const items = Array.from({ length: 30 }, (a) => useRef(null));

	React.useImperativeHandle(ref, () => ({
		scrollTo() {
			scrollToBottom();
		},
	}));

	const executeScroll = () => {
		if (chatRef && chatRef.current) {
			chatRef.current._ps.element.scrollTop = items[29].current.offsetTop;
			setTimeout(() => {
				if (chatRef && chatRef.current) {
					chatRef.current._ps.element.scrollTop = items[29].current?.offsetTop;
				}
			}, 1500);
		}
	};
	const onEmojiClick = (event, emojiObject) => {
		let emoArray = [];

		setEmo([...emo, emojiObject.emoji]);
		setTextLength(textLength - 2);
	};

	const start = () => {
		setStatus("recording");
		setFlag(true);
		setShowCanvas(true);
	};

	const stop = () => {
		audioState("setShowSendIcon(true)");
		setRecordState(RecordState.STOP);
		setShowCanvas(false);
	};

	const cancel = () => {
		let item = { ...localStorage };
		let keys = Object.keys(item);
		keys.forEach(async (i) => {
			if (i.includes("audio")) {
				var actual = JSON.parse(atob(i.split(":")[1]));

				if (actual == messages[0]?.receiver_id) {
					localStorage.removeItem(i);
				}
			}
		});
		audioState("setShowSendIcon(true)");
		setSound("");
		setRecordState("");
		setFlag(false);
	};

	const sendDialogActionCb = () => {
		setLoadingForModals(true);
		const args = {};

		args[sendActionType] = {};

		args[sendActionType]["type"] = sendActionType;

		args[sendActionType][sendActionType] = {};

		args[sendActionType][sendActionType]["message"] = sendDialogData;

		args[sendActionType][sendActionType]["to"] = [selectedRecipient.number];

		if (sendDialogData.attributes) {
			Object.keys(sendDialogData.attributes).forEach((attr) => {
				args[sendActionType][sendActionType].message[attr] =
					sendDialogData.attributes[attr];
			});
		}
		delete args[sendActionType][sendActionType].message.attributes;
		CoreHttpHandler.request(
			"conversations",
			"send",
			{ key: ":type", value: sendActionType, params: args[sendActionType] },
			(response) => {
				setSoundLoader(true);
				setsendActionType(null);
				setsendDialogTitle("");
				setsendDialogOpen(false);
				setsendDialogData({
					url: "",
					caption: "",
					attributes: null,
				});
				ToastAlertSuccess("Sent Successfully!");
				setLoadingForModals(false);
				setImgSrc(null);
				scrollToBottom();

				setSoundLoader(false);
			},
			(response) => {
				ToastAlertError("Somethings Wrong Please try again later!");
			}
		);
	};
	const dialogOptionsConfirmBlock = {
		onClose: function () {
			setdialogOpenConfirmBlock(false);
		},
		"aria-labelledby": "form-dialog-title",
		"aria-describedby": "form-dialog-title",
	};

	const sendMessage = async () => {
		const messageToSend = String(messageTextNew || " ").trim();
		if (messageToSend) {
			setMessageText("");

			// setDisabled(true);

			socket.emit("sendMessage", {
				attachments: [
					{
						type: "0",
						image: "",
					},
				],
				conversation_type: "customer_seller",
				reciever_id: 4,
				room_id: selectedRecipient.room_id,
				message_body: messageText,
			});
		}
	};

	console.log(selectedRecipient);
	const sendDialogInputHandler = (e) => {
		const data = { ...sendDialogData };
		if (e.caption != undefined) {
			data["caption"] = e.caption;
		}
		if (e.url) {
			data["url"] = e.url;
		}
		if (e.attributes) {
			data["attributes"] = e.attributes;
		}

		setsendDialogData(data);
	};
	const conversationActionsCallback = (action) => {
		setAnchorEl(null);

		if (action === "document") {
			setsendActionType("document");
			setsendDialogTitle("Send A Document");
			setsendDialogOpen(true);
		}
		if (action === "location") {
			setsendActionType("location");
			setsendDialogTitle("Send Location Data");
			setsendDialogOpen(true);
		}
		if (action === "image") {
			setsendActionType("image");
			setsendDialogTitle("Send An Image");
			setsendDialogOpen(true);
		}
		if (action === "sticker") {
			setsendActionType("sticker");
			setsendDialogTitle("Send A Sticker");
			setsendDialogOpen(true);
		}
	};

	// const conversationExport = () => {
	// 	let params = {
	// 		last_closed: selectedRecipient.last_closed,
	// 		limit: "30",
	// 		number: selectedRecipient.number,
	// 		page: "0",
	// 	};
	// 	CoreHttpHandler.request(
	// 		"conversations",
	// 		"conversations",
	// 		params,
	// 		(response) => {
	// 			const messages = response.data.data.chat;
	// 			const csvLink = (
	// 				<CSVLink
	// 					filename={`chat_${
	// 						selectedRecipient.number
	// 					}_${new Date().toISOString()}.csv`}
	// 					data={messages}>
	// 					<span style={{ color: "black" }}>
	// 						Your exported chat is ready for download
	// 					</span>
	// 				</CSVLink>
	// 			);
	// 			ToastAlertSuccess(csvLink);
	// 		},
	// 		(response) => {
	// 			ToastAlertError("Somethings Wrong Please try again later!");
	// 		}
	// 	);
	// };

	const conversationShift = () => {
		CoreHttpHandler.request(
			"conversations",
			"agent_list",
			{
				displayed: true,
				enabled: true,
				role: 64,
				columns: "id, username, email, number",
			},
			(response) => {
				const data = response.data.data.agents.data;
				let abc = {
					agentList: data,
					totalChats: numbers,
				};
				setshiftAgentsList(abc);
				setdialogOpenShift(true);
				//setMoreMenuEl(null);
			},

			(err) => {
				console.log(err, "err");
			}
		);
	};
	const selectedShiftAgentList = (data) => {
		setLoadingForModals(true);
		if (data.agentId !== null) {
			CoreHttpHandler.request(
				"conversations",
				"transfer",
				{
					key: ":id",
					value: data.agentId,
					params: {
						customer: data.chats,
					},
				},
				(response) => {
					setdialogOpenShift(false);
					//clearData()
					ToastAlertSuccess("Shifted Successfully");
					setLoadingForModals(false);
					//	getNumbers();
				},
				(error) => {
					ToastAlertError("Somethings Wrong Please try again later!");
				}
			);
		} else {
			alert("Please Select Agent or Chat");
		}
	};
	const selectedCannedMessage = (props) => {
		setBlock(true);
		const {
			message_text,
			message_type,
			attachment_url,
			attachment_name,
			attachment_type,
		} = props;
		if (message_type !== "text") {
			let params = {
				type: message_type,
			};
			params[message_type] = {
				to: [selectedRecipient.number],
				message: {
					filename: attachment_name,
					mime_type: attachment_type,
					url: attachment_url,
				},
			};

			CoreHttpHandler.request(
				"conversations",
				"send",
				{
					key: ":type",
					value: message_type,
					params,
				},
				(response) => {
					setMessageText("");
					setdialogOpenCanned(false);
					// setTimeout(() => {
					// 	setImgSrc(null);
					// }, [3000]);
					setBlock(false);
					ToastAlertSuccess("Send Successfully");
				},
				(error) => {
					setBlock(false);
					ToastAlertError("Somethings Wrong Please try again later!");
				}
			);
		} else {
			setMessageText(message_text);
			setdialogOpenCanned(false);
			setBlock(false);
		}
	};

	const handleKeyPress = (event) => {
		if (event.key === "Enter") {
			event.preventDefault();
			sendMessage();
		}
	};
	const prevCountRef = useRef();
	prevCountRef.current = messageText;
	const prevCount = prevCountRef.current;
	function onInputChange(ev) {
		setEmo("");
		if (prevCount !== ev.target.value) {
			if (ev.target.value.length < 801) {
				setMessageText(ev.target.value);
				setMessageTextNew(ev.target.value);
			}
		}
	}

	const scrollToBottom = () => {
		if (chatRef && chatRef.current) {
			chatRef.current._ps.element.scrollTop =
				chatRef.current._ps.element.scrollHeight;
			setTimeout(() => {
				if (chatRef && chatRef.current) {
					chatRef.current._ps.element.scrollTop =
						chatRef.current._ps.element.scrollHeight;
				}
			}, 100);
		}
	};

	useEffect(() => {
		setMessageTextNew(`${messageText + emo.toString().split(",").join("")}`);
		setChosenEmoji(false);

		if (messages) {
			//scrollToBottom();
		}
	}, [emo, messageText, chatRef]);

	const renderChats = () => {
		return (
			<>
				{props.msgsLoading ? (
					<div style={{ textAlign: "center" }}>
						<Spinner
							color='secondary'
							size={100}
							style={{ marginTop: 10 }}
						/>
					</div>
				) : messages && messages.length > 0 ? (
					messages.map((item, index) => {
						return (
							<div
								key={index}
								ref={items[index]}
								className={classnames("chat", {
									"chat-left": item.type === "inbound",
								})}>
								<div className='chat-body m-0'>
									<div
										style={{
											color: "#e73859",
											fontSize: "12px",
											marginRight: "20px",
											textTransform: "capitalize",
											marginBottom: "6px",
											borderRadius: "5px 5px 0 0",
											marginLeft: "20px",
											float: item.type === "outbound" ? "right" : "none",
										}}>
										{item.type == "inbound" ? selectedRecipient.username : null}
									</div>
									<div
										className='chat-content'
										style={{ letterSpacing: "0.1px", fontSize: "13px" }}>
										{item.message_body ? <p>{item.message_body}</p> : null}

										{item.attachment.map((val, i) => {
											return (
												<>
													{val.url && (
														<ImageMessageType
															key={1}
															index={index}
															message={item}
															showRandom={false}
															selectedRecipient={selectedRecipient}
															imgSrc={imgSrc}
														/>
													)}
												</>
											);
										})}

										{item?.type == "outbound" && (
											<span className=' ml-50 float-right text-nowrap chat-time '>
												<BiCheck
													size={21}
													color='gray'
												/>
											</span>
										)}

										<small className=' mt-25  text-nowrap chat-time '>
											{moment(item?.dt).format("MMM DD HH:mm")}
										</small>
									</div>
								</div>
							</div>
						);
					})
				) : null}
			</>
		);
	};

	// ** Opens right sidebar & handles its data
	const handleAvatarClick = (obj) => {
		handleUserSidebarRight();
		handleUser(obj);
	};

	// ** On mobile screen open left sidebar on Start Conversation Click
	const handleStartConversation = () => {
		//console.log(selectedRecipient, "hellowwwwwwwwwwwwwwwwwwww");
		if (!selectedRecipient && !userSidebarLeft && window.innerWidth <= 1200) {
			handleSidebar();
		}
	};

	// ** Sends New Msg

	const audioProps = {
		audioType: "audio/mp3", // Temporarily only supported audio/wav, default audio/webm
		status, // Triggering component updates by changing status
		sound,
		startCallback: (e) => {},
		pauseCallback: (e) => {},
		stopCallback: (e) => {
			//setLoading(true);

			setSound(window.URL.createObjectURL(e));

			const blob = e;

			const audioFile = new File(
				[blob],
				`Audio_${new Date().getTime()}.${blob.type.split("/")[1]}`,
				{
					type: blob.type,
				}
			);
			let item = { ...localStorage };

			let keys = Object.keys(item);
			keys.forEach(async (i) => {
				if (i.includes("audio")) {
					var actual = JSON.parse(atob(i.split(":")[1]));

					if (actual == messages[0]?.receiver_id) {
						localStorage.removeItem(i);
					}
				}
			});

			const _data = new FormData();

			const mime_type = blob.type;

			_data.append("file", audioFile);
			setSoundLoader(true);
			CoreHttpHandler.request(
				"content",
				"upload",
				{
					params: _data,
				},
				(response) => {
					setAudioFilePath(response.data.data.link);
					setSoundLoader(false);
				},
				(response) => {}
			);
		},
	};

	return (
		<div className='chat-app-window'>
			{selectedRecipient ? (
				<div
					className={classnames("active-chat", {
						"d-none": selectedRecipient === null,
					})}>
					<div className='chat-navbar'>
						<header className='chat-header'>
							<div className='d-flex align-items-center'>
								<div
									className='sidebar-toggle d-block d-lg-none mr-1'
									onClick={handleSidebar}>
									<Menu size={21} />
								</div>
								<Avatar
									imgHeight='40'
									imgWidth='40'
									img={DefaultUser}
									status={"busy"}
									className='avatar-border user-profile-toggle m-0 mx-1'
									onClick={() => handleAvatarClick(selectedRecipient.contact)}
								/>
								<h6 className='my-1'>{selectedRecipient.username}</h6>
							</div>
						</header>
					</div>

					<PerfectScrollbar
						ref={chatRef}
						className='user-chats'
						options={{ wheelPropagation: false }}>
						{activeTab == "sellers" ? (
							<div
								style={{
									textAlign: "center",
									display:
										messages &&
										messages.length != props.totalItemsSeller &&
										messages.length >= 30
											? "block"
											: "none",
								}}>
								<Button
									size='small'
									color='primary'
									onClick={(e) => {
										setMsgPage(msgPage + 1);
										props.getConversationSeller(selectedRecipient, msgPage);
										executeScroll();
									}}
									style={{
										textTransform: "capitalize",
										marginTop: 8,
										color: "#fff",
										fontSize: "10px",
										visibility: props.msgsLoading ? "hidden" : "visible",
									}}>
									Load More
								</Button>
							</div>
						) : (
							<div
								style={{
									textAlign: "center",
									display:
										messages &&
										messages.length != props.totalItemsRider &&
										messages.length >= 30
											? "block"
											: "none",
								}}>
								<Button
									size='small'
									color='primary'
									onClick={(e) => {
										setMsgPage2(msgPage2 + 1);
										props.getConversationRider(selectedRecipient, msgPage);
										executeScroll();
									}}
									style={{
										textTransform: "capitalize",
										marginTop: 8,
										color: "#fff",
										fontSize: "10px",
										visibility: props.msgsLoading ? "hidden" : "visible",
									}}>
									Load More
								</Button>
							</div>
						)}

						{selectedRecipient ? (
							<div className='chats'>{renderChats()}</div>
						) : null}
					</PerfectScrollbar>

					<Form className='chat-app-form '>
						{chosenEmoji && (
							<div
								style={{ position: "absolute", zIndex: "200", bottom: "50px" }}>
								<Picker onEmojiClick={onEmojiClick} />
							</div>
						)}

						{!soundLoader && (
							<React.Fragment>
								<InputGroup className='input-group-merge  form-send-message'>
									<Input
										type='textarea'
										rows='1'
										placeholder='Type your message'
										onChange={onInputChange}
										value={messageTextNew}
										style={{ resize: "none" }}
										maxLength={800}
										onKeyPress={handleKeyPress}
									/>
									<Button
										color='primary'
										onClick={(e) => {
											//e.preventDefault();
											conversationActionsCallback("image");
										}}>
										<UncontrolledTooltip
											placement='top'
											target='attachment'>
											Attachment
										</UncontrolledTooltip>
										<Image
											className='cursor-pointer text-secondary'
											size={14}
											color={"white"}
											id='attachment'
										/>
									</Button>
								</InputGroup>
							</React.Fragment>
						)}

						{soundLoader ? (
							<Spinner
								color='secondary'
								size={30}
							/>
						) : null}

						{!soundLoader && (
							<>
								<span className='p-1 text-primary ml-auto d-block'>
									<AiOutlineSend
										disabled={isDisabled}
										className='ml-auto d-none d-md-block'
										onClick={sendMessage}
										color='primary'
										size={18}
									/>
								</span>
							</>
						)}
					</Form>
				</div>
			) : (
				<div className={classnames("start-chat-area")}>
					<div className='start-chat-icon mb-1'>
						<MessageSquare />
					</div>
					<h4
						className='sidebar-toggle start-chat-text'
						onClick={handleStartConversation}>
						Start Conversation
					</h4>
				</div>
			)}
		</div>
	);
});

export default ChatLog;
