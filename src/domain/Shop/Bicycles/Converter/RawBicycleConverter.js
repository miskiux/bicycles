export const rawBicycleConverter = (doc) => {
  const data = doc.data();

  return {
    firebaseId: doc,
    routeName: encodeURI(data.bicycleType.toLowerCase()).replace(/%20/g, " "),
    id: doc.id,
    item: {
      ...data.item,
      model: data.item.model.charAt(0).toUpperCase() + data.item.model.slice(1),
      manufacturer:
        data.item.manufacturer.charAt(0).toUpperCase() +
        data.item.manufacturer.slice(1),
    },
    ...data,
  };
};
