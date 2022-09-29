import { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";

import SmallLinkIcon from "assets/SmallLinkIcon";
import EditIcon from "assets/EditIcon";
import DeleteIcon from "assets/DeleteIcon";
import { useItems } from "context/Items";
import TestPersonCircleImg from "assets/PersonCircle.png";
import { UploadDrawer } from "components/UploadDrawer";
import { deleteItem, getItems } from "servives/items";
import { ITEM_TYPES } from "constants.js";

import { Container, Row, Name, Type, Item, SubTitle, ItemActions, UserImage, Thumbnail, YoutubeIframe } from "./styles";

const LibraryItems = () => {
	const [, setItems] = useItems().items;
	const [filteredItems, setFilteredItems] = useItems().filteredItems;
	const [hoveredItemId, setHoveredItemId] = useState("");
	const [isDrawerOpened, setIsDrawerOpened] = useState(false);
	const [editItemId, setEditItemId] = useState("");

	const onDelete = (deleteId) => {
		deleteItem(deleteId).then(() => {
			setFilteredItems((items) => {
				return items.filter(({ _id }) => _id !== deleteId);
			});
			setItems((items) => {
				return items.filter(({ _id }) => _id !== deleteId);
			});
		});
	};

	const toggleDrawer = () => {
		setIsDrawerOpened((isDrawerOpened) => !isDrawerOpened);
	};

	const onEdit = (_id) => {
		setEditItemId(_id);
		toggleDrawer();
	};

	useEffect(() => {
		getItems().then(({ data }) => {
			setItems([...data]);
			setFilteredItems([...data]);
		});
	}, [setItems, setFilteredItems]);

	return (
		<>
			<Container container gap={2}>
				{filteredItems.map(({ name, type, youtubeId, url, _id }) => (
					<Item
						key={_id}
						xs={1}
						item
						onMouseEnter={() => setHoveredItemId(_id)}
						onMouseLeave={() => setHoveredItemId("")}
					>
						<ItemActions show={_id === hoveredItemId}>
							<SmallLinkIcon href={url} />
							<EditIcon onClick={() => onEdit(_id)} />
							<DeleteIcon onClick={() => onDelete(_id)} />
						</ItemActions>
						{type === ITEM_TYPES.youtube ? (
							<YoutubeIframe
								height="113px"
								width="226px"
								src={`https://www.youtube.com/embed/${youtubeId}`}
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
								title="Embedded youtube"
							/>
						) : (
							<Thumbnail href={url} />
						)}
						<Row>
							<Name>{name}</Name>
							<UserImage src={TestPersonCircleImg} />
						</Row>
						<Row>
							<SubTitle>Case Studies</SubTitle>
							<Type>{type.toUpperCase()}</Type>
						</Row>
					</Item>
				))}
			</Container>
			<Drawer anchor="right" open={isDrawerOpened} onClose={toggleDrawer}>
				<UploadDrawer editItemId={editItemId} toggleDrawer={toggleDrawer} />
			</Drawer>
		</>
	);
};

export default LibraryItems;
