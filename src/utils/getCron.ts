import { BACK_URL } from "./env";

const getCron = async (token: string) => {
  const devices = await fetch(BACK_URL + "/cron", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  if (!devices.ok) {
    throw new Error("Error getting devices");
  }


  return devices.json();
};

export default getCron;