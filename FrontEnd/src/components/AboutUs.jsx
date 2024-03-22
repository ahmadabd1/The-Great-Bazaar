import React, { useEffect } from "react";
import { useLocation } from 'react-router-dom';

import "./style/AboutUs.css"; // Import CSS file for styling
const AboutUs = () => {
   const location = useLocation(); // Hook from react-router-dom

  useEffect(() => {
    if (location.hash) {
      let elem = document.getElementById(location.hash.slice(1));
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top if no hash
    }
  }, [location]);
  return (
      <div className="about-us-container">
      <div className="about-us-content">
        <h2>About Us</h2>
        <p>Welcome to The Great Bazaar - your one-stop destination for all your shopping needs! Whether you're looking for trendy clothes, delicious food, cutting-edge electronics, or more, we've got you covered.</p>
        <p>At The Great Bazaar, we are committed to providing the best shopping experience possible. Our team works tirelessly to curate a diverse selection of high-quality products, ensuring that you find exactly what you're looking for.</p>
        <p>With a focus on customer satisfaction, we strive to exceed your expectations at every turn. From our seamless online shopping platform to our responsive customer support, we're here to make your shopping experience enjoyable and hassle-free.</p>
        <p>Thank you for choosing The Great Bazaar. We look forward to serving you and providing you with an exceptional shopping experience!</p>
        <h3>Contact Us</h3>
        <p>We're always eager to hear from you! If you have any questions, comments, or feedback, please don't hesitate to reach out to us. Here's how you can connect with us:</p>
        <div className="contact-info">
          <p>Email: GreatBazzar@gmail.com</p>
          <p>Phone: 052-627-8585</p>
          <p>Address: 1234 Street, City, Country</p>
        </div>
      </div>

      <div id="legal-section" className="legal-section">
        <h2>Legal Information</h2>
        <h3>Terms of Use</h3>
        <p>These Terms govern your access to and use of The Great Bazaar's services, including our website, mobile applications, and e-commerce platform. By accessing or using our services, you agree to be bound by these Terms, which include limitations on our liability and obligations related to the use of our service. You are responsible for your conduct on the platform and compliance with all applicable laws. Content on our platform should not be copied, reproduced, or used in violation of intellectual property rights or other laws.</p>
        <h3>Privacy Policy</h3>
        <p>Your privacy is paramount at The Great Bazaar. This policy provides details on the information we collect, including personal and payment details, how we use it to enhance your shopping experience, and the measures we take to protect your information. We do not share your personal details with third parties without your consent, except as necessary to provide our services or comply with the law.</p>
        <h3>Cookie Policy</h3>
        <p>Our website uses cookies to enhance your user experience, allowing us to remember your preferences and provide personalized service. We detail the types of cookies used and their purposes. You have the option to manage cookie preferences through your browser settings.</p>
        <h3>Disclaimer</h3>
        <p>The Great Bazaar provides its services on an "as is" basis and does not guarantee the accuracy, completeness, or timeliness of information available on our platform. We are not liable for any inaccuracies or the availability of products and services.</p>
        <h3>Intellectual Property Rights</h3>
        <p>All content on The Great Bazaar, including text, graphics, logos, and software, is the property of The Great Bazaar or its content suppliers and protected by intellectual property laws. Unauthorized use or reproduction of any content is strictly prohibited.</p>
                <div className="contact-info">

        <h3>Contact Information</h3>
        <p>For any legal inquiries or concerns regarding The Great Bazaar's services, please contact us at: <br />Email: GreatBazzar@gmail.com<br />Phone: 052-627-8585<br />Address: 1234 Legal Street, City, Country</p>
        </div>
      </div>
    </div>
  );
};
export default AboutUs;