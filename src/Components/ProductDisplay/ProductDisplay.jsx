import React, {useContext, useEffect, useState} from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';
import ImageSlider from '../ImageSlider/ImageSlider';

const useResponsiveStyles = () => {
  const [containerStyles, setContainerStyles] = useState({
    width: '600px',
    height: '650px',
    margin: '0 auto',
  });

  useEffect(() => {
    const updateStyles = () => {
      if (window.innerWidth <= 480) {
        setContainerStyles({
          width: '100%', // Full width on mobile
          height: 'auto', // Adjust height as needed
          margin: '0 auto',
        });
      } else if (window.innerWidth <= 768) {
        setContainerStyles({
          width: '300px', // Smaller width on tablets
          height: '450px', // Adjust height as needed
          margin: '0 0',
        });
      } else if (window.innerWidth <= 1024) {
        setContainerStyles({
          width: '350px', // Smaller width on tablets
          height: '450px', // Adjust height as needed
          margin: '0 0',
        });
      } else {
        setContainerStyles({
          width: '550px', // Default styles for larger screens
          height: '650px',
          margin: '0 auto',
        });
      }
    };

    window.addEventListener('resize', updateStyles);
    updateStyles(); // Initialize styles based on current window size

    return () => window.removeEventListener('resize', updateStyles);
  }, []);

  return containerStyles;
};

const ProductDisplay = (props) => {
  const {product} = props;
  const {addToCart} = useContext(ShopContext);
  const [size1, setSize1] = useState(null);

  const [alertMessage, setAlertMessage] = useState('');

  const [color1, selectColors1] = useState(null);
 

  const selectSize = (size) => {
    if(product.available){
      setSize1(size);
    }else{
      alert('This Product is not available');
    }
  };

  const selectColors = (color) => {
    if(product.available){
      selectColors1(color);
    }else{
      alert('This Product is not available') ;
    }
  };

  // useEffect(() => {
  //   const button = document.querySelector('.productdisplay-right-addtoCart button');
  //   if (button) {
  //     button.addEventListener('click', function() {
  //       this.classList.add('clicked');
  //     });
  //   }
  // }, []);


  const handleAction = () => {
    if(product.available){
      
    
      if(localStorage.getItem('auth-token')){
        
        if (!size1 || !color1) {
          setAlertMessage('*Please select both size and color');
        } else {
          // Perform the action
          addToCart(product.id, size1,color1);
          setAlertMessage('Added to cart'); // Clear the alert message if action is successful

        }
      }else{
        setAlertMessage('*Please login before order');
      }
    }else{
      alert('This Product is not available');
    }
  };
  //end
  const slides = [];
  if(product.image){
    slides.push(product.image);
  }
  if(product.image_2){
    slides.push(product.image_2);
  }
  if(product.image_3){
    slides.push(product.image_3);
  }

  const containerStyles = useResponsiveStyles();

  // const containerStyles = {
  //   width: '600px',
  //   height:'650px',
  //   margin: '0 auto',
  // }

  

  return (
    <div className='productdisplay'>
      
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt=''/>
          <img src={product.image} alt=''/>
          <img src={product.image} alt=''/>
          <img src={product.image} alt=''/>
        </div>

        <div style={containerStyles}>
          <ImageSlider slides={slides}/>
        </div>
        {/* <div className="productdisplay-img">
        <img className='productdisplay-main-img' src={product.image} alt=''/>
        </div> */}
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className='availability'>{!product.available?<p>*This product not available</p>:<></>}</div>

        <div className="productdisplay-right-club">
          <div className='event_logo'>
            <img src={product.image_logo} alt=''/>
          </div>
        </div>

        {/* <div className="productdisplay-right-description">Lorem ipsum dolor sit amet
         consectetur adipisicing elit. Quisquam molestiae illum, incidunt facere dolor
          omnis mollitia dolorem perferendis nemo cum doloremque, ad praesentium
           exercitationem ullam repellendus, ducimus sequi minima sed.
        </div> */}

        <div className="productdisplay-right-star">
          {(product.rating>=1)?<img src={star_icon} alt=''/>:<img src={star_dull_icon} alt=''/>}
          {(product.rating>=2)?<img src={star_icon} alt=''/>:<img src={star_dull_icon} alt=''/>}
          {(product.rating>=3)?<img src={star_icon} alt=''/>:<img src={star_dull_icon} alt=''/>}
          {(product.rating>=4)?<img src={star_icon} alt=''/>:<img src={star_dull_icon} alt=''/>}
          {(product.rating>=5)?<img src={star_icon} alt=''/>:<img src={star_dull_icon} alt=''/>}
        
          {/* <img src={star_icon} alt=''/>
          <img src={star_icon} alt=''/>
          <img src={star_icon} alt=''/>
          <img src={star_dull_icon} alt=''/> */}
          <p>( {product.no_of_rators} )</p>
        </div>

        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-new">Rs.{product.new_price}</div>
          {product.old_price?<div className="productdisplay-right-price-old">Rs.{product.old_price}</div>:<></>}
          
        </div>

        <div className="productdisplay-right-description">{product.description}
        </div>

        <div className='productdisplay-right-color'>
          <h4>Select Color</h4>
          <div className='productdisplay-right-colors'>
            {product.colors.map((color, index) => (
              <button
                key={index}
                onClick={() => selectColors(color)}
                style={{
                  background: color,
                  border: color1 === color ? '2px solid black' : 'none',
                  position: 'relative',
                }}
              >
                {color1 === color && (
                  <svg
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    style={{
                      position: 'absolute',
                      top: '5px',
                      left: '5px',
                      width: '24px',
                      height: '24px',
                      fill: '#fff',
                      stroke: '#fff', // Adding white outline
                      strokeWidth: '0', // Stroke width
                      color: 'lightgreen',
                    }}
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M19.7071 4.29289C20.0976 4.68342 20.0976 5.31658 19.7071 5.70711L10.7071 14.7071C10.3166 15.0976 9.68342 15.0976 9.29289 14.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L10 12.5858L18.2929 4.29289C18.6834 3.90237 19.3166 3.90237 19.7071 4.29289Z'
                      fill='currentColor'
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            {product.avl_size[0] &&(
              <button className={size1 === product.avl_size[0] ? 'active' : ''} onClick={() => selectSize(product.avl_size[0])}>{product.avl_size[0]}</button>
            )}
            {product.avl_size[1] &&(
              <button className={size1 === product.avl_size[1] ? 'active' : ''} onClick={() => selectSize(product.avl_size[1])}>{product.avl_size[1]}</button>
            )}
            {product.avl_size[2] &&(
              <button className={size1 === product.avl_size[2] ? 'active' : ''} onClick={() => selectSize(product.avl_size[2])}>{product.avl_size[2]}</button>
            )}
            {product.avl_size[3] &&(
              <button className={size1 === product.avl_size[3] ? 'active' : ''} onClick={() => selectSize(product.avl_size[3])}>{product.avl_size[3]}</button>
            )}
            {product.avl_size[4] &&(
              <button className={size1 === product.avl_size[4] ? 'active' : ''} onClick={() => selectSize(product.avl_size[4])}>{product.avl_size[4]}</button>
            )}

          </div>
        </div>

        {/* <div className="additional-images">
          {product.image_2 &&(
            <img src={product.image_2} alt=''/>
          )}

          {product.image_3 &&(
            <img src={product.image_3} alt=''/>
          )}
        </div> */}

        <div className="productdisplay-right-addtoCart">
          <button onClick={()=>{handleAction()}}>ADD TO CART</button>
          {alertMessage && <p className="alert-message">{alertMessage}</p>}
        </div>
        
        <p className='productdisplay-right-category'><span>Category :</span>Women, T-Shirt, Crop-Top</p>
        <p className='productdisplay-right-category'><span>Tags :</span>Modern, Latest</p>
      </div>
    </div>
  )
}

export default ProductDisplay
