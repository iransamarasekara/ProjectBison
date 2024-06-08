import React, { useState, useEffect, useCallback, useContext } from 'react';
import './DescriptionBox.css';
import { FaStar } from 'react-icons/fa';
import { UserContext } from '../../Context/UserContext';

const DescriptionBox = (props) => {
  const { product } = props;
  const { all_user } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState('description');
  const [allReviews, setAllReviews] = useState(product.reviewText);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
      fetch('http://localhost:4000/getuser', {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body: "",
      }).then((response) => response.json()).then((data) => setUserEmail(data));
    }
  }, []);

  useEffect(() => {
    const user = all_user.find((user) => userEmail === user.email);
    setCurrentUser(user);
  }, [all_user, userEmail]);

  useEffect(() => {
    if (product && product.reviewText) {
      setAllReviews(product.reviewText);
    }
  }, [product]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const reviewHandler = (e) => {
    setReview(e.target.value);
  };

  const addReview = useCallback(() => {
    if (currentUser && rating) {
      const newReview = {
        itemId: product.id,
        profilephoto: isAnonymous ? 'Anonymous User' : currentUser.profile_pic, // If anonymous, no profile photo
        name: isAnonymous ? 'Anonymous User' : currentUser.name, // If anonymous, display as 'Anonymous User'
        rating: rating ? rating : 0,
        text: review ? review : 'No review',
      };
      setAllReviews(prevReviews => [newReview, ...prevReviews]);
      if (localStorage.getItem('auth-token')) {
        fetch('http://localhost:4000/addreview', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newReview),
        }).then((response) => response.json()).then((data) => console.log(data));
      }
      setReview('');
      setIsAnonymous(false);
      setRating(null);
    } else {
      alert('Rate the product to submit.');
    }
  }, [isAnonymous, product, rating, review, currentUser]);

  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div
          className={`descriptionbox-nav-box ${activeTab === 'description' ? 'active' : ''}`}
          onClick={() => handleTabClick('description')}
        >
          Description
        </div>
        <div
          className={`descriptionbox-nav-box ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => handleTabClick('reviews')}
        >
          Reviews {product.no_of_rators}
        </div>
      </div>
      <div className={`descriptionbox-content ${activeTab === 'description' ? 'active' : ''}`}>
        {product.description}
      </div>
      <div className={`descriptionbox-content ${activeTab === 'reviews' ? 'active' : ''}`}>
        <div className="review-form-container">
          <div className="review-form">
            <p>Rate this product</p>
            <div className="newstar">
              {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;
                return (
                  <label key={index}>
                    <input
                      type="radio"
                      name="rating"
                      value={currentRating}
                      style={{ display: 'none' }}
                    />
                    <FaStar
                      className='star'
                      size={25}
                      color={currentRating <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                      onMouseEnter={() => setHover(currentRating)}
                      onMouseLeave={() => setHover(null)}
                      onClick={() => setRating(currentRating)}
                    />
                  </label>
                );
              })}
            </div>
            <textarea 
              value={review} 
              placeholder='Add your review...' 
              onChange={reviewHandler} 
            />
            <label>
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={() => setIsAnonymous(!isAnonymous)}
              />
              Leave Feedback as Anonymous
            </label>
            <button onClick={addReview}>Submit Review</button>
          </div>
        </div>
        <div className="review-box">
          {allReviews.slice(0, product.no_of_rators+1).map((reviewItem, i) => (
            <div className="review-item" key={i}>
              <div className="reviewer-profile">
                {reviewItem.profilephoto && <img src={reviewItem.profilephoto} alt={`Reviewer ${i + 1}`} className="reviewer-profile-photo" />}
                <p className="reviewer-name">{reviewItem.name}</p>
              </div>
              <div className="reviewer-rating">
                {[...Array(reviewItem.rating)].map((_, j) => (
                  <FaStar key={j} size={20} color="#ffc107" />
                ))}
              </div>
              <p className="review-text">{reviewItem.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DescriptionBox;


