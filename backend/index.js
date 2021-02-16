const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())


app.get('/', (req, res) => {
    res.send('hello');
})


app.listen(5000);