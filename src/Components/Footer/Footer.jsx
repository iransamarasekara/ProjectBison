import React, { useState } from 'react';
import './Footer.css';
import footer_logo from '../Assets/logo_big.png';
import high_opacity_logo from '../Assets/logo_big1.png';  // Add new logo import
import instagram_icon from '../Assets/instagram_icon.png';
import whatsapp_icon from '../Assets/whatsapp_icon.png';
import facebook_icon from '../Assets/facebook_icon.png';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., send email to server)
    alert(`Email submitted: ${email}`);
    setEmail('');
  };

  return (
    <div className='footer-container'>
      <div className='footer'>
        <div className="footer-card">
          <div className="footer-logo">
            <img src={footer_logo} alt='Shopper' className="low-opacity-logo" /> {/* Updated class name */}
            <img src={high_opacity_logo} alt='Shopper' className="high-opacity-logo" /> {/* Add new logo */}
          </div>
        </div>
        
        <div className="footer-card">
          <ul className='footer-links'>
            <h3>Quick Links</h3>
            <li><a href="#">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">My Account</a></li>
          </ul>
        </div>

        <div className="footer-card">
          <h3>Sign up for Moramerch Newsletter</h3>
          <form onSubmit={handleFormSubmit} className="newsletter-form">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              required
              className="newsletter-input"
            />
            <button type="submit" className="signup-button">Submit</button>
          </form>
          <div className="footer-social-icons">
            <a href="#"><img src={facebook_icon} alt='Facebook' /></a>
            <a href="#"><img src={instagram_icon} alt='Instagram' /></a>
            <a href="#"><img src={whatsapp_icon} alt='WhatsApp' /></a>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <p>Copyright @ 2024 MoraMerch - All Right Reserved</p>
        <p>Concept, Design, Development & Powered by BISON Corps.</p>
      </div>
    </div>
  );
}

export default Footer;
