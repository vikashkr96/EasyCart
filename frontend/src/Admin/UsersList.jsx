import React, { useEffect, useState } from 'react'
import '../AdminStyles/UsersList.css'
import PageTitle from '../components/PageTitle.jsx'
import { Link } from 'react-router-dom'
import Edit from '@mui/icons-material/Edit'
import Delete from '@mui/icons-material/Delete'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers, deleteUser, removeErrors, removeSuccess, removeDeleteSuccess } from '../features/admin/adminSlice.js'
import { toast } from 'react-toastify'
import Loader from '../components/Loader.jsx'

function UsersList() {

    const dispatch = useDispatch();

    const { users, loading, deleteLoading, deleteSuccess,  error, success } = useSelector(
        (state) => state.admin
    );

    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);


    useEffect(()=>{
        dispatch(fetchUsers());
    },[dispatch]);


    const handleDelete = (id) => {
        setSelectedUserId(id);
        setShowDeletePopup(true);
    }

    const confirmDelete = () => {
        dispatch(deleteUser(selectedUserId));
    }

    useEffect(()=>{
        if(deleteSuccess){
            toast.success("User deleted successfully",{position:"top-center",autoClose:3000});
            setShowDeletePopup(false);
            setSelectedUserId(null);
            dispatch(removeDeleteSuccess());
        }
        if(error){
            toast.error(error, {position:"top-center",autoClose:3000});
            setShowDeletePopup(false);
            dispatch(removeErrors());
        }
    },[deleteSuccess,error,dispatch])

    return (
        <>
            <PageTitle title="All Users"/>

            <div className="usersList-container">
            <h1 className="usersList-title"> All Users</h1>
            {loading ? (<Loader/>) : (

                <div className="usersList-table-container">
                        <table className="usersList-table">
                            <thead>
                                <tr>
                                    <th>S No.</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Registered On</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {users && users.length > 0 ?(users.map((user,index)=>(
                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>{(() => {
                                        const d = new Date(user.createdAt);
                                            return `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()} , ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
                                            })()}
                                    </td>

                                    <td>
                                    <Link to={`/admin/user/${user._id}`} className="action-icon edit-icon" >
                                        <Edit/>
                                    </Link>
                                    <button className="action-icon delete-icon" onClick={()=>handleDelete(user._id)}><Delete/>
                                    </button>
                                    </td>

                                    </tr>))) : (
                                    <tr>
                                        <td colSpan="6"style={{textAlign:"center"}}>No Users Found </td>
                                    </tr>
                                    )
                            }
                            </tbody>
                        </table>
                    </div>)}
                    </div>


                {/* popup */}

                {showDeletePopup && (
                    <div className="delete-popup-overlay">
                        <div className="delete-popup">
                            {
                                deleteLoading ? (
                                <>
                                    <div className="spinner"></div>
                                    <h3>Please wait while deleting...</h3>
                                </>) : (
                                <>
                                    <h3>Are you sure you want to delete this user?</h3>
                                    <div className="popup-buttons">
                                    <button className="confirm-btn" onClick={confirmDelete}>Yes, Delete</button>
                                    <button className="cancel-btn"onClick={()=>setShowDeletePopup(false)} >Cancel</button>
                                    </div>
                                </>)}
                        </div>
                    </div>)}
                </>)}
export default UsersList