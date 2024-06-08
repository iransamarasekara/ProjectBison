import React from 'react'
import './NewCollectionTrue.css'

import Item from '../Item/Item'
import { useState } from 'react'
import { useEffect } from 'react'

const NewCollectionTrue = () => {
    const [new_collection,setNew_Collection] = useState([]);

    useEffect(()=>{
      fetch('http://localhost:4000/newcollections').then((response)=>response.json()).then((data)=>setNew_Collection(data))
    },[])
  
    return (
      <div id='latestCollection' className='newcollections1'>
        <h1>NEW</h1>
        <h2>COLLECTIONS</h2>
        <hr/>
        <div className="collections1">
          {new_collection.map((item, i)=>{
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} rating={item.rating} reviewText={item.reviewText} no_of_rators={item.no_of_rators}/>
          })}
        </div>
      </div>
    )
}

export default NewCollectionTrue
