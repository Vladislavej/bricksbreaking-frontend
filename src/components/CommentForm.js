import React, { useState } from 'react';
import axios from 'axios';
import "../css/CommentForm.css";

const AddCommentForm = ({ user, onSuccess }) => {
    const [comment, setComment] = useState('');
    const isGuest = user && user.username === 'Guest';

    if (isGuest) {
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/comment', {
                game: 'bricksbreaking',
                player: user.username,
                comment: comment,
                commentedOn: new Date()
            });

            console.log('Comment added successfully:', response.data);
            setComment('');
            onSuccess();
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <div className="comment-form-container">
            <form className="comment-form" onSubmit={handleSubmit}>
                <button type="submit">Add Comment</button>

                <textarea
                    className="comment-text-area"
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Enter your comment here..."
                />
            </form>
        </div>
    );
};

export default AddCommentForm;