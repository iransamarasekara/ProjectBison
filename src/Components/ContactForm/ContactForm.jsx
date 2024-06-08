import React, { useEffect } from 'react';
import './ContactForm.css';
import shape from './img/shape.png';
import location from './img/location.png';
import email from './img/email.png';
import phone from './img/phone.png';
import { TiSocialFacebook, TiSocialTwitter, TiSocialInstagram, TiSocialLinkedin } from "react-icons/ti";

function ContactForm() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.botpress.cloud/webchat/v1/inject.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.botpressWebChat.init({
        "composerPlaceholder": "Ask from Moramerch...",
        "botConversationDescription": "This chatbot was built surprisingly fast with Botpress",
        "botId": "f7f049fc-1794-4579-8488-39000f54e2bc",
        "hostUrl": "https://cdn.botpress.cloud/webchat/v1",
        "messagingUrl": "https://messaging.botpress.cloud",
        "clientId": "f7f049fc-1794-4579-8488-39000f54e2bc",
        "webhookId": "0b38bbd6-6648-4d9f-bb22-059e818ee893",
        "lazySocket": true,
        "themeName": "prism",
        "botName": "Moramerch_bot",
        "frontendVersion": "v1",
        "showPoweredBy": true,
        "theme": "prism",
        "themeColor": "#2563eb",
        "allowedOrigins": []
      });

      // Apply custom styles after initialization
      const intervalId = setInterval(() => {
        const widget = document.getElementById('bp-widget');
        if (widget) {
          widget.style.width = '200px';
          widget.style.height = '400px';
          clearInterval(intervalId);
        }
      }, 100);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="container">
      <span className="big-circle"></span>
      <img src={shape} className="square" alt="" />
      <div className="form">
        <div className="contact-info">
          <h3 className="title">Let's get in touch</h3>
          <p className="text">
            Welcome to our Contact Page! We are here to help with any questions, feedback, or inquiries you may have.
          </p>

          <div className="info">
            <div className="information">
              <img src={location} className="icon" alt="" />
              <p>University of Moratuwa, Katubedda.</p>
            </div>
            <div className="information">
              <img src={email} className="icon" alt="" />
              <p>bisoncorpstm@gmail.com</p>
            </div>
            <div className="information">
              <img src={phone} className="icon" alt="" />
              <p>+94-71-9548297</p>
            </div>
          </div>

          <div className="social-media">
            <p>Connect with us :</p>
            <div className="social-icons">
              <a href="#">
                <TiSocialFacebook className="Image" />
              </a>
              <a href="#">
                <TiSocialTwitter className="Image" />
              </a>
              <a href="#">
                <TiSocialInstagram className="Image" />
              </a>
              <a href="#">
                <TiSocialLinkedin className="Image" />
              </a>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <span className="circle one"></span>
          <span className="circle two"></span>

          <form action="index.html" autoComplete="off">
            <h3 className="title">Contact us</h3>
            <div className="input-container focus">
              <input type="text" name="name" className="input" />
              <label htmlFor="name">Name</label>
              <span>Name</span>
            </div>
            <div className="input-container focus">
              <input type="email" name="email" className="input" />
              <label htmlFor="email">Email</label>
              <span>Email</span>
            </div>
            <div className="input-container focus">
              <input type="tel" name="phone" className="input" />
              <label htmlFor="phone">Phone</label>
              <span>Phone</span>
            </div>
            <div className="input-container focus">
              <textarea name="message" className="input"></textarea>
              <label htmlFor="message">Message</label>
              <span>Message</span>
            </div>
            <input type="submit" value="Send" className="btn" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
