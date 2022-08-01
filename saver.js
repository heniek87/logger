const AdmZip = require("adm-zip")
const fs = require("fs")
const months = ["styczeń", " luty", " marzec", " kwiecień", " maj", " czerwiec", " lipiec", " sierpień", " wrzesień", " październik", " listopad", " grudzień"]
const randomizeUsers = (before) => {
  const odchylenie = Math.round(Math.random() * 2 + 1)
  const zwrot = before + (odchylenie * (Math.round(Math.random()) ? -1 : 1))
  return zwrot < 0 ? 0 : zwrot > 999 ? 999 : zwrot
}
const files = []
fs.readdirSync("logi").forEach(f => files.push(parseFloat(f)))

const toZip = async (actDate) => {

  actDate.setDate(0)

  const zip = new AdmZip();

  files.forEach(f => zip.addLocalFile(`logi/${f}`))

  zip.writeZip(`backup/${actDate.getFullYear()}-${months[actDate.getMonth()]}.zip`)

  files.forEach(f => fs.unlink(`logi/${f}`, c => { }))
  files.splice(0)

}
const getTimestamp = () => Math.floor(new Date().getTime() / 1000)

let now = getTimestamp()


const uarr = []
let dayOfMonth = new Date().getDate()
let urs = 100
setInterval(() => {
  urs = randomizeUsers(urs)
  uarr.push(urs)
  console.log(urs)
  if (dayOfMonth != new Date().getDate()) {
    console.log(`zapisuję plik ${now}`)
    dayOfMonth = new Date().getDate()
    fs.writeFileSync(`logi/${now}`, uarr.join("|"))
    files.push(now)
    const actDate = new Date()

    if (actDate.getDate() == 1 && actDate.getHours() == 0) {
      console.log(`Pakuję pliki`, files)
      toZip(actDate)
    }
    now = getTimestamp()
    uarr.splice(0)
  }
}, 1000)
