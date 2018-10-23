let express = require('express')
var request = require('request')
let router = express.Router()
const WEATHERAPPID = 'ada721d4a115530d66c7b104b127de89'

router.get('/weather', (req, res) => {
    if(!req.query.lon || !req.query.lat) {
        return res.status(400).send("Missing body parameters")
    }
    const weatherbaseurl = `https://api.openweathermap.org/data/2.5/find?`
    const tofetch = weatherbaseurl + `lat=${req.query.lat}&lon=${req.query.lon}&units=metric&appid=${WEATHERAPPID}`

    request(tofetch, function (error, response, body) {
        body = JSON.parse(body)
        let weatherdata = body.list[0]
      if(error && response.statusCode != 200){
        throw error
      }
      res.send(weatherdata)
    })
})

module.exports = router