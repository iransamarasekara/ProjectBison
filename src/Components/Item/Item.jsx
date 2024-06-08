import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';

const Item = (props) => {
  const handleItemClick = () => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  };

  return (
    <Link to={`/product/${props.id}`} style={{textDecoration:'none', color:'black'}} className="item-link" onClick={handleItemClick}>
      <div className='item'>
        <img src={props.image} alt='' />
        <p className='name'>{props.name}</p>
        <p>{props.brand}</p>
        <div className='item-prices'>
          <div className="item-price-new">
            Rs.{props.new_price}
          </div>
        </div>
        <div className="productdisplay-right-star">
          {(props.rating>=1)?<img src={star_icon} alt=''/>:<img src={star_dull_icon} alt=''/>}
          {(props.rating>=2)?<img src={star_icon} alt=''/>:<img src={star_dull_icon} alt=''/>}
          {(props.rating>=3)?<img src={star_icon} alt=''/>:<img src={star_dull_icon} alt=''/>}
          {(props.rating>=4)?<img src={star_icon} alt=''/>:<img src={star_dull_icon} alt=''/>}
          {(props.rating>=5)?<img src={star_icon} alt=''/>:<img src={star_dull_icon} alt=''/>}


          {/* {(props.no_of_rators>0)?<p>({props.no_of_rators})</p>:<p> </p>} */}
          <p>({props.no_of_rators})</p> 

        </div>
        {/* <button>Buy Now</button> */}
      </div>
    </Link>
  );
};

export default Item;


