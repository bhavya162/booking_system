import React from "react";
import "./About.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
  return (
    <>
      <Navbar />

      <div className="about">

        {/* Hero Section */}
        <div className="about-hero">
          <h1>About Our Salon</h1>
          <p>Where Beauty Meets Confidence</p>
        </div>

        {/* Main About Section */}
        <div className="about-main">
          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"
              alt="Salon Interior"
            />
          </div>

          <div className="about-text">
            <h2>Our Mission</h2>
            <p>
              Our aim is to provide exceptional beauty and grooming services
              that enhance your natural elegance. We focus on quality,
              professionalism, and personalized care at every step of your experience.
            </p>
            <p>
              From the moment you book your appointment until you leave our salon,
              we ensure comfort, satisfaction, and confidence.
            </p>
          </div>
        </div>

        {/* Trust Section */}
        <div className="about-section">
          <h2>Built on Trust</h2>
          <p>
            Our success is built on the trust and loyalty of our clients.
            We believe that true beauty services go beyond styling —
            they create lasting relationships.
          </p>
          <p>
            Premium service. Professional staff. Exceptional results.
          </p>
        </div>

        {/* Reviews Section */}
        <div className="about-section reviews">
          <h2>Client Reviews</h2>

          <div className="review-card">
            <p>
              "It is so easy to book any service and even make adjustments.
              The staff is extremely professional and friendly."
            </p>
            <span>— Rekha Sharma</span>
          </div>

          <div className="review-card">
            <p>
              "The best salon experience I’ve had. Clean environment,
              timely service, and amazing results!"
            </p>
            <span>— Priya Mehta</span>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="about-section faq">
          <h2>Frequently Asked Questions</h2>

          <div className="faq-item">
            <h4>Can I check my previous bookings?</h4>
            <p>Yes, you can view your booking history from your profile dashboard.</p>
          </div>

          <div className="faq-item">
            <h4>How will I know if my booking is confirmed?</h4>
            <p>
              You will receive a confirmation message along with a Booking ID
              for future reference.
            </p>
          </div>

          <div className="faq-item">
            <h4>Can I cancel my booking?</h4>
            <p>
              Yes, cancellations are allowed within the specified time period
              mentioned in our cancellation policy.
            </p>
          </div>
        </div>

      </div>

      <Footer />
    </>
  );
}

export default About;