import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "./SellOverview.module.scss";

import imageUrl from "src/assets/sellform-back.jpg";
import { getUserData } from "../../../redux/User/user.actions";
import HorizontalTabs from "src/components/Shared/HorizontalTabs/HorizontalTabs";
import FormSteps from "src/components/SellForm/form-steps/FormSteps.component";
import { setFormStep } from "../../../redux/SellStore/SellFormStore/SellForm.actions";

export default function SellOverview({ email, id, sellForm }) {
  const dispatch = useDispatch();

  const steps = FormSteps({
    ...sellForm,
  });

  useEffect(() => {
    dispatch(getUserData({ email, id }));
  }, [email, id, dispatch]);

  // refactor submit logic
  const onFormSubmit = (event) => {
    event.preventDefault();
    // const err = validate();
    // if (Object.keys(err).length) {
    //   invalidForm("Invalid input values");
    //   return;
    // } else {
    //   imageUploadStart();
    // }
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.backgroundImage}
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      {/* <div className={styles.controllers}>
        
      </div> */}

      {/* <div className="sellpage-control-options">
        <div
          className="sellpage-goback"
          onClick={() => RouteUtils.GoBack(history)}
        >
          <Icon name="long arrow alternate left" />
          <span>Back</span>
        </div>
        <div className="submit-wrapper">
          <AnimatedButton onClick={onFormSubmit} />
          <AnimatedSpinner loading={isLoading} />
        </div>
      </div> */}
      <div className={styles.stepContainer}>
        <HorizontalTabs
          tabs={steps}
          onClick={(id) => dispatch(setFormStep(id))}
          active
        />
        <div className={styles.step}>
          {steps[`${sellForm.step - 1}`].content}
        </div>
      </div>
    </div>
  );
}
