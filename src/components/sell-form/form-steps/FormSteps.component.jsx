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
}) => [
  {
    title: "Bicycle information",
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
        callback={callback}
      />
    ),
  },
  {
    title: "Bicycle location",
    content: (
      <ContactInformation
        step={step}
        setStep={setStep}
        handleChange={handleChange}
        phone={data.phone}
        callback={callback}
      />
    ),
  },
  {
    title: "Upload bicycle",
    content: <ImageInput step={step} setStep={setStep} callback={callback} />,
  },
  {
    title: "Bicycle specifications",
    content: (
      <SpecForm
        step={step}
        setStep={setStep}
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
