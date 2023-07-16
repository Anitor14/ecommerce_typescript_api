import { MessageResponse, RoleFormat } from "./enums";

export interface IUser {
  email: string;
  password: string;
  role: RoleFormat;
}

export interface IResponseSchema {
  message: MessageResponse;
  description: string;
  data: any;
}
