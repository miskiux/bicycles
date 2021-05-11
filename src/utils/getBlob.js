export const getBlob = async (obj) => {
  let promises = obj.flatMap((x) =>
    x.url.map((i) => {
      return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve({ id: x.id, blob: reader.result });
          };
          reader.readAsDataURL(xhr.response);
        };
        xhr.open("GET", i);
        xhr.responseType = "blob";
        xhr.send();
      });
    })
  );

  return await Promise.all(promises).then((results) => results);
};
