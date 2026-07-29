import React from 'react';
import '../pageStyles/AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>About Us</h1>
        
        <div className="about-section">
          <h2>1. Our Mission</h2>
          <p>
            At EasyCart, we are dedicated to providing the best online shopping experience. Our mission is to offer a wide selection of quality products at competitive prices, all while ensuring a seamless and secure checkout process.
          </p>
        </div>

        <div className="about-section">
          <h2>2. Who We Are</h2>
          <p>
            We are a passionate team of developers and e-commerce enthusiasts who believe in the power of technology to connect people with the products they love. Our platform is built on modern architecture to guarantee reliability and speed.
          </p>
        </div>

        <div className="about-section">
          <h2>3. What We Offer</h2>
          <ul>
            <li>Curated selection of premium products across various categories.</li>
            <li>Secure and fast payment processing integrated with top-tier gateways.</li>
            <li>24/7 dedicated customer support to assist you with any inquiries.</li>
            <li>Fast and reliable shipping directly to your doorstep.</li>
          </ul>
        </div>

        <div className="about-section">
          <h2>4. Our Core Values</h2>
          <p>
            Customer satisfaction is at the heart of everything we do. We strive for excellence, transparency, and innovation. We are constantly improving our platform to adapt to the evolving needs of our users.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
