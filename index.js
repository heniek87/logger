const fs = require("fs")

const randomizeUsers = (before) => {
  const odchylenie = Math.round(Math.random() * 2 + 1)
  return before + (odchylenie * (Math.round(Math.random()) ? -1 : 1))
}

const getTimestamp = () => Math.floor(new Date().getTime() / 1000)

let now = getTimestamp()

const uarr = []

let urs = 100
setInterval(() => {
  urs = randomizeUsers(urs)
  uarr.push(urs)
  if (uarr.length == 3600) {
    fs.writeFileSync(`logi/${now}`, uarr.join("|"))
    now = getTimestamp()
    uarr.splice(0)
  }
}, 1)