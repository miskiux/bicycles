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

import AdditionalInfo from "../size-condition/size-condition.component";

import { Button } from "semantic-ui-react";
import "./spec-form.styles.css";

const SpecForm = (props) => {
  const [toggleVal, setToggleVal] = useState("");
  const [listenDocument, setListenDocument] = useState(true);

  const [bottomData] = useState([
    { idx: 0, item: "Cassette", value: "" },
    { idx: 1, item: "Chain", value: "" },
    { idx: 2, item: "Crankset", value: "" },
    { idx: 3, item: "Pedals", value: "" },
  ]);

  const [frameData] = useState([
    { idx: 0, item: "Frame Type", value: "" },
    { idx: 1, item: "Frame Material", value: "" },
  ]);

  const [handlerData] = useState([
    { idx: 0, item: "Headset", value: "" },
    { idx: 1, item: "Handlebars", value: "" },
    { idx: 2, item: "Stem", value: "" },
    { idx: 3, item: "Gear/Brake Lever", value: "" },
  ]);

  const [saddleData] = useState([{ idx: 0, item: "Saddle", value: "" }]);

  const [wheelData] = useState([
    { idx: 0, item: "Fork", value: "" },
    { idx: 1, item: "Brakes", value: "" },
    { idx: 2, item: "Rim", value: "" },
    { idx: 3, item: "Tyre", value: "" },
    { idx: 4, item: "Wheel Size", value: "" },
  ]);

  const [viewSelection, setViewSelection] = useState([]);

  //reducer
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
    bottom: bottomData,
    frame: frameData,
    handler: handlerData,
    saddle: saddleData,
    wheel: wheelData,
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

  const handleChange = (e, idx) => {
    console.log(idx);
    let values = [...partsInfo[toggleVal]];
    values[idx].value = e.target.value;
    props.callback("description", values);
  };

  const getTypedSpecs = () => {
    let typed = [];
    let bottomspec = bottomData.filter((i) => i.value.length);
    let saddlespec = saddleData.filter((i) => i.value.length);
    let framespec = frameData.filter((i) => i.value.length);
    let handlerspec = handlerData.filter((i) => i.value.length);
    let wheelspec = wheelData.filter((i) => i.value.length);
    typed.push(bottomspec, saddlespec, framespec, handlerspec, wheelspec);
    let result = typed.filter((e) => e.length).flat();
    setViewSelection(result);
  };

  return (
    <div class="spec-container">
      {console.log(viewSelection)}
      <div className="image-spec-wrapper">
        {toggleVal && (
          <div className="description-wrapper">
            <AddDescription
              itemData={partsInfo[toggleVal]}
              description={props.description}
              handleChange={handleChange}
            />
          </div>
        )}
        <svg width="800" height="800">
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
      <AdditionalInfo />
    </div>
  );
};

export default SpecForm;
