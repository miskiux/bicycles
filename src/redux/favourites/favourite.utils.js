export const addItemToFavourite = (favouriteItems, favouriteItemToAdd) => {
	const existingFavouriteItem = favouriteItems.find(favouriteItem => favouriteItem.id == favouriteItem.id)

	if (existingFavouriteItem) {
		return favouriteItems.map(favouriteItem => //map bacause, have to return new array, new version of the state
			favouriteItem.id == favouriteItemToAdd.id
			? {...favouriteItem, quantity: favouriteItem.quantity + 1}
			: favouriteItem
		) 
	}
	return [...favouriteItems, {favouriteItemToAdd, quantity: 1}]
}