import express from 'express';
import dotenv from 'dotenv';
import bodyparser from 'body-parser'

import Connection from './database/db.js'

import user_signup from './controller_functions/user_signup.js'
dotenv.config()

const PORT = process.env.PORT
const DB_URL = process.env.DB_URL

const app = express();

Connection(DB_URL)

app.listen(PORT, () => {console.log(`Server Started at Port No. ${PORT}`)})
app.use(bodyparser.json({ extended: true }));
app.use(bodyparser.urlencoded({ extended: true }));
app.post('/signup',user_signup)
app.post('*',(request,response) => {
    response.status(404).json({message:'Not Found This route'})
})