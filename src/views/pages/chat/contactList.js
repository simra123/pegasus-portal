import React, { useEffect, useState } from "react";
import Avatar from "@components/avatar";
//import DefaultAvatar from "@src/assets/images/avatars/userDefault.jpg";
import {
	CardText,
	InputGroup,
	InputGroupAddon,
	Input,
	InputGroupText,
	Badge,
	CustomInput,
	Button,
} from "reactstrap";
import moment from "moment";
import classnames from "classnames";
import { DefaultUser } from "../reuseable";

function ContactListItem(props) {
	let permissions = JSON.parse(localStorage.getItem("user_acl"));

	const {
		selectedRecipient,
		contact,
		latestMessage,
		activeTab,
		isActive,
		id,
		onContactClick,
	} = props;

	const [previousMessage, setPreviousMessage] = useState(contact.last_message);
	const showCount =
		selectedRecipient && selectedRecipient.id == contact.id ? false : true;
	useEffect(() => {
		let tempArr = { ...props.contact };
		if (latestMessage?.length > 0) {
			if (tempArr.id == latestMessage[0].receiver_id) {
				tempArr["last_message"] = latestMessage[0].message_body;
				setPreviousMessage(tempArr.last_message);
			}
		} else {
			setPreviousMessage(contact.last_message);
		}
	}, [latestMessage]);
	console.log(contact.last_message, "contacts");
	return (
		<li
			className={classnames({
				active: isActive === id,
			})}
			onClick={isActive === id ? null : () => onContactClick(contact)}
			style={{ padding: 18 }}>
			<Avatar
				img={DefaultUser}
				imgHeight='46'
				imgWidth='46'
				//status={contact.status}
			/>

			<div className='chat-info flex-grow-1'>
				<h5 className='mb-20'>{contact?.customer_username}</h5>
				<CardText>
					{contact.last_message?.message_body
						? contact.last_message?.message_body?.substr(0, 15)
						: contact.last_message?.message_body}
				</CardText>
			</div>

			<div className='chat-meta text-nowrap'>
				<small className='float-right mb-25 chat-time ml-25'>
					{moment(contact?.last_message?.dtu).format("ll")}
				</small>
				<div
					className='float-right chat-meta text-nowrap'
					style={{ marginTop: "0" }}>
					{" "}
					<small className='float-right mb-25 chat-time ml-25 mr-0'>
						{activeTab == "sellers"
							? contact.seller_username
							: contact.rider_username}
					</small>{" "}
				</div>
			</div>
		</li>
	);
}
export default ContactListItem;
