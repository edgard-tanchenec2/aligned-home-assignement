import styled from "styled-components";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { ItemsProvider } from "./context/Items";
import { Header } from "./components/Header";
import { Library } from "./components/Library";

const AddContainer = styled(Grid)`
	min-height: 100vh;
	min-width: 440px;
	background-color: #eff3fa;
	justify-content: center;
`;

const theme = createTheme({
	palette: {
		primary: {
			main: "#7F4EE7",
			contrastText: "#fff",
		},
		grey5: {
			main: "#3E4867",
			contrastText: "#000",
		},
	},
	typography: {
		button: {
			textTransform: "none",
		},
	},
});

function App() {
	return (
		<ItemsProvider>
			<ThemeProvider theme={theme}>
				<AddContainer container columns={10}>
					<Header />
					<Library />
				</AddContainer>
			</ThemeProvider>
		</ItemsProvider>
	);
}

export default App;
