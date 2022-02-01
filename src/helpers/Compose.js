export const Compose =
  (...rest) =>
  (x) =>
    rest.reduceRight((y, f) => f(y), x);
