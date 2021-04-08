import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useStorage } from "../../../hooks/useStorage";
import CustomSnack from "../../snackbar/Snackbar.component";
import {
  CustomSpinnerOverlay,
  SpinnerContainer,
} from "../../with-spinner/with-spinner.styles";
import FormUpdate from "../form-update/form-update.component";
import ImageUpdate from "../images-update/Image-update.component";
import { imageUrlUpdateStart } from "../../../redux/update/update.actions";
import {
  deleteBicycleStart,
  getDeleteDefault,
} from "../../../redux/shop/shop.actions";
import { Transition } from "react-transition-group";
import "./bici-item.styles.scss";

function BiciItem({ currentBicycle, edit, toggleEdit }) {
  const [show, setShow] = useState(false);
  const [allImages, setAllImages] = useState([]);
  const [deleteArr, setDeleteArr] = useState([]);
  const [toRemove, setToRemove] = useState(false);
  const [isImgPreview, setIsImgPreview] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const dispatch = useDispatch();

  const isUrlUpdating = useSelector((state) => state.update.isUrlUpdating);
  const isImageUpdating = useSelector((state) => state.update.isImageUpdating);
  const isFormUpdating = useSelector((state) => state.update.isFormUpdating);

  const deleteStatus = useSelector((state) => state.shop.isDeleting);
  const deleteMessage = useSelector((state) => state.shop.deleteMessage);

  const { item, createdAt, imgKey, id } = currentBicycle;

  const imageFiles = allImages && allImages.filter((i) => i instanceof File);
  const fileIds = imageFiles && imageFiles.map(({ id }) => id);

  const oldArr =
    fileIds &&
    allImages
      .filter(({ id }) => !fileIds.includes(id))
      .map(({ preview }) => preview);

  const { url } = useStorage(imageFiles, imgKey);

  useEffect(() => {
    if (item) {
      const attachId = item.url.map((img) =>
        Object.assign(
          {},
          {
            id: uuidv4(),
            preview: img,
          }
        )
      );
      setAllImages(attachId);
    }
  }, [item, show]);

  useEffect(() => {
    if (item && allImages) {
      const imageSource = item.url;
      const allUrls = allImages.map(({ preview }) => preview);
      const diff = imageSource.filter((x) => !allUrls.includes(x));
      setDeleteArr(diff);
      if (diff.length) {
        setToRemove(true);
      } else {
        setToRemove(false);
      }
    }
  }, [item, allImages]);

  useEffect(() => {
    const imageArr = [...oldArr, ...url];

    if (isUrlUpdating && !imageFiles.length) {
      dispatch(imageUrlUpdateStart({ id, url: imageArr }));
    } else if (isUrlUpdating && url.length) {
      dispatch(imageUrlUpdateStart({ id, url: imageArr }));
    } else if (isImageUpdating) {
      const allImagePreviews = allImages.map(({ preview }) => preview);
      const checkDefault = equalsIgnoreOrder(oldArr, allImagePreviews);
      if (checkDefault) {
        dispatch(imageUrlUpdateStart({ id, url: imageArr }));
      }
    }
  }, [isUrlUpdating, url, imageFiles]);

  const closeEdit = () => {
    setShow((i) => !i);
  };
  const populateImages = (images) => {
    setAllImages([...allImages, ...images]);
  };

  const removeFile = (idx) => {
    const values = allImages.filter((item) => item.id !== idx);
    setAllImages(values);
  };

  const setImageOrder = (order) => {
    setAllImages(order);
  };

  const checkIsLoaded = () => {
    setIsImgPreview(true);
  };

  const controlDeleteModal = () => {
    setOpenDelete((i) => !i);
  };

  const deleteBicycle = () => {
    dispatch(deleteBicycleStart({ imgKey, id }));
  };

  const controlDeleteMessage = () => {
    dispatch(getDeleteDefault());
  };

  //checking for a default case
  const equalsIgnoreOrder = (a, b) => {
    if (a.length !== b.length) return false;
    const uniqueValues = new Set([...a, ...b]);
    for (const v of uniqueValues) {
      const aCount = a.filter((e) => e === v).length;
      const bCount = b.filter((e) => e === v).length;
      if (aCount !== bCount) return false;
    }
    return true;
  };

  //move transitions outside
  const duration = 250;
  const textduration = 350;

  const buttonStyle = {
    transition: `transform ${duration}ms ease-in-out`,
  };

  const textStyle = {
    transition: `opacity ${textduration}ms ease-in-out`,
  };

  const deleteButtonTransition = {
    entering: {
      transform: "none",
    },
    entered: {
      transform: "translate3d(0px, 35px, 0px)",
      opacity: 0.5,
    },
    exiting: {
      transform: "translate3d(0px, 35px, 0px)",
      opacity: 0.5,
    },
    exited: {
      transform: "none",
    },
  };

  const deleteTextTransition = {
    entering: {
      opacity: 0,
    },
    entered: {
      opacity: 1,
    },
    exiting: {
      opacity: 1,
    },
    exited: {
      opacity: 0,
    },
  };

  return (
    <>
      {item && (
        <div className="upload-item">
          {show && (
            <ImageUpdate
              allImages={allImages}
              populateImages={populateImages}
              removeFile={removeFile}
              url={deleteArr}
              imgKey={imgKey}
              toRemove={toRemove}
              closeEdit={closeEdit}
              setImageOrder={setImageOrder}
            />
          )}
          <div className="upload-item-image-container">
            <div className="upload-item-image">
              <div className="upload-date">
                <span>Posted on </span>
                <span style={{ fontSize: "10px" }}>
                  {createdAt.substr(0, createdAt.indexOf("T"))}
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {!isImgPreview && (
                  <CustomSpinnerOverlay index={"front"}>
                    <SpinnerContainer size={"small"} />
                  </CustomSpinnerOverlay>
                )}
                <img
                  alt="upload-edit"
                  className={`${
                    !isImgPreview
                      ? "main-upload-image-hidden"
                      : "main-upload-image"
                  }`}
                  onLoad={checkIsLoaded}
                  src={item.url[0]}
                />
                <span
                  style={{ textAlign: "center", padding: "10px" }}
                  className="edit-images"
                  onClick={() => setShow(true)}
                >
                  Edit
                </span>
              </div>{" "}
            </div>
            <div className="delete-confirmation-wrapper">
              {!deleteMessage ? (
                <>
                  <Transition in={openDelete} timeout={duration}>
                    {(state) => (
                      <button
                        style={{
                          ...buttonStyle,
                          ...deleteButtonTransition[state],
                        }}
                        className="delete-button"
                        onClick={controlDeleteModal}
                      >
                        Delete bicycle
                      </button>
                    )}
                  </Transition>
                  <Transition in={openDelete} timeout={duration}>
                    {(state) => (
                      <>
                        {deleteStatus ? (
                          <CustomSpinnerOverlay>
                            <SpinnerContainer size={"small"} />
                          </CustomSpinnerOverlay>
                        ) : (
                          <div
                            className="delete-confirmation"
                            onClick={deleteBicycle}
                          >
                            <span
                              className="delete-confirmation-text"
                              style={{
                                ...textStyle,
                                ...deleteTextTransition[state],
                              }}
                            >
                              Yes, delete my bicycle
                            </span>
                          </div>
                        )}
                      </>
                    )}
                  </Transition>
                </>
              ) : (
                <CustomSnack
                  open={deleteMessage}
                  handleClick={controlDeleteMessage}
                  name="deleteMessage"
                  text="Bicycle Deleted"
                />
              )}
            </div>
          </div>
          <div className="update-bicycle-form-container">
            <div className="update-bicycle-title">
              <h3 style={{ fontWeight: "normal", margin: 0, padding: "10px" }}>
                Update bicycle
              </h3>
              <div className="update-options">
                {isFormUpdating ? (
                  <CustomSpinnerOverlay>
                    <SpinnerContainer size={"small"} />
                  </CustomSpinnerOverlay>
                ) : (
                  <>
                    {edit ? (
                      <>
                        <span className="bici-update-text" onClick={toggleEdit}>
                          {" "}
                          CANCEL{" "}
                        </span>
                        <button
                          type="submit"
                          form="hook-form"
                          className="bici-update-text"
                        >
                          {" "}
                          SAVE{" "}
                        </button>
                      </>
                    ) : (
                      <span className="bici-update-text" onClick={toggleEdit}>
                        {" "}
                        CHANGE{" "}
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>
            <FormUpdate
              inputData={currentBicycle}
              edit={edit}
              toggleEdit={toggleEdit}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default BiciItem;
