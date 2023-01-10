import React, { useState, useEffect } from "react";
import { Card } from "reactstrap";

const ImageMessageType = function (props) {
	const { message, index, showRandom, selectedRecipient, imgSrc } = props;

	const { attachment } = message;
	console.log(attachment, "image type");
	const [imageSrc, setImageSrc] = useState("");
	const [imageCaption, setImageCaption] = useState("");
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div>
			<Card
				style={{ maxWidth: "100%", height: "auto" }}
				onClick={() => setIsOpen(true)}
				className={
					message.type == "customer" ? "messageRecieve" : "messageSent"
				}>
				{message.type == "customer"
					? attachment.map((val, index) => {
							return (
								<img
									key={`message_list_item_type_image_${index}`}
									effect='blur'
									src={`https://upload.its.com.pk/${val.url}`}
									style={{ width: "100%", height: "200px" }}
								/>
							);
					  })
					: attachment.map((val, index) => {
							return (
								<img
									key={`message_list_item_type_image_${index}`}
									effect='blur'
									src={`https://upload.its.com.pk/${val.url}`}
									style={{ width: "100%", height: "200px" }}
								/>
							);
					  })}
			</Card>
			{/* {isOpen && (
				<Lightbox mainSrc={imageSrc} onCloseRequest={() => setIsOpen(false)} />
			)} */}
		</div>
	);
};

export default ImageMessageType;
