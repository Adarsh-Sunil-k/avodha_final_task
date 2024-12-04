import express from 'express'
import postController from '../../controllers/postController.js';

const postRouter = express.Router();


postRouter.post("/create",postController.createPost);
postRouter.get("/getAll",postController.getAllPost);
postRouter.delete("/delete/:id",postController.deletePost);
postRouter.put('/update/:id',postController.updatePost);

export default postRouter ;
