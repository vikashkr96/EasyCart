import React, { useEffect, useState } from 'react'
import '../UserStyles/Form.css'
import PageTitle from '../components/PageTitle.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { forgotPassword, removeErrors, removeSuccess} from '../features/user/userSlice.js'
import { toast } from 'react-toastify';
import Loader from '../components/Loader.jsx'

function ForgotPassword() {
    const {loading, error, success, message} = useSelector(state=>state.user);
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [timer, setTimer] = useState(0);
    const [resetStarted, setResetStarted] = useState(false);

    const ForgotPasswordEmail = (e) =>{
        e.preventDefault();

        if(!email){
            return;
        }

        const myForm = new FormData();

        myForm.set('email', email);

        dispatch(forgotPassword(myForm));
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

        if(success){
            toast.success(message,{
                position:"top-center",
                autoClose:3000
            });

            dispatch(removeSuccess());
            setEmail("");
            setResetStarted(true);
            setTimer(60);
            localStorage.setItem(
                "resetEndTime",
                Date.now() + 60000
            );
        }
    }, [success, message, dispatch]);

    // count down effect
    useEffect(()=>{

        if(timer <= 0) return;


        const interval = setInterval(()=>{

            setTimer(prev=>{

                if(prev <= 1){

                    localStorage.removeItem("resetEndTime");

                    return 0;
                }

                return prev-1;

            });
        },1000);
        return ()=>clearInterval(interval);
    },[timer]);


// timer logic
    useEffect(()=>{

        const savedEndTime = localStorage.getItem("resetEndTime");

        if(savedEndTime){

            const remaining = Math.floor(
                (Number(savedEndTime) - Date.now()) / 1000
            );

            if(remaining > 0){
                setTimer(remaining);
                setResetStarted(true);
            }else{
                localStorage.removeItem("resetEndTime");
            }
        }

    },[]);


    const formatTime = (seconds)=>{

        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;

        return `${min}:${sec < 10 ? "0"+sec : sec}`;
    }


  return (
    <>
    <PageTitle title="Forgot Password"/>
    <div className="container forgot-container">
        <div className="form-content email-group">
            <form  className="form" onSubmit={ForgotPasswordEmail}>
            <h2>Forgot Password</h2>
            <div className="input-group">
                <input type="email" placeholder='Enter your registered email' name='email'
                       value={email} onChange={(e)=>setEmail(e.target.value)}
                />
            </div>
                        <button className="authBtn" type="submit" disabled={loading || timer > 0}>
                        {
                            loading ?
                                (
                                    <>
                                        Sending Your Reset Link
                                        <span className="loader"></span>
                                    </>
                                )
                                :
                                "Send"
                        }
            </button>
            
           {
            resetStarted && timer > 0 && (
            <p className="form-links">
                Email not received? Resend after {formatTime(timer)}
            </p>
            )}
            {resetStarted && timer === 0 && (
            <p className="form-links">
                Email not received? You can resend now.
            </p> )}

        </form>
        </div>
    </div>
    </>
  )
}

export default ForgotPassword