export function inProd() {
  return process.env.NODE_ENV === "production";
}
