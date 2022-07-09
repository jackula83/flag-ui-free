const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === "development";

let BffEndpoint: string;

if (isDevelopment) {
  BffEndpoint = "http://localhost:4000/graphql";
}

export {
  BffEndpoint
}