import React from "react";
import ReactPlayer from "react-player";
import { Card } from "reactstrap";
import moment from "moment/moment";
import MessageStateResolver from "./MessageStateResolver";

const VideoMessageType = function (props) {
	const { message, index, http, showRandom, selectedRecipient } = props;

	const { attachments } = message;

	const [video, setVideo] = React.useState(
		"https://retreat-guru-static.imgix.net/placeholder-video.png"
	);
	const [caption, setCaption] = React.useState("");
	const [display, setDisplay] = React.useState(false);

	React.useEffect(() => {
		if (attachments && attachments !== null) {
			attachments.forEach((attribute) => {
				if (attribute.attribute_name === "url") {
					setVideo(attribute.attribute_value);
				}
				if (attribute.attribute_name === "caption") {
					setCaption(`${attribute.attribute_value}`);
				}
			});
			setDisplay(true);
		}
	}, []);

	return (
		<div>
			{display && (
				<Card
					style={{ width: "100%", height: "auto" }}
					className={
						message.type == "inbound" ? "messageRecieve" : "messageSent"
					}
				>
					<div style={{ position: "relative", display: "inline-block" }}>
						{/* <Typography
							variant="body2"
							style={{
								color: showRandom ? `#${Math.floor(Math.random() * 16777215).toString(16)}` : '#e73859',
								fontSize: '12px',
								textTransform: 'capitalize',
								padding: '5px'
							}}
						>
							{message.type == 'inbound' ? selectedRecipient.name : message.sender_name}
						</Typography> */}

						<ReactPlayer controls url={video} height="auto" width="100%" />
						<div style={{ marginLeft: "3%" }}>
							<p
								style={{
									width: "100%",
									margin: "10px 10px 5px 0px",
									fontWeight: "bold",
								}}
							>
								{caption}
							</p>
						</div>
						{/* {message.type === "inbound" ? (
							<p
								id="attachmentDate"
								style={{ width: "100%", margin: "10px", fontSize: "10px" }}
							>
								{moment(message.dt).format("MMM Do YY, h:mm a")}
								{message.type === "outbound"
									? MessageStateResolver.resolve(message.status, message.mfms)
									: null}
							</p>
						) : (
							<p
								id="attachmentDate"
								style={{
									paddingRight: "28px",
									display: "flex",
									justifyContent: "flex-end",
									width: "100%",
									margin: "10px",
									fontSize: "10px",
								}}
							>
								{moment(message.dt).format("MMM Do YY, h:mm A")}
								{message.type === "outbound"
									? MessageStateResolver.resolve(message.status, message.mfms)
									: null}
							</p>
						)} */}
					</div>
				</Card>
			)}
		</div>
	);
};

export default VideoMessageType;
