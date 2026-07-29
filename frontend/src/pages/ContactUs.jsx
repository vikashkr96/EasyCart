import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../pageStyles/ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post('/api/v1/contact', formData, config);
      
      toast.success(data.message || "Inquiry submitted successfully!", {
        position: 'top-center',
        autoClose: 3000
      });
      setFormData({ name: '', email: '', message: '' }); // Clear form
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit inquiry.", {
        position: 'top-center',
        autoClose: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-content">
        <h1>Contact Us</h1>
        
        <div className="contact-section">
          <h2>Get In Touch</h2>
          <p>
            If you have any questions, concerns, or feedback, please don't hesitate to contact our support team. We aim to respond to all inquiries within 24 hours.
          </p>
        </div>

        <div className="contact-section">
          <h2>Contact Information</h2>
          <p><strong>Email:</strong> easycart.order@gmail.com</p>
          <p><strong>Phone:</strong> +91-9631412596</p>
          <p><strong>Address:</strong> 123 E-Commerce Blvd, Tech City, 560001</p>
        </div>

        <div className="contact-section">
          <h2>Send Us a Message</h2>
          <form className="contact-form" onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                id="name" 
                placeholder="Enter your full name" 
                value={formData.name}
                onChange={handleInputChange}
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                placeholder="Enter your email address" 
                value={formData.email}
                onChange={handleInputChange}
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea 
                id="message" 
                rows="5" 
                placeholder="How can we help you?" 
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading}
              style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? "Submitting..." : "Submit Inquiry"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
