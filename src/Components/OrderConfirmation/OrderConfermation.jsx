import React, { useCallback, useEffect, useState } from 'react'
import './OrderConfermation.css'
import { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import { UserContext } from '../../Context/UserContext'
import upload_area from '../Assets/upload_area.svg'
import remove_icon from '../Assets/cart_cross_icon.png'

const OrderConfermation = () => {

    const {all_product, cartItems, removeAllFromCart, removeFromCartById} = useContext(ShopContext);
    const {all_user,currentId} = useContext(UserContext);
    const [userEmail, setUserEmail] = useState(null);
    const [image,setImage] = useState(false);

    const [modal, setModal] = useState(false);

    const toggleModal = (e) => {
        setModal(!modal);
        checkImgReq(e);
    };

    // if(modal) {
    //     document.body.classList.add('active-modal')
    // } else {
    //     document.body.classList.remove('active-modal')
    // }

    

    useEffect(() => {
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/getuser',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:"",
            }).then((response)=>response.json()).then((data)=>setUserEmail(data));
        }
    },[])

    // useEffect(() => {
    //     window.addEventListener('beforeunload', alertUser);
    //     return () => {
    //       window.removeEventListener('beforeunload', alertUser);
    //     };
    // }, []);
    
    // const alertUser = (e) => {
    //     if (!field1 || !field2 || !field3) {
    //         e.preventDefault();
    //         e.returnValue = '';
    //     }
    //     // e.preventDefault();
    //     // e.returnValue = '';
    // };
    

    const [newFormData,setNewFormData] = useState({
        uder_id:"",//provide email of the user
        slip_image:"",
        num_purchase_products:cartItems[currentId].q,
        product_size:"",//////////////
        product_color:"",//////////////
        whatsApp:"",
        product_id:currentId,
        order_type:"",
        total:0,
        username:"",
        productname:"",
    }) 

    const imageHandler = (e)=>{
        setImage(e.target.files[0]);
    }

    const changeHandler = (e)=>{
        setNewFormData({...newFormData,[e.target.name]:e.target.value});
        
    }

    const checkWhatsAppReq = (e) =>{
        setField1(e.target.value);
        changeHandler(e);
    }

    const [imgReq, setImgReq] = useState(null);
    const checkImgReq = (event) => {
        setImgReq(event.target.value);
        setField2(event.target.value);
        
        changeHandler(event);
        
    }

    const Add_Order = async () => {
        console.log(newFormData);
        let responceData;
        let order = newFormData;

        let formData = new FormData();
        formData.append('order', image);

        all_product.forEach((product)=>{
            if(currentId === product.id){
                order.total=cartItems[currentId].q*product.new_price;
                order.productname=product.name;
            }
        })
        all_user.forEach((user) => {
            if (userEmail === user.email) {
                order.username=user.name;
            }
        })

        if(imgReq ==='Pre-order')

        {
            await fetch('http://localhost:4000/slipupload',{
            method:'POST',
            headers:{
                Accept:'application/json',
            },
            body:formData,
            }).then((resp) => resp.json()).then((data) =>{responceData=data});
            

            if(responceData.success)
            {   
                
                // all_product.map((product)=>{
                //     if(currentId === product.id){
                //         order.total=cartItems[currentId].q*product.new_price;
                //         order.productname=product.name;
                //     }
                // })
                // all_user.map((user) => {
                //     if (userEmail === user.email) {
                //         order.username=user.name;
                //     }
                // })

                order.slip_image = responceData.image_url;
                order.uder_id = userEmail;
                order.product_size = cartItems[currentId].size;///////////
                order.product_color = cartItems[currentId].color;///////////
                console.log(order);
                await fetch('http://localhost:4000/orderconfirmation',{
                    method:'POST',
                    headers:{
                        Accept:'application/json',
                        'Content-Type':'application/json',
                    },
                    body:JSON.stringify(order),
                }).then((resp) =>resp.json()).then((data)=>{
                    data.success?alert("Your Response Added Successfully. Thank You!"):alert("Failed");
                    if(data.success)
                    {
                        removeAllFromCart(currentId);
                        window.location.replace("/cart");
                    }
                })
            }
        }else{
            order.slip_image = 'This is post-order';
                order.uder_id = userEmail;
                order.product_size = cartItems[currentId].size;///////////
                order.product_color = cartItems[currentId].color;///////////
                console.log(order);
                await fetch('http://localhost:4000/orderconfirmation',{
                    method:'POST',
                    headers:{
                        Accept:'application/json',
                        'Content-Type':'application/json',
                    },
                    body:JSON.stringify(order),
                }).then((resp) =>resp.json()).then((data)=>{
                    data.success?alert("Your Response Added Successfully. Thank You!"):alert("Failed");
                    if(data.success)
                    {
                        removeAllFromCart(currentId);
                        window.location.replace("/cart");
                    }
                })
        }
    }

        const [field1, setField1] = useState('');
        const [field2, setField2] = useState('');
        const [field3, setField3] = useState('');
      
        const handleSubmit = (event) => {
          event.preventDefault();
          if (!field1 || !field2) {
            alert('Please fill all required fields');
            return;
          }
          if(!field3){
            return;
          }
          // Continue with form submission
          Add_Order();
        };


        const alertUser = useCallback((e) => {
            if (!field1 || !field2 || !field3) {
                e.preventDefault();
                e.returnValue = '';
            }
        }, [field1, field2, field3]);
        
        useEffect(() => {
            window.addEventListener('beforeunload', alertUser);
            return () => {
              window.removeEventListener('beforeunload', alertUser);
            };
        }, [alertUser]);

    

    
  return (
    <div className='maindiv'>
    <div className="orderconfirmation">
        
        <div className='orderconfirmation-first'>
        <h3>User Information</h3>
        <div>------------------------------------------------------------------------</div>
        {all_user.map((user) => {
            if (userEmail === user.email) {
                return (
                    <React.Fragment key={user.email}>
                        <div className="orderconfirmation-first-item" >
                            <p>Name: </p>
                            <div className="orderconfirmation-first-item-name" >
                                <p>{ user.name}</p>
                            </div>
                        </div>
                        <hr/>
                        <div className="orderconfirmation-first-item" >
                            <p>Email: </p>
                            <div className="orderconfirmation-first-item-mail" >
                                <p>{ user.email}</p>
                            </div>
                        </div>
                        <hr/>

                        <div className="orderconfirmation-first-item" >
                            <p>Total: </p>
                            <div className="orderconfirmation-first-item-total" >
                            {all_product.map((product)=>{
                                if(currentId === product.id){
                                    return(
                                        <p>{ cartItems[currentId].q*product.new_price}</p>
                                    );
                                }
                                else{
                                    return null;
                                }
                            })}
                            </div>
                        </div>
                        <hr/>
                    </React.Fragment>
                );
            } else {
                return null;
            }
        })}    
        </div>
        <div className="orderconfirmation-sizes">
        <h3>Order Details</h3>
        <div>---------------</div>
            <p>Purchase Sizes:</p>
            <ul>
                {cartItems[currentId] && cartItems[currentId]?.size.map((sizeItem, index) => {
                    if(sizeItem){
                        return(
                            <>
                            <div>
                            <li key={index}>{sizeItem}</li>
                            </div>
                            <div>
                            <img className='cartitems-remove-icon' src={remove_icon} onClick={()=>{removeFromCartById(currentId, index)}} alt=''/>
                            </div>
                            </>
                        )
                    }
                    else{
                        return null;
                    }
                })}
            </ul>

            <p>Purchase Colors:</p>
            <ul>
                {cartItems[currentId] && cartItems[currentId]?.color.map((colorItem, index) => {
                    if(colorItem){
                        return(
                            <>
                            <div>
                            <li key={index}>{colorItem}</li>
                            </div>
                            </>
                        )
                    }
                    else{
                        return null;
                    }
                })}
            </ul>
        </div>
    </div>
        
        <form onSubmit={handleSubmit}>
        <div className="orderconfirmation-itemfield">
            <p>Enter Your WhatsApp Number : </p>
            <input required value={newFormData.whatsApp} onChange={checkWhatsAppReq} type='text' name='whatsApp' placeholder='Type here'/>
        </div>

        <div className="orderconfirmation-itemfield-btn">
        <h3>Payment Details</h3>
        <div>--------------------------------------------------------------------</div>
            {/* <lable for="payment">payment:</lable>
            <select id="payment" >
                <option onChange={changeHandler} value='Pre-order' name='order_type'>Pre-order</option>
                <option onChange={changeHandler} value='Post-order' name='order_type'>Post-order</option>
                
            </select> */}
            <p>Select Payment Method : </p>
            <button onClick={toggleModal} name='order_type' value='Pre-order'>Pre-order</button>
                <button onClick={checkImgReq} name='order_type' value='Post-order'>Post-order</button>
            {/* <p>Select Payment Method : </p>
            <button onClick={changeHandler} name='order_type' value='Pre-order'>Pre-order</button>
            <button onClick={changeHandler} name='order_type' value='Post-order'>Post-order</button> */}
        </div>

        {modal && (
        <div className="orderconfirmation-second">
            <div className="orderconfirmation-itemfield">
                <label htmlFor='file-input'>
                    <img src={image?URL.createObjectURL(image):upload_area} className='orderconfirmation-thumnail-img' alt="" />
                </label>
                <input onChange={imageHandler} type="file" name='slip_image' id='file-input' hidden/>
            </div>
            

        </div>
        )}
        <button type="submit"  className='add-order-btn' onClick={setField3}>Confirm</button>
        </form>

    {/* </div> */}
    </div>
  )
}

export default OrderConfermation