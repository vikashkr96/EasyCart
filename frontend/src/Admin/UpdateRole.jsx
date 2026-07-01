import React, { useEffect, useState } from 'react'
import '../AdminStyles/UpdateRole.css'
import '../components/PageTitle.jsx'
import PageTitle from '../components/PageTitle.jsx'
import { useParams,useNavigate} from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { getSingleUser, removeErrors, removeSuccess, updateUserRole } from '../features/admin/adminSlice.js'
import {toast} from 'react-toastify'

function UpdateRole() {
    const {userId} = useParams();
    const {user, success, loading , error} = useSelector(state => state.admin);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name:"",
        email:"",
        role:""
    })

    useEffect(()=>{
        dispatch(getSingleUser(userId));
    },[dispatch,userId])
     
    const {name, email, role} = formData;

    useEffect(()=>{
        if(user){
            setFormData({
                name:user.name || "",
                email:user.email || "",
                role:user.role || "",
            })
        }
    },[user])

    const handleChange  = (e)=>{
        setFormData({...formData,role:e.target.value})
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(updateUserRole({userId,role}))
    }

    useEffect(()=>{
        if(success){
            toast.success("User Role Updated Successfully", {position:'top-center', autoClose: 3000});
            dispatch(removeSuccess());
            navigate('/admin/users');
        }
        if(error){
            toast.error(error,{position:'top-center', autoClose: 3000});
            dispatch(removeErrors());
        }
    },[dispatch, success, error]);

    return (
    <>
    <PageTitle title="Update User Role"/> 
    <div className="page-wrapper">
        <div className="update-user-role-container">
        <h1>Update User Role</h1>
        <form className='update-user-role-form' onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id='name' name='name' value={name} readOnly/>
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id='email' value={email} name='email' readOnly/>
            </div>
            <div className="form-group">
                <label htmlFor="role">Role</label>
                <select 
                    name="role" 
                    id="role" 
                    value={role} 
                    required
                    onChange={handleChange}
                >
                    <option value="">Select Role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            
            <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ?(<> <span className="spinner"></span>Updating...</>) : (
                "Update Role")
                }
            </button>

        </form>
    </div>
    </div>
    </>
  )
}

export default UpdateRole