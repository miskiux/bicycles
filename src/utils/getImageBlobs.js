export const getBlobs = (urls) => {
  const blobArr = [];
  const promises = urls.map((i) => {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open("GET", i, true);
      request.responseType = "blob";
      request.onload = () => {
        let reader = new FileReader();
        reader.readAsDataURL(request.response);
        reader.onload = (e) => {
          let file = e.target.result;
          console.log(file);
          blobArr.push(file);
        };
      };
      request.send();
      resolve(blobArr);
    });
  });
  Promise.all(promises);
  return blobArr;
};
