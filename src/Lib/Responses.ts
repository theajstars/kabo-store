import { User } from "./Types";

export interface DefaultResponse {
  status: "success" | "failed";
  response_code: number;
  message: string;
}
export interface LoginResponse {
  token: string;
  data: {
    status: "success" | "failed";
    response_code: number;
    message: string;
    data: User;
  };
}
