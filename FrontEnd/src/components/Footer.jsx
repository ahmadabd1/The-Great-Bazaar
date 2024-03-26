import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t, i18n } = useTranslation();
  const [showFooter, setShowFooter] = useState(true);

  useEffect(() => {
    // Function to handle scrolling and toggle footer visibility
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      const documentHeight = document.body.scrollHeight;

      // Calculate the distance from the bottom of the page
      const distanceFromBottom =
        documentHeight - (scrollPosition + windowHeight);

      // Set showFooter based on scroll position
      setShowFooter(distanceFromBottom > 100); // You can adjust this threshold value as needed
    };

    // Add event listener for scroll
    window.addEventListener("scroll", handleScroll);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {showFooter && (
        <footer className="border-gray-300-lg  fixed bottom-0  left-0 right-0 z-50 border-t bg-slate-950 bg-opacity-50 backdrop-blur-md ">
          <div className="page container">
            <div className="mx-auto flex  max-w-screen-xl items-center justify-between px-3 py-1 md:px-1 md:py-3">
              <div className="justify-center text-slate-200">
                <span className="hidden xso:inline-block">xs</span>
                <span className="hidden smo:inline-block">sm</span>
                <span className="hidden mdo:inline-block">md</span>
                <span className="hidden lgo:inline-block">lg</span>
                <span className="hidden xlo:inline-block">xl</span>
                <span className="hidden 2xlo:inline-block">2xl</span>
              </div>
              <div>
                <NavLink to="/AboutUs" className="text-slate-200">
                  <span>About Us & Legal</span>
                </NavLink>
                &nbsp;|&nbsp; &nbsp;|&nbsp;
              </div>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}
