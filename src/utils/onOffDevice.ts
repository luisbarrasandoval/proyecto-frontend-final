import { BACK_URL } from "./env"

const on = async (id: number) => {
  await fetch(`${BACK_URL}/devices/on`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + '85c199ebb176b1acb0a50b7f0c36d5772B906246A0EFF0CD28FD753E4E6D47EABCFC9C70'
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
      'Authorization': 'Bearer ' + '85c199ebb176b1acb0a50b7f0c36d5772B906246A0EFF0CD28FD753E4E6D47EABCFC9C70'
    },
    body: JSON.stringify({
      id: id
    })
  })
}

export { on, off }