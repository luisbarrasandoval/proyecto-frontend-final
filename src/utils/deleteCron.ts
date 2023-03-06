import { BACK_URL } from "./env";

const deleteCron = async (token: string, id: string) => {
  const devices = await fetch(BACK_URL + "/cron/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  return devices.json();
};

export default deleteCron;