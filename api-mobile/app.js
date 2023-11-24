const express = require('express');

require('dotenv').config();
require('./models/db');
const userRouter = require('./routes/user');

const User = require('./models/user');
const user = require('./models/user');

const app = express();

app.use(express.json())
app.use(userRouter)

app.get('/', (request, response) =>{
    response.json({success: true, message: 'mobile'});
})

app.listen(8000, () => {
    console.log('funcionando');
})
