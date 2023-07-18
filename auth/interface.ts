import { RoleFormat } from "../user/enums";

export interface UserPayload {
  name: string;
  userId: string;
  role: RoleFormat;
}
