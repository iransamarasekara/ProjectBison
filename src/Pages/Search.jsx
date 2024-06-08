import React, {useContext} from 'react'
import {ShopContext} from '../Context/ShopContext'
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RealatedProducts/RelatedProducts';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const {all_product, search} = useContext(ShopContext);
  const product = all_product.find((e)=> e.name === search)
  const navigate = useNavigate();

  //add
  if(!product){
    // alert('No result found');
    // window.location.replace('/');
    navigate('/');
    return null;
  }
  //end

  return (
    <div>
      <Breadcrum product={product}/>
      <ProductDisplay product={product}/>
      <DescriptionBox product={product}/>
      <RelatedProducts product={product}/>
    </div>
  )
}

export default Search
