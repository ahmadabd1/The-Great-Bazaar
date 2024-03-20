import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t, i18n } = useTranslation();

  return (
    <footer className="border-gray-300-lg fixed bottom-0 left-0 right-0 z-50 border-t backdrop-blur-md ">
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
            <NavLink to="/client/AboutUs" className="text-slate-200">
              <span>About Us</span>
            </NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/policy" className="text-slate-200">
              <span>Legal</span>
            </NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/contact" className="text-slate-200">
              <span>Join Us</span>
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
