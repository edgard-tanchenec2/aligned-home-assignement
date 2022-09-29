import React, { createContext, useContext, useState } from "react";

export const ItemsContext = createContext();

export const ItemsProvider = ({ children: childNodes }) => {
	const [items, setItems] = useState([]);
	const [filteredItems, setFilteredItems] = useState([]);
	return (
		<ItemsContext.Provider value={{ filteredItems: [filteredItems, setFilteredItems], items: [items, setItems] }}>
			{childNodes}
		</ItemsContext.Provider>
	);
};

export const useItems = () => {
	const context = useContext(ItemsContext);
	if (context === undefined) {
		throw new Error("useItems must be used within a ItemsProvider");
	}

	return context;
};
