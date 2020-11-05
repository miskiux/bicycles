export const addItemToFavourite = (favouriteItems, favouriteItemToAdd) => {
	const existingFavouriteItem = favouriteItems.find(favouriteItem => favouriteItem.id === favouriteItemToAdd.id) //find provides a first item found in array based on the provided condition

	if (existingFavouriteItem) {
		return favouriteItems.map(favouriteItem => //map bacause, have to return new array, new version of the state
			favouriteItem.id === favouriteItemToAdd.id
			? {...favouriteItem } //creating new object
			: favouriteItem
		) 
	}
	return [...favouriteItems, {...favouriteItemToAdd, quantity: 1}] // quantity property gets attached the first time around since this if block wont run when its a new item
}