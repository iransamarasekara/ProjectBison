import { useEffect } from "react";
import { useState } from "react";
import React, { createContext } from 'react';

export const ShopContext = createContext(null);



const getDefaultCart = ()=>{
    let cart = [];
    for(let i =0; i < 300; i++){
        let q = 0;
        let size =[];
        let color =[];
        cart.push({
            q,
            size,
            color,
        })
    }
    return cart;
}
//add
const getDefaultSize = ()=>{
    let sizeList = [];
    for (let i = 0; i < 300; i++) {
        let s =[];
        // for(let j =0; j< 10; j++){
        //     s[j]='';
        // }
        sizeList.push({
            s,
        });
    }
    return sizeList;
}

const getDefaultColor = ()=>{
    let colorList = [];
    for (let i = 0; i < 300; i++) {
        let c = [];
        // for(let j =0; j< 10; j++){
        //     s[j]='';
        // }
        colorList.push({
            c,
        });
    }
    return colorList;
}
//end


const ShopContextProvider = (props) => {
    const [all_product,setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [all_advertisement,setAll_Advertisement] = useState([]);
    
    
    //add
    const [size, setSize] = useState(null);
    const [color, setColor] = useState(null);
    useEffect(()=>{
        if(localStorage.getItem('auth-token')){
            setSize(getDefaultSize());
            setColor(getDefaultColor());
        }
        
        
    },[])
    // localStorage.setItem('size', JSON.stringify(size));//1
    //end


    useEffect(() => {
        fetch('http://localhost:4000/alladvertisements').then((response)=>response.json()).then((data)=>setAll_Advertisement(data));
    },[])

    





    useEffect(() => {
        fetch('http://localhost:4000/allproducts').then((response)=>response.json()).then((data)=>setAll_Product(data));
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/getcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:"",
            }).then((response)=>response.json()).then((data)=>setCartItems(data));
        }
    },[])
    

    const addToCart = (itemId, sizeId, colorId)=>{
        // setCartItems((prev)=>({...prev, [itemId]:prev[itemId].q+1}));
        // cartItems[itemId].size.push(sizeId);
        setCartItems((prev) => prev.map((item, index) => {
            if (index === itemId) {
              return { ...item,
                q: item.q + 1,
                size: [...item.size, sizeId],
                color: [...item.color, colorId],
            };
            } else {
              return item;
            }
          }));
        //add
        // if (itemId >= 0 && itemId < size.length) {
            // let retrievedSize = JSON.parse(localStorage.getItem('size'));//2
            size[itemId].s.push(sizeId);
            // color[colorId].c.push(colorId);
            // localStorage.setItem('size', JSON.stringify(retrievedSize));
            
        // } else {
        //     console.error("Invalid itemId");
        // }
        //end
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/addtocart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId, "sizeId":sizeId, "colorId":colorId}),
            }).then((response)=>response.json()).then((data)=>console.log(data));
        }
    }
    
    const removeFromCart = (itemId)=>{
        // setCartItems((prev)=>({...prev, [itemId]:prev[itemId]-1}));
        setCartItems((prev) => prev.map((item, index) => {
            if (index === itemId) {
              return { ...item, q: item.q - 1 };
            } else {
              return item;
            }
          }));
        //add
        size[itemId].s.pop();
        color[itemId].c.pop();
        cartItems[itemId].size.pop();
        cartItems[itemId].color.pop();

        //end
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/removefromcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            }).then((response)=>response.json()).then((data)=>console.log(data));
        }
    }

    //add//////////////
    const removeFromCartById = (itemId,i)=>{
        // setCartItems((prev)=>({...prev, [itemId]:prev[itemId]-1}));
        setCartItems((prev) => prev.map((item, index) => {
            if (index === itemId) {
              return { ...item, q: item.q - 1 };
            } else {
              return item;
            }
          }));
        //add
        // size[itemId].s[i]=null;
        cartItems[itemId].size[i]=null;
        cartItems[itemId].color[i]=null;

        //end
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/removefromcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId, "sizeId":i}),
            }).then((response)=>response.json()).then((data)=>console.log(data));
        }
    }
    //end///////////

    const removeAllFromCart = (itemId)=>{
        // setCartItems((prev)=>({...prev, [itemId]:0}));
        setCartItems((prev) => prev.map((item, index) => {
            if (index === itemId) {
              return { ...item, q: 0 };
            } else {
              return item;
            }
          }));
        //add
        cartItems[itemId].size = [];
        cartItems[itemId].color = [];
        //end
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/removeallfromcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            }).then((response)=>response.json()).then((data)=>console.log(data));
        }
    }

    const getTotalCartAmount = ()=> {
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item].q>0){
                let itemInfo = all_product.find((product)=>product.id===Number(item));
                if(itemInfo){totalAmount += (itemInfo.new_price * cartItems[item].q);}//change here
                
            }
            
        }
        return totalAmount;
    }

    const getTotalCartItems = ()=> {
        let totalItam = 0;
        for(const item in cartItems){
            if(cartItems[item].q>0){
                totalItam+= cartItems[item].q;
            }
        }
        return totalItam;
    }
    const [search, setSearch] = useState(null);
    const getSearchItem = (search) => {
        setSearch(search);
    }

    const contextValue = {getTotalCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart, removeAllFromCart, size,setSize,color, setColor, removeFromCartById, getSearchItem,search, all_advertisement};

    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;