import { BACK_URL } from "./env";

const getDevices = async (token: string) => {
  const devices = await fetch(BACK_URL + "/devices", {
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

export default getDevices;