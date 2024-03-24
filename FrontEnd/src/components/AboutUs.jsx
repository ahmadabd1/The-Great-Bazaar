import React from "react";
import "./style/AboutUs.css"; // Import CSS file for styling
const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-content">
        <h2>About Us</h2>
        <p>
          Welcome to The Great Bazaar - your one-stop destination for all your
          shopping needs! Whether you're looking for trendy clothes, delicious
          food, cutting-edge electronics, or more, we've got you covered.
        </p>
        <p>
          At The Great Bazaar, we are committed to providing the best shopping
          experience possible. Our team works tirelessly to curate a diverse
          selection of high-quality products, ensuring that you find exactly
          what you're looking for.
        </p>
        <p>
          With a focus on customer satisfaction, we strive to exceed your
          expectations at every turn. From our seamless online shopping platform
          to our responsive customer support, we're here to make your shopping
          experience enjoyable and hassle-free.
        </p>
        <p>
          Thank you for choosing The Great Bazaar. We look forward to serving
          you and providing you with an exceptional shopping experience!
        </p>
        <h3>Contact Us</h3>
        <p>
          We're always eager to hear from you! If you have any questions,
          comments, or feedback, please don't hesitate to reach out to us.
          Here's how you can connect with us:
        </p>
        <div className="contact-info">
          <p>Email: contact@example.com</p>
          <p>Phone: (123) 456-7890</p>
          <p>Address: 1234 Street, City, Country</p>
        </div>
      </div>
    </div>
  );
};
export default AboutUs;
