import React, { useState, useEffect, useContext } from 'react';
import './Notification.css';
import { ShopContext } from '../../Context/ShopContext';

const Notification = () => {
    const [userEmail, setUserEmail] = useState(null);
    const { all_product } = useContext(ShopContext);
    const [orders, setOrders] = useState([]);
    const [hasNewMessage, setHasNewMessage] = useState(false); // State to track new message

    useEffect(() => {
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/getuser', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: '',
            })
                .then((response) => response.json())
                .then((data) => setUserEmail(data));
        }
    }, []);

    useEffect(() => {
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/getordersofuser', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "uder_id": userEmail }),
            })
                .then((response) => response.json())
                .then((data) => {
                    setOrders(data);
                    setHasNewMessage(true); // Set new message state when orders are fetched
                });
        }
    }, [userEmail]);

    // Function to handle message click (mark as read)
    const handleMessageClick = () => {
        setHasNewMessage(false); // Mark message as read
    };

// Inside the Notification component
return (
    <div>
        <h2 className="notification-header">Messages</h2>
        <div className="notification-container">
            {orders.map((item, i) => {
                const product = all_product.find(product => product.id === item.product_id);
                if(product)
                {const isNewMessage = i === orders.length - 1 && hasNewMessage; // Check if this is the latest message and has not been read

                return (
                    <div key={i} className={`notification-item ${isNewMessage ? 'new-message' : ''}`} onClick={handleMessageClick}>
                        <span role="img" aria-label="Envelope">📩</span> {/* Icon */}
                        {isNewMessage && <span className="latest-tag">Latest</span>} {/* Latest tag */}
                        <p>You have successfully {item.order_type} {item.num_purchase_products} items of {product.name}</p>
                        {!isNewMessage && (
                            <span role="img" aria-label="Mark as Read" className="mark-as-read" onClick={handleMessageClick}>✔️</span> /* Mark as Read icon */
                        )}
                    </div>
                )}else{
                    return null;
                }
            })}
        </div>
    </div>
);


}

export default Notification;




