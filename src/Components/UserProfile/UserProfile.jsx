import React, { useContext, useState, useEffect } from 'react';
import './UserProfile.css';
import { UserContext } from '../../Context/UserContext';
import Profile_icon from '../Assets/profile_photo_default.webp';

const UserProfile = () => {
    const { all_user } = useContext(UserContext);
    const [userEmail, setUserEmail] = useState(null);
    const [modal, setModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [isCorrect, setIsCorrect] = useState(false);
    const [password, setPassword] = useState(null);
    const [newPassword, setNewPassword] = useState(null);
    const [profile_pic,setProfile_pic] = useState(false);


    const imageHandler = (e)=>{
        setProfile_pic(e.target.files[0]);
    }
    const Add_Dp = async () => {
        
        let responceData;

        let formData = new FormData();
        formData.append('product', profile_pic);
        

        await fetch('http://localhost:4000/upload',{
            method:'POST',
            headers:{
                Accept:'application/json',
            },
            body:formData,
        }).then((resp) => resp.json()).then((data) =>{responceData=data});
        

        if(responceData.success)
        {
            fetch('http://localhost:4000/addprofilephoto',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"profile_pic":responceData.image_url}),
            }).then((response)=>response.json()).then((data)=>console.log(data));
            window.location.replace("/profile");
        }
    }

    // const RemoveProfilePhoto = async ()=>{
    //     fetch('http://localhost:4000/addprofilephoto',{
    //             method:'POST',
    //             headers:{
    //                 Accept:'application/form-data',
    //                 'auth-token':`${localStorage.getItem('auth-token')}`,
    //                 'Content-Type':'application/json',
    //             },
    //             body:JSON.stringify({"profile_pic":''}),
    //         }).then((response)=>response.json()).then((data)=>{console.log(data)});
    // }

    const toggleModal = () => {
        setModal(!modal);
    };

    if(modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

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

    const changeHandler = (e) => {
        setPassword(e.target.value);
    };

    const checkHandler = () => {
        if (password === currentUser.password) {
            setIsCorrect(true);
        } else {
            alert('Wrong password');
        }
    };

    const changePasswordHandler = (e) => {
        setNewPassword(e.target.value);
    };

    const changePassword = () => {
        toggleModal();
        if (localStorage.getItem('auth-token') && newPassword) {
            fetch('http://localhost:4000/changepassword', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "password": newPassword }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        alert('Password changed successfully');
                    }
                });
        }
    };

    // Function to handle click event on modal content and prevent modal from closing


    return (
        <div className="profile">
            <h2 className="userAcc-header">User Account</h2>
            {all_user.map((user) => {
                if (userEmail === user.email) {
                    return (
                        <React.Fragment key={user.email}>
                            <div className='profile-photo'>
                                <label htmlFor='file-input'>
                                    <p>Click to Change</p>
                                    <img src={profile_pic?URL.createObjectURL(profile_pic):user.profile_pic?user.profile_pic:Profile_icon} className='addproduct-thumnail-img' alt="" />
                                </label>
                            <input onChange={imageHandler} type="file" name='profile_pic' id='file-input' hidden/>
                            <button onClick={() => {Add_Dp()}} className='add-product-btn'>Save Changes</button>
                            {/* <button onClick={() => {RemoveProfilePhoto()}} className='add-product-btn'>Remove</button> */}
                            </div>

                            <div className="profile-details">
                                <div className="profile-name">
                                    <p>Name : </p>
                                    <p>{user.name}</p>
                                    <hr/>
                                </div>

                                <div className="profile-name">
                                    <p>Index : </p>
                                    <p>{user.index}</p>
                                    <hr/>
                                </div>

                                <div className="profile-email">
                                    <p>Email : </p>
                                    <p>{user.email}</p>
                                    <hr/>
                                </div>

                                <button onClick={toggleModal} className="btn-modal">
                                    Change Password
                                </button>

                                {modal && (
                                    <div className="modal">
                                        <div onClick={toggleModal} className="overlay"></div>
                                        <div className="modal-content">
                                            {!isCorrect && (
                                                <input onChange={changeHandler} type="password" placeholder="Password" />
                                            )}
                                            {!isCorrect && <button className="check-btn" onClick={checkHandler}>Check</button>}

                                            {isCorrect && (
                                                <input onChange={changePasswordHandler} type="password" placeholder="New Password" />
                                            )}
                                            {isCorrect && (
                                                <button className="close-modal" onClick={changePassword}>Confirm</button>
                                            )}
                                        </div>
                                        
                                    </div>
                                )}
                            </div>
                        </React.Fragment>
                    );
                } else {
                    return null;
                }
            })}
        </div>
    );
};

export default UserProfile;


