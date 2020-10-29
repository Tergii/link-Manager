require('dotenv').config({
    path: '.env'
});
const express = require('express');
const process = require('process');
const path = require('path')
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const schemaRoute = require('./routes/routes');


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());

app.use(bodyParser.json());

app.use('/api', schemaRoute);
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}



const port = process.env.PORT || 3000;

app.listen(port, (req, res) => {
    console.log(`nasłuchuje na http://localhost:${port}/`)
});