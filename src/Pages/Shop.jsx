import React from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import NewCollections from '../Components/NewCollection/NewCollections'
import NewCollectionTrue from '../Components/NewCollectionTrue/NewCollectionTrue'
// import NewsLetter from '../Components/NewsLetter/NewsLetter'

const Shop = () => {
  return (
    <div>
      <Hero/>
      <Popular/>
      <NewCollectionTrue/>
      <NewCollections/>
      {/* <NewsLetter/> */}
    </div>
  )
}

export default Shop
