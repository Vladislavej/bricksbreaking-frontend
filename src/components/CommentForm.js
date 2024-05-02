import React, { useState } from 'react';
import axios from 'axios';
import "../css/Comments.css"; // Import the CSS file for styling

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
                <label htmlFor="comment">Your Comment:</label>
                    <textarea className="comment-text-area"
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                <button type="submit">Add Comment</button>
            </form>
        </div>
    );
};

export default AddCommentForm;