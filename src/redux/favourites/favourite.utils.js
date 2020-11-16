export const addItemToFavourite = (favouriteItems, favouriteItemToAdd) => {
	const existingFavouriteItem = favouriteItems.find(favouriteItem => favouriteItem.url === favouriteItemToAdd.url) //find provides a first item found in array based on the provided condition

	if (existingFavouriteItem) {
		return favouriteItems.map(favouriteItem => //map bacause, have to return new array, new version of the state
			favouriteItem.url === favouriteItemToAdd.url
			? {...favouriteItem } //creating new object
			: favouriteItem
		) 
	}
	return [...favouriteItems, {...favouriteItemToAdd, quantity: 1}] // quantity property gets attached the first time around since this if block wont run when its a new item
}