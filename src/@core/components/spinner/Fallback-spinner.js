// ** Logo
import logo from "@src/assets/images/logo/loader.gif";

const SpinnerComponent = () => {
	return (
		<div
			className='fallback-spinner app-loader '
			style={{ backgroundColor: "black" }}>
			<img
				className='fallback-logo'
				src={logo}
				height={500}
				alt='logo'
			/>
			{/* <div className='loading'>
				<div className='effect-1 effects'></div>
				<div className='effect-2 effects'></div>
				<div className='effect-3 effects'></div>
			</div> */}
		</div>
	);
};

export default SpinnerComponent;
