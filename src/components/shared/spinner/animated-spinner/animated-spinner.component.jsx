import React from "react";

import {
  loaderduration,
  loaderStyle,
  loaderStyleTransition,
} from "../../../../animations/loader-animations/loader-animations";
import { Transition } from "react-transition-group";
import {
  CustomSpinnerOverlay,
  SpinnerContainer,
} from "../../../with-spinner/with-spinner.styles";

export default function AnimatedSpinner({ loading }) {
  return (
    <Transition in={loading} timeout={loaderduration}>
      {(state) => (
        <CustomSpinnerOverlay
          style={{
            ...loaderStyle,
            ...loaderStyleTransition[state],
          }}
        >
          <SpinnerContainer size="small" />
        </CustomSpinnerOverlay>
      )}
    </Transition>
  );
}
