import { atom, AtomEffect } from "recoil";

export type ThemeMode = "light" | "dark";

const localStorageThemeModeEffect =
  (key: string): AtomEffect<ThemeMode> =>
  ({ setSelf, onSet }) => {
    const stored = localStorage.getItem(key);
    if (stored === "dark" || stored === "light") {
      setSelf(stored);
    }
    onSet((value, _, isReset) => {
      if (isReset) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value || _);
      }
    });
  };

export const themeState = atom<ThemeMode>({
  key: "themeState",
  default: "light",
  effects: [localStorageThemeModeEffect("theme")],
});
