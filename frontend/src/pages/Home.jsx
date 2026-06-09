import React, { useEffect } from 'react'
import '../pageStyles/Home.css'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import ImageSlider from '../components/ImageSlider.jsx'
import Product from '../components/Product.jsx'
import PageTitle from '../components/PageTitle.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../features/products/productSlice.js'


function Home() {
    const {loading, error, products, productCount}= useSelector((state)=>state.product);

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getProduct());
    },[dispatch])

  return (
    <>
    <PageTitle title="Home - EasyCart" />
    <Navbar/>
    <ImageSlider/>
    <div className="home-container">
      <h2 className="home-heading">Trending Now</h2>
      <div className="home-product-container">
        {products.map((product,index)=>(
          <Product product={product} key={index}/>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Home