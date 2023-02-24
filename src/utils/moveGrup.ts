import { BACK_URL } from "./env"

export const moveGrup = async ({id, name}: {
  id: number,
  name: string
}) => {
  await fetch(`${BACK_URL}/devices/addGroup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + '85c199ebb176b1acb0a50b7f0c36d57783957308E47087AC758034736AC4B78DBE617BA5'
    },
    body: JSON.stringify({
      id,
      name
    })
  })

  return true
}
