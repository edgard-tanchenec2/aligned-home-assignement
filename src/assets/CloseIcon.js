const CloseIcon = ({ ...props }) => {
	return (
		<svg
			{...props}
			style={{ cursor: "pointer" }}
			width="12"
			height="12"
			viewBox="0 0 12 12"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M1 1L11 11M11 1L1 11" stroke="#576694" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
};

export default CloseIcon;
