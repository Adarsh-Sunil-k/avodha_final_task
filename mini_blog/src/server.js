import express from 'express'
import serverConfig from './config/serverConfig.js';
import dbConnection from './config/dbConfig.js';
import apiRouter from './routes/index.js';
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json())

app.use('/api',apiRouter)

app.get("/",(req,res)=>{
    res.send("hello world");
}) 

app.listen(serverConfig.port,()=>{
    console.log(`app listening on  port ${serverConfig.port}`);
    dbConnection() 
})   