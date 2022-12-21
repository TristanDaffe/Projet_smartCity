const Router = require('./route');
const express = require('express');
const cors = require('cors')
const app = express();

const port = 3001;

app.use(cors())
app.use(express.json());
app.use(Router);

const InternalIp = require("internal-ip");
const ip = InternalIp.v4.sync();

app.listen(port, ip, () => {
    console.log(`Example app listening at http://${ip}:${port}`);
});