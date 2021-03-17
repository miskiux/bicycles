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
  onRadioChange,
  callback,
  errors,
}) => [
  {
    title: "Bicycle information",
    id: "general",
    content: (
      <GeneralInfo
        step={step}
        setStep={setStep}
        handleChange={handleChange}
        manufacturer={data.manufacturer}
        year={data.year}
        model={data.model}
        bicycleType={data.bicycleType}
        gender={data.gender}
        price={data.price}
        phone={data.phone}
        callback={callback}
        errors={errors}
      />
    ),
  },
  {
    title: "Bicycle location",
    id: "location",
    content: (
      <ContactInformation
        step={step}
        setStep={setStep}
        handleChange={handleChange}
        callback={callback}
        errors={errors}
      />
    ),
  },
  {
    id: "image",
    content: <ImageInput errors={errors} callback={callback} />,
  },
  {
    id: "specs",
    content: (
      <SpecForm
        errors={errors}
        description={data.description}
        size={data.size}
        info={data.info}
        condition={data.condition}
        handleChange={handleChange}
        onRadioChange={onRadioChange}
        callback={callback}
      />
    ),
  },
];

export default FormSteps;
