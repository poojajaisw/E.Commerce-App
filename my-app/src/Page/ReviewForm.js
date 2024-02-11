import React, { useState } from 'react';
import { useSelector } from 'react-redux'; 

const ReviewForm = ({ customId }) => {
  const [rating, setRating] = useState('');
  const [content, setContent] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState(null);

  
  const user = useSelector((state) => state.user);

  const onReviewSubmit = async (e) => {
    e.preventDefault();

    
    if (!rating || !content) {
      alert('Please provide both rating and content.');
      return;
    }

    
    const apiUrl = `http://localhost:8080/products/${customId}/reviews`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTZkNTM4YWI1MDI0MzdlMjI5MTdkNjkiLCJpYXQiOjE3MDE2NjQwODIsImV4cCI6MTcwMTY2NzY4Mn0.hKTL70NBenL3ZwhSeZXHmyLm5pzMSqbPsBwOjw6jxdo"}`, // Include the user token in the Authorization header
        },
        body: JSON.stringify({
          rating: parseInt(rating), 
          content,
        }),
      });

      if (response.ok) {
        
        setSubmissionStatus('success');
        
        setRating('');
        setContent('');
      } else {
        console.error('Failed to submit review');
        
        setSubmissionStatus('error');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      
      setSubmissionStatus('error');
    }
  };

  return (
    <div>
      {submissionStatus === 'success' && (
        <div className="success-message shadow-lg p-3 mb-5">Review submitted successfully!</div>
      )}
      {submissionStatus === 'error' && (
        <div className="error-message">Failed to submit review. Please try again.</div>
      )}
      {submissionStatus !== 'success' && (
        <form onSubmit={onReviewSubmit}>
          <div className="mb-3">
            <label htmlFor="rating" className="form-label">
              Rating
            </label>
            <input
              type="number"
              className="form-control"
              id="rating"
              aria-describedby="ratingHelp"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label">
              Content
            </label>
            <textarea
              className="form-control"
              id="content"
              rows="3"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit Review
          </button>
        </form>
      )}
    </div>
  );
};

export default ReviewForm;

