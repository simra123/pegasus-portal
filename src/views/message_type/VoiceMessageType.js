import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MicIcon from '@material-ui/icons/Mic';

const VoiceMessageType = function (props) {
	const { classes, message, index, showRandom, selectedRecipient } = props;

	const { attachments } = message;

	const [audioPath, setAudioPath] = useState('');
	const [filename, setFilename] = useState('');
	const [fileType, setFileType] = useState('');
	const [audio, setAudio] = useState('');
	const [play, setAudioState] = useState(false);

	const audioPlayHandler = () => {
		if (play) {
			setAudioState(false);
			audio.pause();
		} else {
			setAudioState(true);
			audio.play();
		}
	};

	React.useEffect(() => {
		if (attachments && attachments !== null) {
			attachments.forEach(attribute => {
				if (attribute.attribute_name === 'url') {
					setAudioPath(attribute.attribute_value);
					setAudio(new Audio(attribute.attribute_value));
				}

				if (attribute.attribute_name === 'filename') {
					setFilename(`${attribute.attribute_value.slice(0, 25)}...`);
				}

				if (attribute.attribute_name === 'mime_type') {
					setFileType(`Format: ${attribute.attribute_value.split('/')[1]}`);
				}
			});
		}
	}, []);

	return (
		<div className={message.type == 'inbound' ? 'messageRecieve' : 'messageSent'}>
			<Card className={classes.root}>
				<div>
					<CardContent className={classes.content}>
						{/* {message.type === 'outbound' ? ( */}
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
						{/* ) : null} */}
						<Typography variant="subtitle1">{/* {filename} */}</Typography>
						<Typography variant="subtitle1" color="textSecondary">
							{/* {fileType} */}
						</Typography>
					</CardContent>

					<div>
						<AccountCircleIcon style={{ width: 40, height: 40, marginTop: '8px' }} />
						<MicIcon
							style={{
								position: 'absolute',
								color: '#72bcd4',
								top: 48,
								width: 20,
								left: 51,
								marginTop: '3px'
							}}
						/>
						<IconButton onClick={audioPlayHandler} aria-label="play/pause" style={{ marginTop: '-30px' }}>
							{!play && <PlayArrowIcon />}
							{play && <PauseIcon />}
						</IconButton>
					</div>
				</div>
				{/* <div style={{display:'flex',justifyContent:'flex-end',flex:1}}>
                <a href={audioPath} target={'_blank'}><GetAppIcon style={{ }} /></a>
                </div> */}
			</Card>
		</div>
	);
};

export default VoiceMessageType;
