import React from "react";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { SpecMobile } from "../spec-info/spec-form/spec-form-mobile/SpecMobile.component";
import BicycleInformation from "../BicycleInformation/BicycleInformation";
import ContactInformation from "../AddressInformation/AddressInformation";
import ImageInput from "../BicycleImages/BicycleImages";
import SpecForm from "../spec-info/spec-form/spec-form.component";
import { isMobile } from "react-device-detect";

const FormSteps = ({ form, step, violations, manufacturerOptions }) => {
  const isBreakpoint = useMediaQuery(450);

  return [
    {
      title: "Information",
      id: 1,
      content: (
        <BicycleInformation
          step={step}
          data={form}
          violations={violations}
          options={manufacturerOptions}
          title="Information"
        />
      ),
    },
    {
      title: "Location",
      id: 2,
      content: <ContactInformation step={step} data={form} />,
    },
    {
      title: "Images",
      id: 3,
      content: <ImageInput step={step} data={form} />,
    },
    {
      title: "Specifications",
      id: 4,
      content:
        isMobile && isBreakpoint ? (
          <SpecMobile step={step} data={form} />
        ) : (
          <SpecForm step={step} data={form} />
        ),
    },
  ];
};
export default FormSteps;
