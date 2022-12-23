export function inProd() {
  return process.env.NEXT_PUBLIC_NODE_ENV === "production";
}
