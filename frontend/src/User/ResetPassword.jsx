import React, { useEffect, useState } from 'react'
import '../UserStyles/Form.css'
import PageTitle from '../components/PageTitle';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetPassword, removeErrors, removeSuccess} from '../features/user/userSlice.js'
import { toast } from 'react-toastify';
import Loader from '../components/Loader.jsx'

function ResetPassword() {
    const {loading, error, success} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { token } = useParams();

    



    const resetPasswordSubmit = (e)=>{
        e.preventDefault();
        const data = {
            password,
            confirmPassword
        }
    dispatch(resetPassword({token,userData:data})) 
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
            toast.success('Password Reset Successful', {
                position: "top-center",
                autoClose: 3000
            });
            dispatch(removeSuccess());
            navigate("/login");
        }
    }, [success, dispatch, navigate]); 




  return (
    <>
    <PageTitle title="Reset Password"/>
    <div className="container update-container">
        <div className="form-content">
            <form className="form"  onSubmit={resetPasswordSubmit}>
                 
                 <h2>Reset Password</h2> 

                    <div className="input-group">
                        <input type="password" name="password" placeholder='Enter your new password' value={password} onChange={(e)=>setPassword(e.target.value)} />
                    </div>

                    <div className="input-group">
                        <input type="password" name="confirmPassword" placeholder='Confirm your new password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
                    </div>


                    <button className="authBtn" type="submit" disabled={loading}>
                        {
                            loading ?
                                (
                                    <>
                                        Resetting Your Password
                                        <span className="loader"></span>
                                    </>
                                )
                                : 
                                "Reset Password" 
                        }
                    </button>

                </form>


            </div>
    </div>
    </>
  )
}

export default ResetPassword