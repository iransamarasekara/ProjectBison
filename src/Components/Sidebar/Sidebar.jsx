import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import profile_icon from '../Assets/profile_icon.png'
import notification_icon from '../Assets/notification_icon.png'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to={'/userprofile'} style={{textDecoration:"none"}}>
        <div className="sidebar-item">
            <img src={profile_icon} alt=''/>
            <p>View Profile</p>
        </div>
      </Link>
      <Link to={'/notification'} style={{textDecoration:"none"}}>
        <div className="sidebar-item">
            <img src={notification_icon} alt=''/>
            <p>Notifications</p>
        </div>
      </Link>
    </div>  
  )
}

export default Sidebar
