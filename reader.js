const AdmZip = require("adm-zip")
const fs = require("fs")
const WebSocket = require("ws")
const months = ["styczeń", " luty", " marzec", " kwiecień", " maj", " czerwiec", " lipiec", " sierpień", " wrzesień", " październik", " listopad", " grudzień"]
console.log(__dirname)
const ws = new WebSocket("wss://app.test-udt.pl:5551/licznik")
ws.onopen = () => {
  ws.send("admin")
  setTimeout(() => {
    ws.send("uarr")
  }, 5000)
}
const logs = []

ws.addEventListener("message", m => {
  console.log(m.data)
  try {
    const data = JSON.parse(m.data)
    if (data.users != undefined) {
      logs.unshift({ time: Math.floor(new Date().getTime() / 1000), users: parseFloat(data.users) })
    }
    if (data.uarr != undefined) {
      let startTime = parseFloat(data.now)
      data.uarr.forEach(d => {
        logs.unshift({ time: startTime, users: d })
        startTime++
      })
    }
  } catch (err) {

  }
})

const zip = new AdmZip(`${__dirname}/backup/2022- czerwiec.zip`)

zip.forEach(z => {
  let startTime = parseFloat(z.entryName)
  z.getData().toString().split("|").forEach(d => {
    logs.unshift({ time: startTime, users: d })
    startTime++

  })

})

setInterval(() => {
  console.log(logs[0])
}, 1000)