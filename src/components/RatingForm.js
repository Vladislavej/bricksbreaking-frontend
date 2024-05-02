import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../css/RatingForm.css"

const RatingForm = ({ user }) => {
    const [rating, setRating] = useState(0);
    const [lastRating, setLastRating] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const isGuest = user && user.username === 'Guest';

    useEffect(() => {
        if (user) {
            const fetchLastRating = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/api/rating/bricksbreaking/${user.username}`);
                    if (response.data !== -1) {
                        setLastRating(response.data);
                        setRating(response.data);
                    }
                } catch (error) {
                    console.error('Error fetching last rating:', error);
                }
            };

            fetchLastRating();
        }
    }, [user]);

    const handleRatingChange = (event) => {
        setRating(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/rating', {
                game: 'bricksbreaking',
                rating: rating,
                player: user.username,
            });
            setIsSubmitted(true);
        } catch (error) {
            setErrorMessage('Error submitting rating. Please try again.');
            console.error('Error submitting rating:', error);
        }
    };

    if (isGuest) {
        return null;
    }

    return (
        <div className="rating-form-container">
            {isSubmitted ? (
                <p>Thank you for rating!</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    {lastRating !== null && <p>Your last rating: {lastRating}</p>}
                    <label>
                        Rate:
                        <input
                            type="number"
                            min="1"
                            max="5"
                            value={rating}
                            onChange={handleRatingChange}
                        />
                    </label>
                    <button type="submit">Submit Rating</button>
                    {errorMessage && <p>{errorMessage}</p>}
                </form>
            )}
        </div>
    );
};

export default RatingForm;
