import { atom, AtomEffect } from "recoil";

const localStorageSideBarModeEffect =
  (key: string): AtomEffect<boolean> =>
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

export const sideBarState = atom<boolean>({
  key: "sidebarState",
  default: false,
  effects: [localStorageSideBarModeEffect("sidebar")],
});
