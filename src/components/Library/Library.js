import { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Drawer from "@mui/material/Drawer";

import { useItems } from "context/Items";
import PlusIcon from "assets/PlusIcon";
import SearchIcon from "assets/SearchIcon";
import { LibraryItems } from "./LibraryItems";
import { UploadDrawer } from "components/UploadDrawer";
import { Container, Controls, Label, UploadButtonContainer, UploadButton } from "./styles";

const Library = () => {
	const [items] = useItems().items;
	const [, setFilteredItems] = useItems().filteredItems;
	const [isDrawerOpened, setIsDrawerOpened] = useState(false);

	const onSearch = (e) => {
		const filteredItems = items.filter(({ name }) => name.toLowerCase().includes(e.target.value.trim().toLowerCase()));
		setFilteredItems(filteredItems);
	};

	const toggleDrawer = () => {
		setIsDrawerOpened((isDrawerOpened) => !isDrawerOpened);
	};

	return (
		<Container flexDirection="column" item xs={7.3}>
			<Controls item container columns={6}>
				<Label item xs={1}>
					Library
				</Label>
				<Grid item xs={3}>
					<TextField
						placeholder="Search Item..."
						type="search"
						size="small"
						fullWidth
						onChange={onSearch}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<SearchIcon />
								</InputAdornment>
							),
						}}
					/>
				</Grid>
				<UploadButtonContainer item xs={1}>
					<UploadButton
						sx={{ boxShadow: 0 }}
						color="primary"
						variant="contained"
						startIcon={<PlusIcon />}
						onClick={toggleDrawer}
					>
						Upload
					</UploadButton>
				</UploadButtonContainer>
			</Controls>
			<LibraryItems />
			<Drawer anchor="right" open={isDrawerOpened} onClose={toggleDrawer}>
				<UploadDrawer toggleDrawer={toggleDrawer} />
			</Drawer>
		</Container>
	);
};

export default Library;
