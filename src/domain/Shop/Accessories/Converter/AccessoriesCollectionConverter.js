import { rawAccessoriesConverter } from "src/domain/Shop/Accessories/Converter/RawAccessoriesConverter";

export const accessoriesCollectionConverter = (items) =>
  items.docs.map((doc) => {
    return rawAccessoriesConverter(doc);
  });
