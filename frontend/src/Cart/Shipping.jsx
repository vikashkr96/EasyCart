import React, { useState } from 'react'
import '../CartStyles/Shipping.css'
import PageTitle from '../components/PageTitle'
import CheckoutPath from './CheckoutPath'
import {useDispatch, useSelector} from 'react-redux'
import { Country, State, City }  from 'country-state-city';
import {toast} from 'react-toastify';
import {saveShippingInfo} from '../features/cart/cartSlice.js'
import {useNavigate} from 'react-router-dom'


function Shipping() {
    const {shippingInfo} = useSelector(state => state.cart);
    console.log(shippingInfo);
    
    const dispatch = useDispatch();
    const [address, setAddress] = useState(shippingInfo.address || "");
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode || "");
    const [phoneNumber, setPhoneNumber] = useState(shippingInfo.phoneNumber || "");
    const [country, setCountry] = useState(shippingInfo.country || "");
    const [state, setState] = useState(shippingInfo.state || "");
    const [city, setCity] = useState(shippingInfo.city || "");

    const navigate = useNavigate();

    const shippingInfoSubmit = (e)=>{
        e.preventDefault();

        if(
            !address.trim() ||
            !pinCode ||
            !phoneNumber ||
            !country ||
            !state ||
            !city
        ){
            toast.error("Please fill all the given fields to continue", {
                position:"top-center",
                autoClose:3000
            });
            return;
        }


        if(pinCode.length !== 6){
            toast.error("Please enter a valid pincode", {
                position:"top-center",
                autoClose:3000
            });
            return;
        }


        if(phoneNumber.length !== 10){
            toast.error("Please enter a valid phone number", {
                position:"top-center",
                autoClose:3000
            });
            return;
        }


        dispatch(saveShippingInfo({
            address,
            pinCode,
            phoneNumber,
            country,
            state,
            city
        }));

        navigate('/order/confirm');
    }

  return (
    <>
    <PageTitle title="Shipping Details"/> 
    <CheckoutPath activePath={0} />
    <div className="shipping-form-container">
        <h1 className="shipping-form-header">Shipping Details</h1>
        <form  className="shipping-form" onSubmit={shippingInfoSubmit}>
            <div className="shipping-section">
                <div className="shipping-form-group">
                    <label htmlFor='address'>Address</label>
                    <input type="text" id='address' name='address' placeholder='Enter your address' value={address} onChange={(e)=>setAddress(e.target.value)} />
                </div>

                <div className="shipping-form-group">
                    <label htmlFor='pinCode'>Pincode</label>
                    <input type="number" maxLength="6" inputMode='numeric'  pattern="[0-9]*" pattern="[0-9]*" id='pinCode' name='pinCode' placeholder='Enter your Pincode' value={pinCode} onChange={(e)=>setPinCode(e.target.value)}  />
                </div>

                <div className="shipping-form-group">
                    <label htmlFor='Phone Number'>Phone Number</label>
                    <input type="number" maxLength="10" inputMode="numeric" pattern="[0-9]*" id='phoneNumber' name='pinCode' placeholder='Enter your Pincode' value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}  />
                </div>

            </div>

            <div className="shipping-section">
                <div className="shipping-form-group">
                    <label htmlFor='country'>Country</label>
                    <select value={country} 
                    onChange={(e)=>
                        {
                            setCountry(e.target.value)
                            setState("")
                            setCity("") 
                        }
                    }  name='country' id='country'>
                        <option value="">Select your country</option>
                        {Country && Country.getAllCountries().map((item)=>(
                            <option value={item.isoCode} key={item.isoCode}>{item.name}</option>
                        ))}
                    </select>                  
                </div>

                {country && <div className="shipping-form-group">
                    <label htmlFor='state'>State</label>
                    <select value={state} onChange={(e)=>
                        {
                            setState(e.target.value) 
                            setCity("")
                        }
                    }  
                        name='state' id='state'>
                        <option value="">Select your state</option>
                        {State &&  State.getStatesOfCountry(country).map((item)=>(
                            <option value={item.isoCode} key={item.isoCode}>{item.name}</option>
                        ))}
                    </select>                  
                </div>}

                {state && <div className="shipping-form-group">
                    <label htmlFor='city'>City</label>
                    <select value={city} onChange={(e)=>setCity(e.target.value)}  name='city' id='city'>
                        <option value="">Select your city</option>
                        {City && City.getCitiesOfState(country,state).map((item)=>(
                            <option value={item.name} key={item.name}>{item.name}</option>
                        ))}
                    </select>                  
                </div> }
            </div>

            <button type='submit' className='shipping-submit-btn'>Continue</button>
        </form>
    </div>

    </>
  )
}

export default Shipping