import { BACK_URL } from "./env"

const on = async (id: number) => {
  await fetch(`${BACK_URL}/devices/on`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + '85c199ebb176b1acb0a50b7f0c36d57783957308E47087AC758034736AC4B78DBE617BA5'
    },
    body: JSON.stringify({
      id: id
    })
  })


}

const off = async (id: number) => {
  await fetch(`${BACK_URL}/devices/off`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + '85c199ebb176b1acb0a50b7f0c36d57783957308E47087AC758034736AC4B78DBE617BA5'
    },
    body: JSON.stringify({
      id: id
    })
  })
}

export { on, off }