import { useEffect, useState } from "react";
import { Progress } from "reactstrap";

const SpinnerButton = ({ size, loading }) => {
	const [value, setValue] = useState(0);
	useEffect(() => {
		if (value <= 100) {
			for (let i = 0; i <= 100; i++) {
				setValue(i);
			}
		}
	}, []);

	return (
		<div style={{ width: "400px", margin: "auto" }}>
			{loading ? (
				<>
					<Progress
						className='progress-bar-primary'
						value={value}
						now={10}
						animated
						striped
					/>
					<span className='text-center m-auto'>Loading...</span>
				</>
			) : null}
		</div>
	);
};
export default SpinnerButton;
