import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostForm = () => {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isEditing, setIsEditing] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');

    // Fetch posts
    useEffect(() => {
        axios
            .get('http://localhost:3000/api/v1/post/getAll')
            .then((res) => setPosts(res.data))
            .catch((err) => console.error(err.message));
    }, [posts]);

    // Add a new post
    const AddPostHandler = () => {
        axios
            .post('http://localhost:3000/api/v1/post/create', { title, content })
            .then((res) => {
                setPosts([...posts, res.data]);
                setTitle('');
                setContent('');
            })
            .catch((err) => console.error(err.message));
    };

    // Save edits to a post
    const SavePostHandler = (id) => {
        const updatedPost = { title: editTitle, content: editContent };
        axios
            .put(`http://localhost:3000/api/v1/post/update/${id}`, updatedPost)
            .then((res) => {
                setPosts(posts.map((post) => (post._id === id ? res.data : post)));
                setIsEditing(null);
                setEditTitle('');
                setEditContent('');
            })
            .catch((err) => console.error(err));
    };

    // Delete a post
    const DeletePostHandler = (id) => {
        axios
            .delete(`http://localhost:3000/api/v1/post/delete/${id}`)
            .then(() => setPosts(posts.filter((post) => post._id !== id)))
            .catch((err) => console.error(err));
    };

    // Submit handler for adding a new post
    const handleSubmit = (e) => {
        e.preventDefault();
        AddPostHandler();
    };

    return (
        <div className="container mt-4">
            {/* Form Section */}
            <form onSubmit={handleSubmit} className="m-2 bg-warning bg-opacity-60 rounded shadow-sm p-4">
                <h1 className="text-center mb-4">Post Your Ideas Here</h1>
                <div className="mb-3">
                    <input
                        className="form-control"
                        placeholder="Enter the title of your content"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <textarea
                        className="form-control"
                        placeholder="Describe your content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-success">
                        Submit
                    </button>
                </div>
            </form>

            {/* Posts Section */}
            <div className="row mt-4 g-2">
                {posts.map((post) => (
                    <div
                        key={post._id}
                        className="col-12 col-sm-6 col-md-4 col-xl-3 p-2"
                    >
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                {isEditing === post._id ? (
                                    <>
                                        <input
                                            type="text"
                                            className="form-control mb-2"
                                            value={editTitle}
                                            onChange={(e) => setEditTitle(e.target.value)}
                                        />
                                        <textarea
                                            className="form-control mb-2"
                                            value={editContent}
                                            onChange={(e) => setEditContent(e.target.value)}
                                        />
                                        <button
                                            onClick={() => SavePostHandler(post._id)}
                                            className="btn btn-success me-2"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => setIsEditing(null)}
                                            className="btn btn-secondary"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                        <>
                                        <div className='text-center'>
                                            <h5 className="card-title">{post.title}</h5>
                                            <p className="card-text">{post.content}</p>
                                            <button
                                                onClick={() => {
                                                    setIsEditing(post._id);
                                                    setEditTitle(post.title);
                                                    setEditContent(post.content);
                                                }}
                                                className="btn btn-warning me-2"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => DeletePostHandler(post._id)}
                                                className="btn btn-danger"
                                            >
                                                Delete
                                            </button>
                                    </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostForm;
