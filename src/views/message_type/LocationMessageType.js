import React, { useState } from 'react';
import { Card, Typography } from '@material-ui/core';
import Iframe from 'react-iframe';
import MessageStateResolver from './MessageStateResolver';
import moment from 'moment/moment';
import MapContainer from '../../../globalComponents/dialogs/GoogleMap.js';

const LocationMessageType = function (props) {
	const { message, index, showRandom, selectedRecipient } = props;

	const { attachments } = message;

	const [latitude, setMapLatitude] = useState('');
	const [longitude, setMapLongitude] = useState('');
	const [locationName, setLocationName] = useState('');

	React.useEffect(() => {
		if (attachments && attachments !== null) {
			attachments.forEach(attribute => {
				if (attribute.attribute_name == 'caption') {
					setLocationName(attribute.attribute_value);
				}

				if (attribute.attribute_name === 'latitude') {
					setMapLatitude(attribute.attribute_value);
				}

				if (attribute.attribute_name === 'longitude') {
					setMapLongitude(attribute.attribute_value);
				}
			});
		}
	}, []);

	return (
		<Card
			style={{ width: '350px', height: '260px' }}
			className={message.type == 'inbound' ? 'messageRecieve' : 'messageSent'}
		>
			<Typography
				variant="body2"
				style={{
					color: showRandom ? `#${Math.floor(Math.random() * 16777215).toString(16)}` : '#e73859',
					fontSize: '12px',
					textTransform: 'capitalize',
					marginBottom: '5px'
				}}
			>
				{message.type == 'inbound' ? selectedRecipient.name : message.sender_name}
			</Typography>
			{/* <Iframe url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.3205731008234!2d74.28067401450447!3d31.51535418137123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391903abe07ca681%3A0x74f82a9e219f19c8!2sim%20sorry%20its%20wrong!5e0!3m2!1sen!2s!4v1582719141988!5m2!1sen!2s"
                width="100%"
                height="100%"
                id="myId"
                className="myClassname"
                display="initial"
                position="relative"
                frameBorder="0"
            /> */}
			<MapContainer latitude={latitude} longitude={longitude} locationName={locationName} />
			{/* <iframe src={`https://embed.waze.com/iframe?zoom=14&lat=${latitude}&lon=${longitude}&pin=1&desc=1`}
                width="100%"
                height="100%"
                id="myId"
                className="myClassname"
                display="initial"
                position="relative"
                frameBorder="0"></iframe> */}
			<p style={{ width: '100%', margin: '5px', marginLeft: '5px', fontSize: '10px', marginTop: '240px' }}>
				{moment(message.dt).format('MMM Do YY, h:mm A')}
				{message.type === 'outbound' ? MessageStateResolver.resolve(message.status, message.mfms) : null}
			</p>
		</Card>
	);
};

export default LocationMessageType;
