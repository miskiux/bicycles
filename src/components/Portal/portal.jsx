import ReactDOM from "react-dom";

export function Portal(props) {
  const { children } = props;

  const rootElement = document.getElementById(props.selector);

  return rootElement && ReactDOM.createPortal(children, rootElement);
}
