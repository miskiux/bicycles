import React from "react";

import GeneralInfo from "../general-info/general-info.component";
import ContactInformation from "../contact-information/contact-information.component";
import ImageInput from "../image-input/image-input.component";
import SpecForm from "../spec-info/spec-form/spec-form.component";

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
}) => [
  {
    title: "General",
    id: 0,
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
    title: "Location",
    id: 1,
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
    content: (
      <ImageInput errors={errors} callback={callback} images={data.image} />
    ),
  },
  {
    title: "Specifications",
    id: 3,
    content: (
      <SpecForm
        errors={errors}
        description={data.description}
        size={data.size}
        info={data.info}
        condition={data.condition}
        handleChange={handleChange}
        callback={callback}
        specsData={specsData}
        specsCallback={specsCallback}
      />
    ),
  },
];

export default FormSteps;
