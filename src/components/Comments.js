import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "../css/Comments.css";
import CommentForm from "./CommentForm";
const COMMENTS_API_REST_URL = "http://localhost:8080/api/comment/bricksbreaking";
const COMMENTS_PER_PAGE = 10;

export default function Comments({ user }) {
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (showComments) {
            fetchComments();
        }
    }, [showComments]);

    const toggleComments = () => {
        setShowComments(!showComments);
    };

    const fetchComments = () => {
        axios.get(COMMENTS_API_REST_URL)
            .then(response => {
                setComments(response.data);
            })
            .catch(error => {
                console.error('Error fetching comments:', error);
            });
    };

    const paginateComments = () => {
        const startIndex = (currentPage - 1) * COMMENTS_PER_PAGE;
        const endIndex = startIndex + COMMENTS_PER_PAGE;
        return comments.slice(startIndex, endIndex);
    };

    const changePage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(comments.length / COMMENTS_PER_PAGE);

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
                        <h1>Comments <button className="close-comments-button" onClick={toggleComments}>X</button></h1>
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
                        {paginateComments().map(comment =>
                            <tr key={comment.id}>
                                <td>{comment.player}</td>
                                <td>{comment.comment}</td>
                                <td>{formatDate(comment.commentedOn)}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                    <div className="pagination">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button key={index + 1} onClick={() => changePage(index + 1)}>{index + 1}</button>
                        ))}
                    </div>
                    <CommentForm user={user} onSuccess={fetchComments}/>
                </div>
            </div>
        </div>
    );
}