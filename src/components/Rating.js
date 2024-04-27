import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Rating = () => {
    const [averageRating, setAverageRating] = useState(null);

    useEffect(() => {
        const fetchAverageRating = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/rating/bricksbreaking');
                setAverageRating(response.data);
            } catch (error) {
                console.error('Error fetching average rating:', error);
            }
        };

        fetchAverageRating();
    }, []);

    return (
        <div>
            {averageRating !== null ? (
                <p>Average rating {averageRating}.</p>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Rating;