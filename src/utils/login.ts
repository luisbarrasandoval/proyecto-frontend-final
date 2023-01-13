import { User } from "../atom/auth";
import { BACK_URL } from "./env";

export const login = async (token: string): Promise<User> => {

  const query = `token=${token}`;
  const res = await fetch(`${BACK_URL}/login?${query}`, {
    method: "GET",
  });


  const data = await res.json();
  if (data.token !== token) {
    throw new Error("token is not valid");
  }
  
  return data
};

