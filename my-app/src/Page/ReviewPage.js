import React, { useState, useEffect } from 'react';

const ReviewPage = ({ customId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/products/${customId}/reviews`);
        const reviewData = await response.json();
        setReviews(reviewData.reviews); 
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [customId]);

  return (
    <div>
      <h3>Reviews</h3>
      {loading ? (
        <p>Loading reviews...</p>
      ) : (
        <>
          {reviews && reviews.length > 0 ? (
            <ul>
              {reviews.map((review) => (
                <li key={review.id}>
                  <p>{review.reviewName}</p>
                  <p>Rating: {review.rating}</p>
                  <p>Comment:{review.content}</p>
                  <p>Timestamp: {new Date(review.timestamp).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews yet. Be the first to write one!</p>
          )}
        </>
      )}
    </div>
  );
};

export default ReviewPage;
