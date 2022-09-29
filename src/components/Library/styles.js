import styled from "styled-components";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

export const Container = styled(Grid)`
	display: flex;
	align-items: center;
	background-color: #fff;
	min-height: 75vh;
	min-width: 440px;
	margin-bottom: 55px;
	padding: 30px 40px;
	box-shadow: 0 0 16px rgba(172, 181, 212, 0.3);
	border-radius: 8px;
`;

export const Controls = styled(Grid)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
`;

export const Label = styled(Grid)`
	font-size: 22px;
	line-height: 24px;
`;

export const UploadButton = styled(Button)`
	border-radius: 6px;
	width: 100%;
`;

export const UploadButtonContainer = styled(Grid)`
	min-width: 90px;
`;
