import React, { useContext } from 'react'
import OrderConfermation from '../../Components/OrderConfirmation/OrderConfermation'
import { UserContext } from '../../Context/UserContext';



const Order = () => {

    const {currentId} = useContext(UserContext);

if(!currentId){
    return window.location.replace("/cart");
}

  return (
    <div>
      <OrderConfermation/>
    </div>
  )
}

export default Order
