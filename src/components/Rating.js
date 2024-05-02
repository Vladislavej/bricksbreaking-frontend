import React, { useState, useEffect } from 'react';
import axios from 'axios';
import starImage from '../images/star.png';
import grayStarImage from '../images/gray-star.png';
import "../css/Rating.css"

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

    const renderStars = () => {
        if (averageRating === null) return null;

        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (i <averageRating) {
                stars.push(<img key={i} src={starImage} alt="star" />);
            } else {
                stars.push(<img key={i} src={grayStarImage} alt="gray-star" />);
            }
        }

        return stars;
    };

    return (
        <div className="average-rating">
            {averageRating !== null ? (
                <div>
                    <h2>Average rating</h2>
                    <div style={{ display: 'flex' }}>{renderStars()}</div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Rating;