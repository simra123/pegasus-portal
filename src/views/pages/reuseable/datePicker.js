// ** React Imports
import { Fragment, useState } from "react";
import "@styles/react/libs/flatpickr/flatpickr.scss";

// ** Reactstrap Imports
import { Label } from "reactstrap";

// ** Third Party Components
import Flatpickr from "react-flatpickr";

const PickerRange = ({ picker, setPicker }) => {
	// ** State
	return (
		<Fragment>
			<Label
				className='form-label'
				for='range-picker'>
				Date Picker
			</Label>
			<Flatpickr
				style={{ fontSize: "11px" }}
				value={picker}
				id='range-picker'
				className='form-control'
				onChange={(date) => setPicker(date)}
				options={{
					mode: "range",
					defaultDate: ["2020-02-01", "2020-02-15"],
				}}
			/>
		</Fragment>
	);
};

export default PickerRange;
