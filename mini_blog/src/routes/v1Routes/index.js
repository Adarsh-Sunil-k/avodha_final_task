import express from 'express'
import postRouter from './postRouter.js';


const v1Router = express.Router();

v1Router.use("/post",postRouter)

export default v1Router;