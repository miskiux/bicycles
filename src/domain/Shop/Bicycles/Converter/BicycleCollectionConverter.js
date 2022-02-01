import { rawBicycleConverter } from "src/domain/Shop/Bicycles/Converter/RawBicycleConverter";

export const bicycleCollectionConverter = (items) =>
  items.docs.map((doc) => {
    return rawBicycleConverter(doc);
  });
