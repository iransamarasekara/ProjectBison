import React from 'react'
import './Hero.css'

import arrow_icon from '../Assets/arrow.png'


const Hero = () => {
  return (
    <div className='hero'>

        <div className='hero-left'>
            <h2>WEAR YOUR SPIRIT</h2>
            <div>
                <div className='hero-hand-icon'>
                    <h3>New University</h3>
                    {/* <img src={hand_icon} alt=''/> */}
                </div>
                <h3>Merchandise</h3>
                <h4>For Everyone</h4>
            </div>
            <a href='#latestCollection' style={{textDecoration:'none',color:'white'}}> 
            <div className="hero-latest-btn">
                <div>Latest Collection</div>
                <img src={arrow_icon} alt=''/>
            </div>
            </a>
        </div>
        <div className='hero-right'>
            {/* <img src={hero_image} alt=''/> */}
        </div>
      
    </div>
  )
}

export default Hero
