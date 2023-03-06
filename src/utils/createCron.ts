import { BACK_URL } from "./env";

const createCron = async (token: string, data: object) => {
  const devices = await fetch(BACK_URL + "/cron", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  });

  return devices.json();
};

export default createCron;