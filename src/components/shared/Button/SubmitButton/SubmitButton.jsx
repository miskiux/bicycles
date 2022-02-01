import React, { useState } from "react";

import { Transition } from "react-transition-group";
import {
  duration,
  buttonTransition,
  buttonStyle,
} from "src/animations/button-animations/button-animations";

export default function SubmitButton(props) {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    const { onClick } = props;

    onClick && setActive((toggle) => !toggle);
  };

  return (
    <Transition in={active} timeout={duration}>
      {(state) => (
        <button
          style={{
            ...buttonStyle,
            ...buttonTransition[state],
          }}
          onClick={handleClick}
        >
          Submit
        </button>
      )}
    </Transition>
  );
}
