import { UserPayload } from "../auth/interface";
export const createTokenUser = (user: any) => {
  return <UserPayload>{ name: user.name, userId: user.id, role: user.role };
};
