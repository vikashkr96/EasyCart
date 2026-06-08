import React from 'react'
import '../pageStyles/Home.css'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import ImageSlider from '../components/ImageSlider.jsx'
import Product from '../components/Product.jsx'

const products= [
        {
            "_id": "6a1827bfa56950f758797284",
            "name": "product1",
            "description": "This is product 1",
            "price": 1000,
            "rating": 4,
            "images": [
                {
                    "public_id": "sample_id_1",
                    "url": "https://example.com/image1.jpg",
                    "_id": "6a1827bfa56950f758797285"
                }
            ],
            "category": "Clothes",
            "stock": 7,
            "numOfReviews": 3,
            "user": "6a102ed28cba3fa220625bc9",
            "reviews": [],
            "createdAt": "2026-05-28T11:32:15.437Z",
            "__v": 0
        },
        {
            "_id": "6a1827e5a56950f758797286",
            "name": "product2",
            "description": "This is product 2",
            "price": 2000,
            "rating": 4,
            "images": [
                {
                    "public_id": "sample_id_2",
                    "url": "https://example.com/image2.jpg",
                    "_id": "6a1827e5a56950f758797287"
                }
            ],
            "category": "Clothes",
            "stock": 2200,
            "numOfReviews": 1,
            "user": "6a102ed28cba3fa220625bc9",
            "reviews": [
                {
                    "user": "6a180d91b88aafa8c43ca952",
                    "name": "Siya",
                    "rating": 5,
                    "comment": "best product ever seen!",
                    "_id": "6a1829cee5bf389cc465e6a6"
                }
            ],
            "createdAt": "2026-05-28T11:32:53.197Z",
            "__v": 2
        }
    ]


function Home() {
  return (
    <>
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