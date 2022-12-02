import { Spinner, Button } from "reactstrap";
//reuseable loading button

const LoadingButton = ({
	loading,
	onClick,
	type,
	text,
	color,
	style,
	disabled,
	block,
	className,
}) => {
	return (
		<>
			<Button
				type={type ? type : "submit"}
				name='button'
				style={style}
				onClick={onClick}
				className={className}
				color={color ? color : "primary"}
				disabled={loading}
				block={block}>
				{loading ? (
					<Spinner
						size='sm'
						color={"white"}
					/>
				) : text ? (
					text
				) : (
					"Send"
				)}
			</Button>
		</>
	);
};
export default LoadingButton;
