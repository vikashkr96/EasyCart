import React,{useEffect,useState} from 'react'
import '../AdminStyles/ProductsList.css'
import PageTitle from '../components/PageTitle.jsx'
import {Link,useNavigate} from 'react-router-dom'
import {Delete,Edit} from '@mui/icons-material'
import {useDispatch,useSelector} from 'react-redux'
import {fetchAdminProducts,removeErrors,deleteProduct,removeDeleteSuccess} from '../features/admin/adminSlice.js'
import {toast} from 'react-toastify'
import Loader from '../components/Loader.jsx'


function ProductsList(){

    const {products,loading,error,deleteSuccess,deleteLoading}=useSelector(state=>state.admin)

    const dispatch=useDispatch()
    const navigate=useNavigate()

    const [deleteId,setDeleteId]=useState(null)


    useEffect(()=>{
        dispatch(fetchAdminProducts())
    },[dispatch])


    useEffect(()=>{
        if(error){
            toast.error(error,{
                position:"top-center",
                autoClose:3000
            })
            dispatch(removeErrors())
        }
    },[error,dispatch])


    useEffect(()=>{
        if(deleteSuccess){
            toast.success("Product Deleted Successfully",{
                position:"top-center",
                autoClose:3000
            })

            setDeleteId(null)
            dispatch(removeDeleteSuccess())
            navigate("/admin/products")
        }
    },[deleteSuccess,dispatch,navigate])


    const deleteProductHandler=()=>{
        if(deleteId){
            dispatch(deleteProduct(deleteId))
        }
    }


    if(loading){
        return <Loader/>
    }


    return(
        <>
        <PageTitle title="All Products"/>

        <div className="product-list-container">

            <h1 className="product-list-title">
                All Products
            </h1>


            {
                !products || products.length===0 ?

                <p className="no-admin-products">
                    No Products Found !
                </p>

                :

                <>

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

                    {
                        products.map((product,index)=>(

                            <tr key={product._id}>

                                <td>{index+1}</td>

                                <td>
                                    <img
                                        className="admin-product-image"
                                        src={product.images?.[0]?.url}
                                        alt={product.name}
                                    />
                                </td>

                                <td>{product.name}</td>

                                <td>{product.price}</td>

                                <td>
                                    {
                                        product.rating
                                        ? product.rating.toFixed(1)
                                        :"0.0"
                                    }
                                </td>

                                <td>{product.category}</td>

                                <td>{product.stock}</td>

                                <td>
                                    {new Date(product.createdAt).toLocaleString()}
                                </td>

                                <td>

                                    <Link
                                        className="action-icon edit-icon"
                                        to={`/admin/product/${product._id}`}
                                    >
                                        <Edit/>
                                    </Link>


                                    <button
                                        className="action-icon delete-icon"
                                        onClick={()=>setDeleteId(product._id)}
                                    >
                                        <Delete/>
                                    </button>

                                </td>

                            </tr>

                        ))
                    }

                    </tbody>

                </table>


                <br/><br/>

                <center>
                    <p className="end">
                        End of Results..
                    </p>
                </center>

                </>

            }

        </div>


        {
            deleteId && (

                <div className="delete-popup-overlay">

                    <div className="delete-popup">

                    {
                        deleteLoading ?

                        <>
                            <h2>Deleting Product...</h2>

                            <p>
                                Please wait while product is being deleted
                            </p>

                            <div className="loader"></div>
                        </>

                        :

                        <>

                            <h2>
                                Delete Product?
                            </h2>

                            <p>
                                Are you sure you want to delete this product?
                            </p>


                            <div className="delete-popup-buttons">

                                <button
                                    className="cancel-delete"
                                    onClick={()=>setDeleteId(null)}
                                >
                                    Cancel
                                </button>


                                <button
                                    className="confirm-delete"
                                    onClick={deleteProductHandler}
                                >
                                    Delete
                                </button>

                            </div>

                        </>

                    }

                    </div>

                </div>

            )
        }

        </>
    )
}


export default ProductsList