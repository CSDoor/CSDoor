const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const router = require('./router.js')

// serve static files
app.use(express.static(path.join(__dirname, '../public')));

// parse cookies and body
app.use(bodyParser.json());
app.use(cookieParser());

// route get and post requests to router
router(app);

// create port
const PORT = 3000; 
app.listen(PORT, console.log(`listening on port ${PORT}`))
