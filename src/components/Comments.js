import React, { useState } from 'react';
import axios from 'axios';
import "../css/Comments.css"; // Import the CSS file for styling

const COMMENTS_API_REST_URL = "http://localhost:8080/api/comment/bricksbreaking";

export default function Comments() {
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);

    const toggleComments = () => {
        if (!showComments) {
            axios.get(COMMENTS_API_REST_URL)
                .then(response => {
                    setComments(response.data);
                    setShowComments(true);
                })
                .catch(error => {
                    console.error('Error fetching comments:', error);
                });
        } else {
            setShowComments(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('en', {
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit'
        });
    };



    return (
        <div className="comments-container">
            <button className="showButton" onClick={toggleComments}>Comments</button>
            <div className={`comments-overlay ${showComments ? 'active' : ''}`}>
                <div className="comments-window">
                    <div>
                        <h2>Comments <button className="close-button" onClick={toggleComments}>Close</button></h2>
                    </div>
                    <table className="comments-table">
                        <thead>
                        <tr>
                            <th>User</th>
                            <th>Comment</th>
                            <th>Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {comments.map(comment =>
                            <tr key={comment.id}>
                                <td>{comment.player}</td>
                                <td>{comment.comment}</td>
                                <td>{formatDate(comment.commentedOn)}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
