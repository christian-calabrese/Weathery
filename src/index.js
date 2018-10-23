let express = require('express')
let app = express()
let weatherRouter = require('./routes/weather')
let bodyParser = require('body-parser')
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json())

app.use(express.static('public'))
app.use(weatherRouter)

app.listen(PORT, () => console.log(`Server listening on ${PORT}`))
