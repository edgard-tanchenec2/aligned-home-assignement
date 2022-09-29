import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import queryString from "query-string";

import { useItems } from "context/Items";
import CloseIcon from "assets/CloseIcon";
import YoutubeIcon from "assets/YoutubeIcon";
import LinkItemIcon from "assets/LinkItemIcon";
import RightArrowIcon from "assets/RightArrowIcon";
import LeftArrowIcon from "assets/LeftArrowIcon";
import { createItem, updateItem } from "servives/items";
import { ITEM_TYPES } from "constants.js";

import {
	Container,
	SubTitle,
	Title,
	Label,
	LinkItem,
	Header,
	UrlInput,
	NameInput,
	BackButton,
	ControlButtons,
	SaveButton,
	YoutubeItem,
	SelectType,
} from "./styles";

const validate = (name, url, type) => {
	const errors = { name: "", url: "" };
	if (!name) {
		errors.name = "Name should not be empty.";
	}

	let urlInstance;
	try {
		urlInstance = new URL(url);
	} catch (e) {
		errors.url = "Url is not valid.";
		return errors;
	}

	if (urlInstance.protocol !== "http:" && urlInstance.protocol !== "https:") {
		errors.url = "Url protocol is not valid.";
		return errors;
	}

	if (type === ITEM_TYPES.youtube && !["www.youtube.com", "youtube.com", "youtu.be"].includes(urlInstance.host)) {
		errors.url = "This is not a YouTube link.";
	}

	return errors;
};

const getYoutubeId = (url) => {
	const urlInstance = new URL(url);

	if (urlInstance.host === "youtu.be") {
		return urlInstance.pathname.slice(1);
	}

	return queryString.parse(urlInstance.search).v;
};

const UploadDrawer = ({ toggleDrawer, editItemId }) => {
	const [items, setItems] = useItems().items;
	const [, setFilteredItems] = useItems().filteredItems;
	const [url, setUrl] = useState("");
	const [urlError, setUrlError] = useState("");
	const [name, setName] = useState("");
	const [nameError, setNameError] = useState("");
	const [type, setType] = useState(ITEM_TYPES.link);

	useEffect(() => {
		if (!editItemId) return;
		const editItem = items.find(({ _id }) => _id === editItemId);
		setType(editItem.type);
		setName(editItem.name);
		setUrl(editItem.url);
	}, [editItemId, items]);

	const saveItem = (url, name, type, youtubeId) => {
		createItem(url, name, type, youtubeId).then(({ data: { insertedId } }) => {
			if (insertedId) {
				setFilteredItems((filteredItems) => {
					filteredItems.push({ url, name, type, youtubeId, _id: insertedId });
					toggleDrawer();
					return filteredItems;
				});
				setItems((items) => {
					items.push({ url, name, type, youtubeId, _id: insertedId });
					return items;
				});
			}
		});
	};

	const editItem = (url, name, type, youtubeId) => {
		updateItem(url, name, type, youtubeId, editItemId).then(() => {
			setFilteredItems((filteredItems) => {
				const editedItem = filteredItems.find(({ _id }) => _id === editItemId);
				editedItem.url = url;
				editedItem.name = name;
				editedItem.type = type;
				editedItem.youtubeId = youtubeId;
				toggleDrawer();
				return [...filteredItems];
			});
			setItems((items) => {
				const editedItem = items.find(({ _id }) => _id === editItemId);
				editedItem.url = url;
				editedItem.name = name;
				editedItem.type = type;
				editedItem.youtubeId = youtubeId;
				toggleDrawer();
				return [...items];
			});
		});
	};

	const onSave = () => {
		const { name: nameError, url: urlError } = validate(name, url, type);

		setNameError(nameError);
		setUrlError(urlError);
		if (nameError || urlError) return;

		let youtubeId = "";

		if (type === ITEM_TYPES.youtube) {
			youtubeId = getYoutubeId(url);
		}

		if (editItemId) {
			editItem(url, name, type, youtubeId);
		} else {
			saveItem(url, name, type, youtubeId);
		}
	};

	return (
		<Container>
			<Header>
				<Title>Upload</Title>
				<CloseIcon onClick={toggleDrawer} />
			</Header>
			<SelectType>
				<YoutubeItem onClick={() => setType(ITEM_TYPES.youtube)}>
					<YoutubeIcon />
					<SubTitle selected={type === ITEM_TYPES.youtube}>Youtube</SubTitle>
				</YoutubeItem>
				<LinkItem onClick={() => setType(ITEM_TYPES.link)}>
					<LinkItemIcon />
					<SubTitle selected={type === ITEM_TYPES.link}>Link</SubTitle>
				</LinkItem>
			</SelectType>
			<UrlInput>
				<Label htmlFor="link-input">URL</Label>
				<TextField
					onChange={({ target: { value } }) => setUrl(value)}
					value={url}
					size="small"
					fullWidth
					id="link-input"
					placeholder="e.g. docs.google.com/presentation"
					error={!!urlError}
					helperText={urlError}
				/>
			</UrlInput>
			<NameInput>
				<Label htmlFor="name-input">Name</Label>
				<TextField
					onChange={({ target: { value } }) => setName(value)}
					value={name}
					size="small"
					fullWidth
					id="name-input"
					placeholder="Demo Video"
					error={!!nameError}
					helperText={nameError}
				/>
			</NameInput>
			<ControlButtons>
				<BackButton
					sx={{ boxShadow: 0 }}
					color="grey5"
					variant="outlined"
					startIcon={<LeftArrowIcon />}
					onClick={toggleDrawer}
				>
					Back
				</BackButton>
				<SaveButton
					sx={{ boxShadow: 0 }}
					color="primary"
					variant="contained"
					endIcon={<RightArrowIcon />}
					onClick={onSave}
				>
					Save
				</SaveButton>
			</ControlButtons>
		</Container>
	);
};

export default UploadDrawer;
