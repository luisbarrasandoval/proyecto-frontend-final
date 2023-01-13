import {
  atom,
  AtomEffect,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import { BACK_URL } from "../utils/env";

export interface User {
  id: string;
  name: string;
  token: string;
  eid: string;
}

export interface Auth {
  isAuth: boolean;
  user: User;
}

const localStorageAuthEffect =
  (key: string): AtomEffect<Auth> =>
  ({ setSelf, onSet }) => {
    const stored = localStorage.getItem(key);
    if (stored) {
      const parse = JSON.parse(stored);
      setSelf(parse);
    }
    onSet((value, _, isReset) => {
      if (isReset) {
        localStorage.removeItem(key);
      } else {
        const toString = JSON.stringify(value);
        localStorage.setItem(key, toString);
      }
    });
  };

export const authState = atom<Auth>({
  key: "auth",
  default: {
    isAuth: false,
    user: {
      id: "",
      name: "",
      token: "",
      eid: "",
    },
  },
  effects: [localStorageAuthEffect("auth")],
});
