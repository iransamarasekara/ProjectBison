import React, {useContext, useState, useEffect} from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import Item from '../Components/Item/Item'
import ImageSlider from '../Components/ImageSlider/ImageSlider'

const ShopCategory = (props) => {
  const {all_product,all_advertisement} = useContext(ShopContext);
  const [sortMethod, setSortMethod] = useState('date');
  const [arr, setArr] = useState([]);
  const [productArr, setProductArr] = useState([]);

  useEffect(() => {
    setArr(all_advertisement.filter(item => props.category === item.ad_category).map(item => item.ad_image));
    setProductArr(all_product.filter(item => props.category === item.category));
  }, [all_advertisement, all_product, props.category]);

  const containerStyles = {
    width:'100%',
    height:'30vw',
    margin: '80px auto',
    alignItems : 'center'
  }

  const changeHandler = (e) => {
    setSortMethod(e.target.value);
  }

  const dynamicSort = (a, b) => {
    if (sortMethod === 'date') {
      return b.date.localeCompare(a.date);
    } else if (sortMethod === 'new_price') {
      return a.new_price - b.new_price;
    } else if (sortMethod === 'rating') {
      return b.rating - a.rating;
    }
  }

  return (
    <div className='shop-category'>
      <div style={containerStyles}>
        <ImageSlider slides={arr}/>
      </div>
      <div className='shopcategory-indexSort'>
        <p>
          <span>Showing 1-{productArr.length}</span> out of {productArr.length} products
        </p>
        <div className="shopcategory-sort">
          <p>Sort By</p>
          <select onChange={changeHandler} className='add-product-selector'>
              <option value='date'>Date</option>
              <option value='new_price'>Price</option>
              <option value='rating'>Rating</option>
          </select>
        </div>
      </div>
      <div className="shopcategory-products">
        {productArr.sort(dynamicSort).map((item, i) => {
          return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} rating={item.rating} reviewText={item.reviewText} no_of_rators={item.no_of_rators}/>
        })}
      </div>
      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  )
}

export default ShopCategory
