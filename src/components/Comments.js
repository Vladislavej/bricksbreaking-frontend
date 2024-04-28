import React from 'react';
import axios from 'axios';
import "../css/Comments.css"; // Import the CSS file for styling


const COMMENTS_API_REST_URL = "http://localhost:8080/api/comment/bricksbreaking";

export default class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: []
        };
    }

    componentDidMount() {
        axios.get(COMMENTS_API_REST_URL)
            .then(response => {
                this.setState({ comments: response.data });
            })
            .catch(error => {
                console.error('Error fetching comments:', error);
            });
    }

    formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString('sk', options);
        return formattedDate;
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Comments</h2>
                <table className="table table-striped comments-table">
                    <thead>
                    <tr>
                        <th>User</th>
                        <th>Comment</th>
                        <th>Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.comments.map(comment =>
                        <tr key={comment.id}>
                            <td>{comment.player}</td>
                            <td>{comment.comment}</td>
                            <td>{this.formatDate(comment.commentedOn)}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        );
    }
}
