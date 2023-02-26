export const BACK_URL: string = import.meta.env.VITE_BACK_URL || "http://ec2-34-226-245-123.compute-1.amazonaws.com";
export const FRONT_URL: string = import.meta.env.VITE_FRONT_URL || "http://ec2-34-226-245-123.compute-1.amazonaws.com:3000";

console.log(BACK_URL)
console.log(FRONT_URL)

if (!BACK_URL) {
  throw new Error('BACK_URL is not defined');
}

if (!FRONT_URL) {
  throw new Error('FRONT_URL is not defined');
}