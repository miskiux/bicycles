import React, { useState } from "react";

import FormUpdate from "../form-update/form-update.component";

import "./bici-item.styles.scss";

//refresing - make saga listen to changes
//show date under the picture

function BiciItem({ biciInfo, edit, toggleEdit }) {
  const { item, createdAt } = biciInfo;
  return (
    <>
      {item && (
        <div className="upload-item">
          <div className="upload-item-image">
            <div className="upload-date">
              <span>Posted on </span>
              <span style={{ fontSize: "10px" }}>
                {createdAt.substr(0, createdAt.indexOf("T"))}
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <img
                alt="upload-edit"
                className="main-upload-image"
                src={item.url[0]}
              />
              <span
                style={{ textAlign: "center", padding: "10px" }}
                className="edit-images"
              >
                Edit
              </span>
            </div>
          </div>
          <div className="update-bicycle-form-container">
            <div className="update-bicycle-title">
              <h3>Update bicycle</h3>
              {edit ? (
                <div className="update-options">
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
                </div>
              ) : (
                <span className="bici-update-text" onClick={toggleEdit}>
                  {" "}
                  CHANGE{" "}
                </span>
              )}
            </div>
            <FormUpdate
              inputData={biciInfo}
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
