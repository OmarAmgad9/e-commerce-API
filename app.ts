import express from 'express';
import dotenv from 'dotenv';
import dbConnection from './config/db';
import categoriesRoute from './routes/categories';

const app = express()
app.use(express.json());
dotenv.config()
dbConnection()


app.use('/api/v1/categories', categoriesRoute)

app.listen(process.env.PORT, () => {
    console.log(`Server listen on Port ${process.env.PORT}`)
});