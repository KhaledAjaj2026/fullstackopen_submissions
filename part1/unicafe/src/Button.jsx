const Button = ({ typeName, type, setType }) => {
	return (
		<button type="button" onClick={() => setType(type + 1)}>
			{typeName}
		</button>
	);
};

export default Button;
