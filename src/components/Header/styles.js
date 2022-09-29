import styled from "styled-components";
import LogoImage from "assets/Logo";

export const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 54px;
	width: 100%;
	min-width: 440px;
	height: 55px;
	background-color: #fff;
	box-shadow: 0 0 12px rgba(172, 181, 212, 0.254999);
`;

export const Logo = styled(LogoImage)`
	margin-left: 25px;
	width: 102px;
	height: 21px;
`;

export const User = styled.img`
	display: flex;
	border-left: 2px solid #eff3fa;
	cursor: pointer;
`;
