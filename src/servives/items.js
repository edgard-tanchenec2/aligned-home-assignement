import axios from "axios";

const itemsUrl = "http://localhost:3021";

export const getItems = () => {
	return axios.get(`${itemsUrl}/items`);
};

export const deleteItem = (deleteId) => {
	return axios.delete(`${itemsUrl}/item/${deleteId}`);
};

export const updateItem = (url, name, type, youtubeId, editItemId) => {
	return axios.put(`${itemsUrl}/item/${editItemId}`, { url: url.trim(), name: name.trim(), type, youtubeId });
};

export const createItem = (url, name, type, youtubeId) => {
	return axios.post(`${itemsUrl}/item`, { url: url.trim(), name: name.trim(), type, youtubeId });
};
