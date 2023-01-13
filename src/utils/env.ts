export const BACK_URL: string = import.meta.env.VITE_BACK_URL || "";
if (!BACK_URL) {
  throw new Error('BACK_URL is not defined');
}