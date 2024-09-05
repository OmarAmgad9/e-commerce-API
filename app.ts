import express from 'express';
import dotenv from 'dotenv';
import dbConnection from './config/db';
import mountRoute from './routes';
import { Server } from 'http';


const app = express()
app.use(express.json());
dotenv.config()
dbConnection()

mountRoute(app)

let server: Server;


server = app.listen(process.env.PORT, () => {
    console.log(`Server listen on Port ${process.env.PORT}`)
});

process.on('unhandledRejection', (err: Error)=>{
    server.close(()=>{
        console.log(`unhnadledRejection error: ${err.name} || ${err.message} `);
        process.exit(1)
    })
});