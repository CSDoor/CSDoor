const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const cookieparser = require('cookie-parser')
app.use(express.static(path.join(__dirname, '../build')));
app.use(bodyParser.json());
app.use(cookieParser());


app.listen(PORT, console.log(`listening on port ${PORT}`))
