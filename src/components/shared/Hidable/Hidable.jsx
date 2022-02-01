import React from "react";

export function Hidable(props) {
  return props.isVisible ? <>{props.children}</> : null;
}
