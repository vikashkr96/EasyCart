import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { removeError, updateCartQuantity, removeCartItem } from '../features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

function CartItem({item}) {
    const {loading,cartItems} = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const [quantity, setQuantity] = useState(item.quantity);
    const [showConfirm, setShowConfirm] = useState(false);
    


    const increaseQuantity = ()=>{
    if(quantity >= item.stock){
        toast.error(
          "Can't exceed available stock",
          {
            position:"top-center",
            autoClose:3000
          }
        );

        return;
    }

    setQuantity(q=>q+1);
}
    const decreaseQuantity = ()=>{
            if( quantity <= 1){
                toast.error("Quantity Can't be less than 1",
                    {position:'top-center',autoClose:3000}
                );
                dispatch(removeError());
                return;
            }
            setQuantity(qty => qty-1);
    }

    const handleUpdate = ()=>{

    if(quantity !== item.quantity){

        dispatch(
            updateCartQuantity({
                id:item.product,
                quantity
            })
        );

        toast.success("Your Cart is updated" ,{
            position:"top-center",
            autoClose:3000
          });
    }

    }

    const handleRemove = ()=>{

        dispatch(removeCartItem(item.product));

        toast.success(`${item.name} removed from cart`,{
            position:"top-center",
            autoClose:3000
        });

        setShowConfirm(false);
    }

  return (
    <div className="cart-item">
                    <div className="item-info">
                        <img src={item.image} alt={item.name} className="item-image" />
                        <div className="item-details">
                            <h3 className="item-name">{item.name}</h3>
                            <p className="item-price">
                              Price: {item.price.toFixed(2)}
                            </p>
                            <p className="item-quantity">
                                Quantity: {quantity}
                            </p>
                        </div>
                    </div>

                    <div className="quantity-controls">
                        <button className="quantity decrease-btn" onClick={decreaseQuantity} disabled={loading}>-</button>
                        <input type="number" value={quantity} className='quantity-input' min={1} readOnly/>
                        <button className="quantity increase-btn" onClick={increaseQuantity} disabled={loading}>+</button>
                    </div>

                    <div className="item-total">
                        <span className="item-total-price">
                            {(quantity * item.price).toFixed(2)}
                        </span> 
                    </div>

                    <div className="item-actions">
                        <button className="update-item-btn" onClick={handleUpdate} disabled={loading || quantity === item.quantity}>Update</button>
                        <button
                            className="remove-item-btn"
                            onClick={()=>setShowConfirm(true)}
                        >
                            Remove
                        </button>         
                    </div>


                {showConfirm && (
                    <div className="confirm-overlay">

                        <div className="confirm-box">

                            <h3>Remove Item?</h3>

                            <p>
                                Are you sure you want to remove 
                                <b> {item.name}</b> from cart?
                            </p>


                            <div className="confirm-buttons">

                                <button
                                    className="cancel-btn"
                                    onClick={()=>setShowConfirm(false)}
                                >
                                    Cancel
                                </button>


                                <button
                                    className="confirm-remove-btn"
                                    onClick={handleRemove}
                                >
                                    Remove
                                </button>

                            </div>

                        </div>

                    </div>
                )}


                </div>
  )
}

export default CartItem