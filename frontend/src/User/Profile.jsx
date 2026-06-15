import React, { useEffect } from 'react'
import '../UserStyles/Profile.css'
import {Link, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import PageTitle from '../components/PageTitle'
import Loader from '../components/Loader'

function Profile() {

    const {loading, isAuthenticated, user} = useSelector(state=>state.user)
    console.log(user)
    const navigate = useNavigate();
    
    useEffect(()=>{
        if(isAuthenticated=== false){
            navigate("/login")
        }
    },[isAuthenticated])

    return (
        <>
    {loading?(<Loader/>):(<div className="profile-container">
        <PageTitle title={`${user?.name || "Profile"}'s Profile`}/>

        <div className="profile-image">

            <h1 className="profile-heading">My Profile</h1>

            <img 
              className="profile-img"
              src={user?.avatar?.url || "./images/profile.png"} 
              alt="User Profile"
            />

            <Link to="/profile/update">
                Edit Profile
            </Link>

        </div>


        <div className="profile-details">


            <div className="profile-detail">
                <h2>Username:</h2>
                <p>{user?.name || "Not Available"}</p>
            </div>


            <div className="profile-detail">
                <h2>Email:</h2>
                <p>{user?.email || "Not Available"}</p>
            </div>


            <div className="profile-detail">
                <h2>Joined On:</h2>
                <p>
                  {user?.createdAt 
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "Not Available"}
                </p>
            </div>


        </div>


        <div className="profile-buttons">

            <Link to="/orders/user">
                My Orders
            </Link>

            <Link to="/password/update">
                Change Password
            </Link>

        </div>


    </div>)}
    
</>
  )

}

export default Profile