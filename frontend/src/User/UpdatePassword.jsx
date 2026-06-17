import React, { useEffect, useState } from 'react'
import '../UserStyles/Form.css'
import PageTitle from '../components/PageTitle'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updatePassword, removeErrors, removeSuccess} from '../features/user/userSlice.js'
import { toast } from 'react-toastify';
import Loader from '../components/Loader.jsx'


function UpdatePassword() {

    const {loading, error, success} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updatedPasswordSubmit = (e)=>{
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("oldPassword",oldPassword);
        myForm.set("newPassword",newPassword);
        myForm.set("confirmPassword",confirmPassword);

        dispatch(updatePassword(myForm));
    }

    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: "top-center",
                autoClose: 3000
            });
            dispatch(removeErrors());
        }
    }, [error, dispatch]);

    useEffect(() => {
        if (success) {
            toast.success('Password Updated Successfully', {
                position: "top-center",
                autoClose: 3000
            });
            dispatch(removeSuccess());
            navigate("/profile");
        }
    }, [success, dispatch, navigate]); 
  return (
    <>
    <PageTitle title="Password Update"/>
    <div className="container update-container">
        <div className="form-content">
            <form className="form"  onSubmit={updatedPasswordSubmit}>
                 
                 <h2>Update Password</h2> 

                    <div className="input-group">
                        <input type="password" name="oldPassword" placeholder='Enter your old password' value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} />
                    </div>

                    <div className="input-group">
                        <input type="password" name="newPassword" placeholder='Enter your new password' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} />
                    </div>

                    <div className="input-group">
                        <input type="password" name="confirmPassword" placeholder='Confirm your new password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
                    </div>

                    <button className="authBtn" type="submit" disabled={loading}>
                        {
                            loading ?
                                (
                                    <>
                                        Updating Password
                                        <span className="loader"></span>
                                    </>
                                )
                                : 
                                "Update Password" 
                        }
                    </button>

                </form>


            </div>
    </div>
    </>)
}
export default UpdatePassword