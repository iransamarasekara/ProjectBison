import React from 'react'
import './Popular.css'
// import data_product from '../Assets/data' 
import Item from '../Item/Item' // Import the missing Item component
import { useState } from 'react'
import { useEffect } from 'react'

const Popular = () => {

  const [popularProducts,setPopularProducts] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:4000/popularinmora').then((response)=>response.json()).then((data)=>setPopularProducts(data));
  },[])



  return (
    <div className='popular'>
      <h1>Mora</h1>
      <h2>POPULAR</h2>
      {/* <hr/> */}
      <div className='popular-item'>
        {popularProducts.map((item, i)=>{
            return <Item key={i} id={item.id} name={item.name} brand={item.brand} image={item.image} new_price={item.new_price} old_price={item.old_price} rating={item.rating} reviewText={item.reviewText} no_of_rators={item.no_of_rators}/>
        })}
      </div>
    </div>
  )
}

export default Popular
