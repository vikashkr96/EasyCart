import React from 'react'

import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';

import '../componentStyles/Footer.css'

function Footer() {

  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Contact Section */}
        <div className="footer-section contact">

          <h3>Contact Us</h3>

          <p>
            <a href="tel:+91-9631412596" className="contact-link">
              <PhoneIcon fontSize="small" />
              Phone: +91-9631412596
            </a>
          </p>

          <p>
            <a href="mailto:easycart.order@gmail.com" className="contact-link">
              <MailIcon fontSize="small" />
              Email: easycart.order@gmail.com
            </a>
          </p>

        </div>

        {/* Social Section */}
        <div className="footer-section social">

          <h3>Follow Me</h3>

          <div className="social-links">

            {/* GitHub */}
            <a
              href="https://github.com/vikashkr96"
              target="_blank"
              rel="noreferrer"
              className="github"
            >
              <GitHubIcon className="social-icon" />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/vikash-kumar-6a4a03321/"
              target="_blank"
              rel="noreferrer"
              className="linkedin"
            >
              <LinkedInIcon className="social-icon" />
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/@CodeYourCareer_01"
              target="_blank"
              rel="noreferrer"
              className="youtube"
            >
              <YouTubeIcon className="social-icon" />
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/its_crazzy_vikash/"
              target="_blank"
              rel="noreferrer"
              className="instagram"
            >
              <InstagramIcon className="social-icon" />
            </a>

          </div>

        </div>

        {/* About Section */}
        <div className="footer-section about">

          <h3>About Us</h3>

          <p>
            Welcome to our e-commerce store! We are dedicated to providing the best products and customer service.
          </p>

        </div>

      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} EasyCart. All rights reserved.
        </p>
      </div>

    </footer>
  )
}

export default Footer