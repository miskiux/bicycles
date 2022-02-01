import { firestore } from "src/firebase";
import { accessoriesCollectionConverter } from "../../Accessories/Converter/AccessoriesCollectionConverter";
import { bicycleCollectionConverter } from "../../Bicycles/Converter/BicycleCollectionConverter";
import { CollectionType } from "../Model/CollectionType";

export const GetCollectionCommand = async (urlParams) => {
  const { shopType, query, lastVisible, limit } = urlParams;

  let collectionRef = firestore
    .collection(shopType)
    .orderBy("createdAt")
    .startAfter(lastVisible)
    .limit(limit);

  if (query.executable.length) {
    query.executable.map(({ type, value, sign }) => {
      collectionRef = collectionRef.where(`${type}`, `${sign}`, `${value}`);
    });
  }

  return shopType === CollectionType.Bicycles
    ? bicycleCollectionConverter(await collectionRef.get())
    : accessoriesCollectionConverter(await collectionRef.get());
};
