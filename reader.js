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
ws.addEventListener("message", m => {
  console.log(m.data)

})
