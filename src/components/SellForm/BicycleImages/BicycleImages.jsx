import React, { useState, useCallback, useEffect } from "react";

import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import CustomSnack from "src/components/snackbar/Snackbar.component";
import { handleInputChange } from "src/redux/SellStore/SellFormStore/SellForm.actions";
//import "./image-input.styles.scss";

const thumbsContainer = {
  verticalAlign: "top",
  display: "inline-block",
  marginTop: 16,
};

const Thumb = styled.div`
  display: inline-flex;
  border-radius: 1;
  border: 1px solid #eaeaea;
  margin-bottom: 8;
  margin-right: 8;
  width: 200px;
  height: 200px;
  padding: 4;
  box-sizing: border-box;

  @media screen and (max-width: 1050px) {
    width: 130px;
    height: 130px;
  }
`;

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

const ImageInput = ({ data }) => {
  const dispatch = useDispatch();

  console.log(data);

  const [showDrop, setShowDrop] = useState(false);
  const [mainImgId, setMainImgId] = useState("");
  const [openSnack, setOpen] = useState(false);
  const arrayMove = require("array-move");

  useEffect(() => {
    let imgArr = [...data.images];
    if (mainImgId) {
      let index = imgArr.findIndex((i) => i.id === mainImgId);
      let newArr = arrayMove(imgArr, index, 0);
      imgArr = newArr;
    }
    dispatch(handleInputChange({ target: { name: "images", value: imgArr } }));
  }, [mainImgId]);

  useEffect(() => {
    if (data.images.length > 6) {
      let imgArr = [...data.images];
      setOpen(true);
      let newArr = imgArr.slice(0, 6);
      dispatch(
        handleInputChange({ target: { name: "images", value: newArr } })
      );
    }
  }, [data.images]);

  const handleClick = () => {
    setOpen((c) => !c);
  };
  const onDrop = useCallback(
    (acceptedFiles) => {
      const newImages = [
        ...data.images,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            id: uuidv4(),
          })
        ),
      ];

      dispatch(
        handleInputChange({ target: { name: "images", value: newImages } })
      );
      setShowDrop(false);
    },
    [data.images]
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

  const removeFile = (file) => () => {
    let newFiles = [...data.images];
    newFiles.splice(newFiles.indexOf(file), 1);
    dispatch(
      handleInputChange({ target: { name: "images", value: newFiles } })
    );
  };

  const getMainImage = (index) => {
    setMainImgId(index);
  };

  const imagePrewiew = data.images.map((file, index) => (
    <div style={wrapper} key={file.id}>
      <Thumb>
        <div style={thumbInner}>
          <img
            alt="img"
            key={file.id}
            src={file.preview}
            style={img}
            onClick={removeFile(file)}
          />
        </div>
      </Thumb>
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
            <div className="image-upload-text">
              <button className="upload-text" type="button" onClick={open}>
                Upload Images
              </button>
              <span style={{ fontSize: "9px" }}>or</span>
              <span>Drop it</span>
            </div>
          </div>
          <aside style={thumbsContainer}>
            <ul>{imagePrewiew}</ul>
          </aside>
          {openSnack && (
            <CustomSnack
              open={openSnack}
              handleClick={handleClick}
              name="error"
              text="Add up to 6 images"
            />
          )}
          {/* {errors.image && !images.length && (
            <span className="form-error">{Object.values(errors.image)}</span>
          )} */}
        </div>
      )}
    </div>
  );
};

export default ImageInput;
