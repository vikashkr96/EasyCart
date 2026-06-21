import React from 'react'
import '../CartStyles/Shipping.css'
import PageTitle from '../components/PageTitle'

function Shipping() {
  return (
    <>
    <PageTitle title="Shipping Details"/> 

    <div className="shipping-form-container">
        <h1 className="shipping-form-header">Shipping Details</h1>
        <form  className="shipping-form">
            <div className="shipping-section">
                <div className="shipping-form-group">
                    <label htmlFor='address'>Address</label>
                    <input type="text" id='address' name='address' placeholder='Enter your address' />
                </div>

                <div className="shipping-form-group">
                    <label htmlFor='pinCode'>Pincode</label>
                    <input type="number" maxLength="6" inputMode='numeric'  pattern="[0-9]*" pattern="[0-9]*" id='pinCode' name='pinCode' placeholder='Enter your Pincode' />
                </div>

                <div className="shipping-form-group">
                    <label htmlFor='Phone Number'>Phone Number</label>
                    <input type="number" maxLength="10" inputMode="numeric" pattern="[0-9]*" id='phoneNumber' name='pinCode' placeholder='Enter your Pincode' />
                </div>

            </div>

            <div className="shipping-section">
                <div className="shipping-form-group">
                    <label htmlFor='country'>Country</label>
                    <select name='country' id='country'>
                        <option value="">Select your country</option>
                        <option value="IN">India</option>
                        <option value="US">United States</option>
                    </select>                  
                </div>

                <div className="shipping-form-group">
                    <label htmlFor='state'>State</label>
                    <select name='state' id='state'>
                        <option value="">Select your state</option>
                    </select>                  
                </div>

                <div className="shipping-form-group">
                    <label htmlFor='city'>City</label>
                    <select name='city' id='city'>
                        <option value="">Select your city</option>
                    </select>                  
                </div> 
            </div>

        </form>
    </div>

    </>
  )
}

export default Shipping