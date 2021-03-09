export const addItemToFavourite = (favouriteItems, favouriteItemToAdd) => {
	
	const existingFavouriteItem = favouriteItems.find(favouriteItem => favouriteItem.id === favouriteItemToAdd.id) //find provides a first item found in array based on the provided condition

	if (existingFavouriteItem) {
		return favouriteItems.map(favouriteItem => 
			favouriteItem.id === favouriteItemToAdd.id
			? {...favouriteItem } //creating new object
			: favouriteItem
		) 
	}
	return [...favouriteItems, {...favouriteItemToAdd}]
}