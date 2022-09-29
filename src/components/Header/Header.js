import AvatarImage from "assets/avatar.png";
import { Container, Logo, User } from "./styles";

const Header = () => {
	return (
		<Container>
			<Logo />
			<User src={AvatarImage} alt="avatar" />
		</Container>
	);
};

export default Header;
