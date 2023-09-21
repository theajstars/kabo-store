import axios from "axios";

interface RequestOptions {
  method: "POST" | "GET" | "PUT";
  data: any;
  endpoint: string;
}
const baseURL = "https://kabo.designparklab.com.ng";
const PerformRequest = async ({ method, data, endpoint }: RequestOptions) => {
  const config = {
    method,
    data,
    url: `${baseURL}${endpoint}`,
  };
  const r: any = axios.request(config);
  return r;
};

export { PerformRequest };
