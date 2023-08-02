const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');


const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const settings = {
    port: 8080,
    listenIp: '0.0.0.0',
    crossDomainWhitelist: [
        'http://localhost:4000'
    ]
}

const corsOptions = {
    origin: function (origin, callback) {
        if (settings.crossDomainWhitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true
}

app.use(cors(corsOptions))

const {login} = require('./Handlers/login')
app.post('/login', login)


app.listen(settings.port, () => {
    console.log("服务器已经启动在" + settings.listenIp + ":" + settings.port)
})

