import React, { useEffect } from 'react'
import '../pageStyles/Products.css'
import PageTitle from '../components/PageTitle'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product';
import { getProduct, removeErrors } from '../features/products/productSlice';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import NoProducts from '../components/NoProducts';

function Products() {
    const { loading, error, products } = useSelector(
    (state) => state.product
);
    const dispatch = useDispatch();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const keyword = searchParams.get("keyword");
    console.log(keyword); 
    
    
    useEffect(()=>{
            dispatch(getProduct({keyword}));
        },[dispatch,keyword])

    useEffect(()=>{
          if(error){
            toast.error(error.message, {position:'top-center', autoClose: 3000});
            dispatch(removeErrors());
          }
        },[dispatch, error])


  return (
    <>
    {loading ? (<Loader/>) : (<>
    <PageTitle title="All Products"/>
    <div className="products-layout">
        <div className="filter-section">
            <h3 className="filter-heading">CATEGORIES</h3>


        </div>
        <div className="products-section">
            {products.length>0?(<div className="products-product-container">
                {products.map((product)=>(
                    <Product key={product._id} product={product}/>
                ))}
            </div>):(
                <NoProducts keyword={keyword}/>
            )}
        </div>

    </div>
    </>)}
    </>
  )

}

export default Products