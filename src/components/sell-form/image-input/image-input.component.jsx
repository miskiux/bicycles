import React, { useState, useCallback, useEffect } from "react";

import { useDropzone } from "react-dropzone";

import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import CustomSnack from "../../snackbar/Snackbar.component";
import "./image-input.styles.scss";

const thumbsContainer = {
  verticalAlign: "top",
  display: "inline-block",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 1,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 200,
  height: 200,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
  minWidth: 190,
};

const wrapper = {
  verticalAlign: "top",
  display: "inline-block",
  textAlign: "center",
};

const checkbox = {
  display: "block",
  margin: "0 auto",
};

const getColor = (props) => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isDragActive) {
    return "#2196f3";
  }
  return "#eeeeee";
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  min-height: 500px;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

const ImageInput = ({ callback, errors, images }) => {
  const [showDrop, setShowDrop] = useState(false);
  const [mainImgId, setMainImgId] = useState("");
  const [openSnack, setOpen] = useState(false);
  const arrayMove = require("array-move");

  useEffect(() => {
    let imgArr = [...images];
    if (mainImgId) {
      let index = imgArr.findIndex((i) => i.id === mainImgId);
      let newArr = arrayMove(imgArr, index, 0);
      imgArr = newArr;
    }
    callback("image", imgArr);
  }, [mainImgId]);

  useEffect(() => {
    if (images.length > 6) {
      let imgArr = [...images];
      setOpen(true);
      let newArr = imgArr.slice(0, 6);
      callback("image", newArr);
    }
  }, [images]);

  const handleClick = () => {
    setOpen((c) => !c);
  };
  const onDrop = useCallback(
    (acceptedFiles) => {
      callback("image", [
        ...images,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            id: uuidv4(),
          })
        ),
      ]);
      setShowDrop(false);
    },
    [images]
  );

  const onDragEnter = useCallback(() => {
    setShowDrop(true);
  }, []);

  const onDragLeave = useCallback(() => {
    setShowDrop(false);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    open,
  } = useDropzone({
    accept: "image/*",
    noClick: true,
    onDrop,
    onDragEnter,
    onDragLeave,
  });

  //not working
  const removeFile = (file) => () => {
    const newFiles = [...images];
    newFiles.splice(newFiles.indexOf(file), 1);
    callback("image", newFiles);
  };

  const getMainImage = (index) => {
    setMainImgId(index);
  };

  const imagePrewiew = images.map((file, index) => (
    <div style={wrapper} key={file.id}>
      <div style={thumb}>
        <div style={thumbInner}>
          <img
            alt="img"
            key={file.id}
            src={file.preview}
            style={img}
            onClick={removeFile(file)}
          />
        </div>
      </div>
      <input
        style={checkbox}
        key={file.id}
        type="radio"
        name="frequency"
        onChange={() => getMainImage(file.id)}
      />
    </div>
  ));

  return (
    <div className="image-upload-container">
      {showDrop ? (
        <Container
          {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
        >
          <div style={thumbsContainer}>
            <ul>{imagePrewiew}</ul>
          </div>
        </Container>
      ) : (
        <div {...getRootProps({ className: "dropzone" })}>
          <div className="text-wrapper">
            <input {...getInputProps()} />
            <span className="image-text">Images</span>
            <button className="upload-text" type="button" onClick={open}>
              Upload Images
            </button>
          </div>
          <aside style={thumbsContainer}>
            <ul>{imagePrewiew}</ul>
          </aside>
          {openSnack && (
            <CustomSnack
              open={openSnack}
              handleClick={handleClick}
              name="small"
              text="Add up to 6 images"
            />
          )}
          {errors.image && (
            <span className="form-error">{Object.values(errors.image)}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageInput;
