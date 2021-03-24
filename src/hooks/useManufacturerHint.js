import { useState, useEffect } from "react";
import { getManufacturerData } from "../utils/getManufacturerData";

export const useManufacturerHint = () => {
  const [hintData, setHintData] = useState([]);

  useEffect(() => {
    const getManufacturerHints = () => {
      const hintArray = getManufacturerData();
      setHintData(hintArray);
    };
    getManufacturerHints();
  }, []);
  return { hintData };
};
