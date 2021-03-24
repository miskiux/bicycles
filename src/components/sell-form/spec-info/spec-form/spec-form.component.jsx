import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useReducer,
} from "react";

import { useMouseListener } from "../../../../hooks/useMouseListener";

import AddDescription from "./description-field/description-field.component";

import { ReactComponent as BottomClip } from "../../../../assets/clip-paths/bottom.svg";
import { ReactComponent as FrameClip } from "../../../../assets/clip-paths/frame.svg";
import { ReactComponent as HandlerClip } from "../../../../assets/clip-paths/handler.svg";
import { ReactComponent as SaddleClip } from "../../../../assets/clip-paths/saddle.svg";
import { ReactComponent as WheelClip } from "../../../../assets/clip-paths/wheel.svg";

import Edit from "../../../../assets/bi.jpeg";

import "./spec-form.styles.css";

const SpecForm = ({ callback, description, specsData, specsCallback }) => {
  const [toggleVal, setToggleVal] = useState("");
  const [listenDocument, setListenDocument] = useState(true);

  const [viewSelection, setViewSelection] = useState([]);
  const [clipping, dispatch] = useReducer((state, action) => {
    return action;
  });

  const myStateRef = useRef(toggleVal);
  const setToggleValues = (data) => {
    myStateRef.current = data;
    setToggleVal(data);
  };
  const { clip } = useMouseListener(listenDocument);

  const clipIds = ["bottom", "frame", "handler", "saddle", "wheel"];
  const figures = {
    bottom: <BottomClip />,
    saddle: <SaddleClip />,
    frame: <FrameClip />,
    handler: <HandlerClip />,
    wheel: (
      <ellipse
        id="wheel"
        ry="103.10551"
        rx="104.79024"
        cy="386.55209"
        cx="451.51865"
      />
    ),
  };

  const partsInfo = {
    bottom: specsData.slice(0, 4),
    frame: specsData.slice(4, 6),
    handler: specsData.slice(6, 10),
    saddle: specsData.slice(10, 11),
    wheel: specsData.slice(11, 16),
  };

  const addClickListener = useCallback(() => {
    clipIds.forEach((item) => {
      document
        .getElementById(item)
        .addEventListener("click", () => handleShow(item));
    });
  }, []);

  const removeClickListener = () => {
    clipIds.forEach((item) => {
      document
        .getElementById(item)
        .removeEventListener("click", () => handleShow(item));
    });
  };

  useEffect(() => {
    if (listenDocument) {
      dispatch(clip);
    }
  }, [clip, listenDocument]);

  //click
  useEffect(() => {
    addClickListener();
    return () => removeClickListener();
  }, []);

  useEffect(() => {
    let specArr = specsData.filter((i) => i.value.length);
    callback("description", specArr);
  }, [specsData]);

  const handleShow = useCallback((label) => {
    let value = myStateRef.current;
    if (value === label) {
      setToggleValues("");
      setListenDocument(true);
    }
    if (value !== label) {
      setToggleValues(label);
      setListenDocument(false);
    }
    dispatch(label);
  }, []);

  const handleChange = (e, id) => {
    e.preventDefault();
    let inputVals = [...specsData];
    let index = specsData.findIndex((row) => row.idx === id);
    inputVals[index].value = e.target.value;
    specsCallback(inputVals);
  };

  //unneccesarrloty
  const getTypedSpecs = () => {
    let specsArr = specsData.filter((i) => i.value.length);
    setViewSelection(specsArr);
  };

  return (
    <div class="spec-container">
      <div className="image-spec-wrapper">
        {toggleVal && (
          <div className="description-wrapper">
            <AddDescription
              itemData={partsInfo[toggleVal]}
              handleChange={handleChange}
            />
          </div>
        )}
        <svg width="800" height="533">
          <defs>
            <clipPath id="parts">{clipping && figures[clipping]}</clipPath>
          </defs>
          <image
            className={clipping ? "opacity-bicycle" : "bicycle"}
            xlinkHref={Edit}
          />
          <image className="bicycle" xlinkHref={Edit} clipPath="url(#parts)" />
          <BottomClip />
          <FrameClip />
          <HandlerClip />
          <SaddleClip />
          <WheelClip />
        </svg>
      </div>
      <div className="view-selection-container">
        <div onClick={getTypedSpecs}>
          <h3 className="view-selections">View Selected</h3>
        </div>
        <div className="view-selection-grid">
          {viewSelection &&
            viewSelection.map(({ item, value }, i) => (
              <div key={i} className="view-selection-item">
                <span className="selection-label">{item}:</span>
                <span className="selection-value">{value}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SpecForm;
