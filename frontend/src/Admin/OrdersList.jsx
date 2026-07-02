import React, { useEffect, useState } from 'react'
import '../AdminStyles/OrdersList.css'
import PageTitle from '../components/PageTitle.jsx'
import {Link,useNavigate} from 'react-router-dom'
import { Delete, Edit } from '@mui/icons-material'
import { useDispatch, useSelector} from 'react-redux'
import { fetchAllOrders, removeErrors,deleteOrder,removeDeleteSuccess } from '../features/admin/adminSlice.js'
import Loader from '../components/Loader.jsx'
import { toast } from 'react-toastify'

function OrdersList() {
    const {orders, loading, error, deleteSuccess,  deleteLoading}= useSelector(state => state.admin);
    const [deleteId, setDeleteId] = useState(null);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchAllOrders());
    },[dispatch])

    useEffect(() => {
        if(error){
            toast.error(error,{
                position:'top-center',
                autoClose:3000
            });
            setDeleteId(null); 
            dispatch(removeErrors());
        }
    }, [dispatch, error]);

    useEffect(() => {
        if(deleteSuccess){
            toast.success("Order Deleted Successfully",{
                position:'top-center',
                autoClose:3000
            });
            setDeleteId(null);
            dispatch(removeDeleteSuccess());
        }
    }, [deleteSuccess, dispatch]);

    const deleteOrderHandler = () => {
        if(deleteId){
            dispatch(deleteOrder(deleteId));
        }
    };

    if(orders && orders.length === 0){
        return(
            <>
            <div className="no-orders-container">
                <p>No Orders Found</p>
            </div>
            </>
        )
    }
    
  return (

    <>
    <PageTitle title="All Orders"/>

    {loading?(<Loader/>):(<div className="ordersList-container">
        <h1 className="ordersList-title">All Orders</h1>
        <div className="ordersList-table-container">
            <table className="ordersList-table">
                <thead>
                <tr>
                    <th>S No.</th>
                    <th>Order ID</th>
                    <th>Status</th>
                    <th>Total Price</th>
                    <th>No. of Items</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {orders && orders.map((order, index)=>(
                    <tr key={order._id}>
                    <td>{index+1}</td>
                    <td>{order._id}</td>
                    <td className={`order-status ${order.orderStatus.toLowerCase()}`}>{order.orderStatus}</td>
                    <td>{`₹ ${order.totalPrice.toFixed(2)}`}</td>
                    <td>{order.orderItems.length}</td>
                    <td>
                        <Link to={`/admin/order/${order._id}`} className='action-icon edit-icon'><Edit/></Link>
                        <button className="action-icon delete-icon" onClick={() => setDeleteId(order._id)}>
                            <Delete/>
                        </button>
                    </td>
                </tr>
                ))}
                </tbody>
            </table>
        </div> 
    </div>
    
    )}

    {deleteId && (<div className="delete-popup-overlay">
                    <div className="delete-popup">
                    { deleteLoading ?
                    <>
                    <h2>Deleting Order...</h2>
                    <p>Please wait while the order is being deleted.</p>
                    <div className="loader"></div>
                    </> :
                    <>
                    <h2>Delete Order?</h2>
                    <p>Are you sure you want to delete this order?</p>
                    <div className="delete-popup-buttons">
                        <button className="cancel-delete" onClick={() => setDeleteId(null)} >
                            Cancel
                        </button>
                        <button className="confirm-delete" onClick={deleteOrderHandler} >
                            Delete
                        </button>
                    </div>
                    </>
                    }
                </div>
            </div> )}
            
    </>
    
  )
}


export default OrdersList