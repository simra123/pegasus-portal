import { useEffect, useState } from "react";
import { Progress } from "reactstrap";

const SpinnerButton = ({ size, loading }) => {
	// const [value, setValue] = useState(0);
	// useEffect(() => {
	// 	if (value <= 100) {
	// 		for (let i = 0; i <= 100; i++) {
	// 			setValue(i);
	// 		}
	// 	}
	// }, []);

	return (
		<div
			style={{
				width: "400px",
				margin: "30px auto",
				padding: "10px",
				textAlign: "center",
			}}>
			{loading ? (
				<>
					<Progress
						className='progress-bar-primary'
						value={100}
						animated
						striped
					/>
					<span className='mt-1'>Loading...</span>
				</>
			) : null}
		</div>
	);
};
export default SpinnerButton;
