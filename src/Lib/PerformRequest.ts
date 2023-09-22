import axios from "axios";

interface RequestOptions {
  method: "POST" | "GET" | "PUT";
  data: any;
  route: string;
}
const baseURL = "https://kabo.designparklab.com.ng";
const PerformRequest = async ({ method, data, route }: RequestOptions) => {
  const config = {
    method,
    data,
    url: `${baseURL}${route}`,
  };
  const r: any = axios.request(config);
  return r;
};

export { PerformRequest };
