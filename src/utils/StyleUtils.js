export default function StyleUtils() {}
StyleUtils.flatten = function Flatten(classNames) {
  return classNames.filter((className) => Boolean(className)).join(" ");
};
