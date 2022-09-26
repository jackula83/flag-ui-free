const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === "development";

let BffEndpoint: string;

if (isDev) {
  BffEndpoint = "http://localhost:4000/graphql";
}

export const isDevelopment = () => isDev;
export const isFree = () => true;

export {
  BffEndpoint
}