import Post from '../models/postSchema.js'

//create a post

const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newPost = new Post({
            title,
            content,
        });
        await newPost.save();
        res.status(201).json({
            message: 'Post created successfully',
            post: newPost,
        });
    } catch (error) {
        res.status(400).json({
            message: 'Something went wrong',
            error: error.message,
        });
    }
};


//find post

const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


//edit post

const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { title, content },
            { new: true }
        );
        if (!updatedPost) return res.status(404).send("Post not found");
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//delete post

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findByIdAndDelete(id);

        if (!post) return res.status(404).json({ message: "Post not found" });
        res.status(200).json({ message: "Post deleted successfully", post });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


export default {
    createPost,
    deletePost,
    updatePost,
    getAllPost
}