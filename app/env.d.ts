declare namespace NodeJS {
  export interface ProcessEnv {
    REACT_APP_BASE_API_URL: string;
    ENVRIONMENT: "development" | "production";
  } 
}