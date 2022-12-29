const express = require('express')
var bodyParser = require('body-parser');

const app= express()
const oderRoutes = require('./Routes/user.routes');

const port = 8000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/user',oderRoutes);

app.listen(port,()=>console.log(`app is runing ${port}`))