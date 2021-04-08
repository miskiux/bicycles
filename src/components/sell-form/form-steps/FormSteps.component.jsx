import React from "react";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { SpecMobile } from "../spec-info/spec-form/spec-form-mobile/SpecMobile.component";
import GeneralInfo from "../general-info/general-info.component";
import ContactInformation from "../contact-information/contact-information.component";
import ImageInput from "../image-input/image-input.component";
import SpecForm from "../spec-info/spec-form/spec-form.component";
import { isMobile } from "react-device-detect";

const FormSteps = ({
  data,
  handleChange,
  step,
  setStep,
  callback,
  errors,
  specsData,
  specsCallback,
  locationCallback,
  viewport,
  showMarker,
  setMarker,
}) => {
  const isBreakpoint = useMediaQuery(450);
  return [
    {
      title: "General information",
      id: 0,
      name: "info",
      content: (
        <GeneralInfo
          step={step}
          setStep={setStep}
          handleChange={handleChange}
          manufacturer={data.manufacturer}
          year={data.year}
          model={data.model}
          bicycleType={data.bicycleType}
          subCategory={data.subCategory}
          gender={data.gender}
          price={data.price}
          phone={data.phone}
          callback={callback}
          errors={errors}
          size={data.size}
          condition={data.condition}
          info={data.info}
        />
      ),
    },
    {
      title: "Bicycle location",
      id: 1,
      name: "map marker alternate",
      content: (
        <ContactInformation
          step={step}
          setStep={setStep}
          handleChange={handleChange}
          callback={callback}
          errors={errors}
          address={data.address}
          coordinates={data.coordinates}
          locationCallback={locationCallback}
          viewport={viewport}
          showMarker={showMarker}
          setMarker={setMarker}
        />
      ),
    },
    {
      title: "Images",
      id: 2,
      name: "images",
      content: (
        <ImageInput errors={errors} callback={callback} images={data.image} />
      ),
    },
    {
      title: "Specifications",
      id: 3,
      name: "bicycle",
      content:
        isMobile && isBreakpoint ? (
          <SpecMobile
            errors={errors}
            description={data.description}
            handleChange={handleChange}
            callback={callback}
            specsData={specsData}
            specsCallback={specsCallback}
          />
        ) : (
          <SpecForm
            errors={errors}
            description={data.description}
            handleChange={handleChange}
            callback={callback}
            specsData={specsData}
            specsCallback={specsCallback}
          />
        ),
    },
  ];
};
export default FormSteps;
