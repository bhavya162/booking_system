import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Get in Touch</h3>
          <p>
            We are always here to provide our best service at your convience.
          </p>
        </div>

        <div className="footer-section">
          <h3>Contact Details</h3>
          <ul>
            <li>📞 +91 897XXXXXXX</li>
            <li>📧 bhavya@gmail.com</li>
            <li>📸 Instagram</li>
            <li>🐦 Twitter</li>
            <li>💼 LinkedIn</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Bhavya. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
