import React from 'react'
import '../pageStyles/Home.css'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'


function Home() {
  return (
    <>
    <Navbar/>
    <div className="home-container">
      <h2 className="home-heading">Trending Now</h2>
    </div>
    <Footer/>
    </>
  )
}

export default Home