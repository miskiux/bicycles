import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleAutoCompleteDropdown } from "src/redux/UI/UI.actions";

export const withVisibilityToggle = (WrappedComponent) =>
  function Component(props) {
    const containerRef = useRef();
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.UI.auto_dropdown);

    useEffect(() => {
      const handleClickOutside = (e) => {
        if (
          !isOpen ||
          containerRef.current?.contains(e.target) ||
          props.parentContainer.current?.contains(e.target)
        ) {
          return;
        }

        dispatch(toggleAutoCompleteDropdown());
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen]);

    return (
      <WrappedComponent
        {...props}
        isVisible={isOpen}
        containerRef={containerRef}
      />
    );
  };
