import {
	Card,
	Input,
	Row,
	Col,
	Button,
	Badge,
	Table,
	CardBody,
	Label,
	InputGroup,
	InputGroupText,
} from "reactstrap";
import DatePicker from "./datePicker";
import { Search, X } from "react-feather";
import { ToastAlertError } from "./reactToasts";
const SearchFilters = ({
	picker,
	setPicker,
	filter,
	setFilter,
	searchVal,
	setSearchVal,
	data2,
	setData,
	handleFilter,
	getData,
	options,
	setTotalPages,
	tempTotal,
}) => {
	return (
		<div className='d-flex mb-2 '>
			<div style={{ width: "150px" }}>
				<Label
					className='form-label'
					for='select-basic'>
					Filter by
				</Label>
				<Input
					type='select'
					name='select'
					size='md'
					value={filter}
					onChange={(e) => {
						//	console.log(e.target.value, "loll");
						if (e.target.value == "all") {
							setData(data2);
							setTotalPages(tempTotal);
							setSearchVal("");
						}
						setFilter(e.target.value);
					}}
					style={{ fontSize: "11px" }}
					id='select-basic'>
					{options ? (
						<>
							<option value={"all"}>All</option>
							{options.map((val) => {
								return (
									<option
										key={val.value}
										value={val.value}>
										{val.name}
									</option>
								);
							})}
						</>
					) : (
						<>
							<option value={"all"}>All</option>
							<option value='date'>Date</option>
							<option value='name'>Name</option>
							<option value='number'>Number</option>
						</>
					)}
				</Input>
			</div>
			<div style={{ marginLeft: "auto", width: "200px" }}>
				{filter == "date" && (
					<DatePicker
						picker={picker}
						setPicker={setPicker}
					/>
				)}
				{!(filter == "date") && !(filter == "status") ? (
					<div>
						<label className='form-label'>Search</label>
						<InputGroup className='input-group-merge'>
							<Input
								type='text'
								size='md'
								//placeholder='search'
								value={searchVal}
								//	disabled={filter === "date" || filter == "all"}
								onChange={(e) => {
									if (filter == "all") {
										ToastAlertError("please select a filter type fisrt");
									} else {
										setSearchVal(e.target.value);
									}
								}}
								style={{ fontSize: "11px" }}
							/>
							{searchVal && (
								<InputGroupText>
									<X
										size={14}
										className='cursor-pointer'
										onClick={() => {
											setSearchVal("");
											setFilter("all");
											getData(null, null, "all");
										}}
									/>
								</InputGroupText>
							)}
						</InputGroup>
					</div>
				) : null}
				{filter == "status" && (
					<>
						<Label
							className='form-label'
							for='select-basic'>
							Status
						</Label>
						<Input
							type='select'
							name='select'
							size='md'
							value={searchVal}
							onChange={(e) => setSearchVal(e.target.value)}
							style={{ fontSize: "11px" }}
							id='select-basic'>
							<option value=''>Null</option>
							<option value='accepted'>Accepted</option>
							<option value='order_placed'>Order Place</option>
							<option value='delieverd'>Delivered</option>
						</Input>
					</>
				)}
			</div>
			<Button
				className='text-primary cursor-pointer'
				onClick={handleFilter}
				size='sm'
				color='primary'
				style={{ marginTop: "22px", marginLeft: "20px", height: "35px" }}>
				<Search size={15} />
			</Button>

			<hr style={{ borderColor: "white" }} />
		</div>
	);
};
export default SearchFilters;
