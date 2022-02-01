export const rawAccessoriesConverter = (doc) => {
  const data = doc.data();

  return {
    firebaseId: doc.id,
    test: data.test,
  };
};
