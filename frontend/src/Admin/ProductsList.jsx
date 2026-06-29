import React, { useEffect } from 'react'
import '../AdminStyles/ProductsList.css'
import PageTitle from '../components/PageTitle.jsx'
import {Link} from 'react-router-dom'
import {Delete, Edit} from '@mui/icons-material'
import {useDispatch, useSelector} from 'react-redux'
import { fetchAdminProducts, removeErrors } from '../features/admin/adminSlice.js'
import {toast} from 'react-toastify'
import Loader from '../components/Loader.jsx'

function ProductsList() {
  const {products, loading, error} = useSelector(state=>state.admin);
  console.log(products);

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchAdminProducts());
  },[dispatch])

  useEffect(()=>{
    if(error){
      toast.error(error || "An error Occurred !",{position:'top-center', autoClose: 3000})
      dispatch(removeErrors());
    }
  },[error, dispatch])

  if(!products || products.length === 0){
    return(
      <>
      <div className="product-list-container">
        <h1 className="product-list-title">All Products</h1>
        <p className="no-admin-products">No Products Found !</p>
      </div>
      </>
    )
  }
  
  return (
    <>
    <PageTitle title="All Products"/>
    {loading?(<Loader/>):(<>
    <div className="product-list-container">
      <h1 className="product-list-title">All Products</h1>
      <table className="product-table">
        <thead>
          <tr>
            <th>S No.</th>
            <th>Product Image</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Ratings</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product,index)=>(
            <tr key={product._id}>
            <td>{index+1}</td>
            <td><img className='admin-product-image' src={product.images[0].url.replace('./', '/')} alt={product.name} /></td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.rating.toFixed(1)}</td>
            <td>{product.category}</td>
            <td>{product.stock}</td>
            <td>{new Date(product.createdAt).toLocaleString() || "Not Available"}</td>
            <td>
              <Link className="action-icon edit-icon" to={`admin/product/${product._id}`}><Edit/></Link>
              <Link className="action-icon delete-icon" to={`admin/product/${product._id}`}><Delete/></Link>
            </td> 
          </tr>
          ))} 
        </tbody> 
      </table> 
      <br /><br />
      <center><p className='end'>End of Results..</p></center>
    </div> 
    
    </>) }
    </>
  ) 
  
} 

export default ProductsList