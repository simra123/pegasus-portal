import React from "react";
import { Card } from "reactstrap";

import moment from "moment/moment";
import MessageStateResolver from "./MessageStateResolver";
import { MdGetApp, MdDescription, MdPictureAsPdf } from "react-icons/md";

const DocumentMessageType = function (props) {
	const { message, index, classes, showRandom, selectedRecipient } = props;

	const { attachments } = message;

	const [documentPath, setDocumentPath] = React.useState("");
	const [filename, setFilename] = React.useState("");
	const [caption, setCaption] = React.useState("");
	const [mimeType, SetMimeType] = React.useState("");

	React.useEffect(() => {
		if (attachments && attachments !== null) {
			attachments.forEach((attribute) => {
				if (attribute.attribute_name === "url") {
					setDocumentPath(attribute.attribute_value);
				}

				if (attribute.attribute_name === "filename") {
					setFilename(`${attribute.attribute_value}`);
				}
				if (attribute.attribute_name === "caption") {
					setCaption(`${attribute.attribute_value}`);
				}
				if (attribute.attribute_name === "type") {
					SetMimeType(`${attribute.attribute_value}`);
				}
			});
		}
	}, []);
	return (
		<div className="w-full" style={{ width: "360px", height: "auto" }}>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					padding: "10px",
					background: "#e7e7f66e",
					marginRight: 10,
				}}
			>
				<span>
					{mimeType === "application/pdf" ? (
						<MdPictureAsPdf
							size={33}
							style={{
								marginRight: "2%",
								marginTop: "2%",

								color: "red",
							}}
						/>
					) : (
						<MdDescription
							size={33}
							style={{
								color: "Blue",
							}}
						/>
					)}
				</span>

				<div
					style={{
						padding: 0,
						alignSelf: "center",
						marginLeft: "auto",
						textAlign: "right",
					}}
				></div>

				<span>
					<a href={documentPath} target={"_blank"}>
						<MdGetApp
							size={30}
							style={{
								marginTop: 5,
								marginRight: 7,
								color: "primary",
							}}
						/>
					</a>
				</span>
			</div>
			<p style={{ fontWeight: "bold", marginTop: "2%" }}>
				{filename ? filename.substring(40, 0) : caption.substring(0, 30)}
			</p>
		</div>
	);
};

export default DocumentMessageType;
