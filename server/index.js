const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors({
    origin:true
}));
app.use(require('serve-static')(__dirname + './../dist'));
app.use('/devices', require('./devices'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});