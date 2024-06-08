import React, { useState, useEffect, useContext } from 'react';
import UserProfile from '../Components/UserProfile/UserProfile';
import Notification from '../Components/Notification/Notification';
import { UserContext } from '../Context/UserContext';
import './CSS/Profile.css';
import profile_pic from '../Components/Assets/profile_photo_default.webp'

const Profile = () => {

    const { all_user } = useContext(UserContext);

    const [userEmail, setUserEmail] = useState(null);
    const [currentuser, setCurrentUser] = useState(null);

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
        const user = all_user.find((user) => userEmail === user.email);
        setCurrentUser(user);
    }, [all_user, userEmail]);




    // State to track the active tab
    const [activeTab, setActiveTab] = useState('userprofile');
    // State to track whether there are new messages
    const [hasNewMessages, setHasNewMessages] = useState(false);

    // Function to handle tab change
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        // Reset new message indicator when changing tabs
        if (tab === 'notification') {
            setHasNewMessages(false);
        }
    };

    // Dummy user data (replace with actual user data)
    // const user = {
    //     username: 'John Doe', // Replace with actual username
    //     profilePhoto: 'path/to/profile/photo.jpg' // Replace with actual path to profile photo
    // };

    // Simulated new message arrival (replace with actual logic to detect new messages)
    useEffect(() => {
        // Simulating new message arrival after 3 seconds
        const timeout = setTimeout(() => {
            setHasNewMessages(true);
        }, 1000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="profile-container">
            <div className="sidebar">
                {/* Profile photo and username */}
                <div className="profile-info">
                    {currentuser && currentuser.profile_pic ? (
                        <img src={currentuser.profile_pic} alt="Profile" className="profile-photo" />
                    ) : (
                        <img src={profile_pic} alt="Profile" className="profile-photo" />
                    )}
                    {currentuser && (
                        <p>
                            Hi there!, <strong>{currentuser.name}</strong> <span role="img" aria-label="waving hand">👋</span>
                        </p>
                    )}
                </div>
                <hr/>
                {/* Sidebar content */}
                <ul>
                    <li className={activeTab === 'userprofile' ? 'active' : ''} onClick={() => handleTabChange('userprofile')}>
                        User Account
                    </li>
                    {/* Add red dot indicator for Messages tab if there are new messages */}
                    <li className={activeTab === 'notification' ? 'active with-indicator' : 'with-indicator'} onClick={() => handleTabChange('notification')}>
                        Messages {hasNewMessages && <span className="red-dot"></span>}
                    </li>
                    {/* Add more tabs as needed */}
                </ul>
            </div>
            <div className="content-container">
                {/* Render the active tab content */}
                {activeTab === 'userprofile' ? <UserProfile /> : <Notification />}
            </div>
        </div>
    );
};

export default Profile;

