import React, { useEffect, useState } from 'react'
import './RelatedProducts.css'
// import data_product from '../Assets/data'
import Item from '../Item/Item'

const RelatedProducts = (props) => {

  const {product} = props;

  const [relared,setRelated] = useState([]);

    useEffect(() => {
        // if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/getrelatedproducts',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"category":product.category}),
            }).then((response)=>response.json()).then((data)=>setRelated(data));
        // }
    },[product.category])


  return (
    <div className='relatedproducts'>
      <h1>Related</h1>
      <h2>Products</h2>
      <hr/>
      <div className="relatedproducts-item">
        {relared.map((item, i)=>{
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} rating={item.rating} reviewText={item.reviewText} no_of_rators={item.no_of_rators}/>
        })}
      </div>
    </div>
  )
}

export default RelatedProducts
