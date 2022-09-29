import styled from "styled-components";
import Grid from "@mui/material/Grid";
import LinkThumbnail from "assets/LinkThumbnail";

export const Container = styled(Grid)(() => ({
	marginTop: "20px",
	"@media (min-width:0px) and (max-width:759px)": {
		minWidth: "228px",
		maxWidth: "228px",
	},
	"@media (min-width:759px) and (max-width:1090px)": {
		minWidth: "472px",
		maxWidth: "472px",
	},
	"@media (min-width:1090px) and (max-width:1424px)": {
		minWidth: "716px",
		maxWidth: "716px",
	},
	"@media (min-width:1424px) and (max-width:1758px)": {
		minWidth: "960px",
		maxWidth: "960px",
	},
	"@media (min-width:1758px)": {
		minWidth: "960px",
	},
}));

export const Item = styled(Grid)`
	position: relative;
	max-width: 228px;
	min-width: 228px;
	height: 174px;
	min-height: 174px;
	border: 1px solid #a9b5db;
	box-sizing: border-box;
	border-radius: 8px;
	background-color: #eff3fa;
	&:hover {
		box-shadow: 0 0 16px 5px rgb(172 181 212 / 30%);
	}
`;

export const Row = styled.div`
	display: flex;
	padding: 0 12px;
	justify-content: space-between;
	margin-top: 7px;
`;

export const Name = styled.div`
	font-size: 16px;
	line-height: 22px;
	color: #3e4867;
`;

export const SubTitle = styled.div`
	font-size: 12px;
	line-height: 14px;
	color: #7c8dc1;
`;

export const Type = styled.div`
	font-size: 12px;
	line-height: 14px;
	color: #3e4867;
`;

export const UserImage = styled.img`
	width: 22px;
	height: 22px;
`;

export const Thumbnail = styled(LinkThumbnail)`
	height: 113px;
	width: 226px;
	display: block;
	border-top-left-radius: 7px;
	border-top-right-radius: 7px;
`;

export const YoutubeIframe = styled.iframe`
	display: block;
	border: none;
	border-top-left-radius: 7px;
	border-top-right-radius: 7px;
`;

export const ItemActions = styled.div`
	position: absolute;
	display: ${({ show }) => (show ? "flex" : "none")};
	justify-content: space-around;
	align-items: center;
	flex-direction: row;
	right: 5px;
	top: 5px;
	width: 80px;
	height: 27px;
	background: #eff3fa;
	border: 1px solid #7c8dc1;
	border-radius: 4px;

	& svg {
		cursor: pointer;
	}
`;
