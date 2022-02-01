export const getPreview = async (previews) => {
  let promises = previews.flatMap((x) => {
    return new Promise((resolve) => {
      const ctx = document.getElementById("progressive").getContext("2d");
      const img = new Image(10, 10);
      img.src = x.blob;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, 10, 10);
        const dataUrl = document
          .getElementById("progressive")
          .toDataURL("image/png", 0.1);
        resolve({ id: x.id, preview: dataUrl });
      };
    });
  });
  return await Promise.all(promises).then((res) => res);
};
