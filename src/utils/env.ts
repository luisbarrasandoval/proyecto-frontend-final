export const BACK_URL: string = import.meta.env.VITE_BACK_URL || "";
export const FRONT_URL: string = import.meta.env.VITE_FRONT_URL || "";

if (!BACK_URL) {
  throw new Error('BACK_URL is not defined');
}

if (!FRONT_URL) {
  throw new Error('FRONT_URL is not defined');
}