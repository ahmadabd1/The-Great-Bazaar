import { Link } from "react-router-dom";
import "../style/ClientNavbar.css";
import axios from "axios";
export default function ClientNavbar() {
  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      await axios.post("/user/logout", { refreshToken });
      localStorage.clear();
      window.location.href = "/";
    } catch (error) {
      console.error(
        "Logout error:",
        error.response ? error.response.data : error.message,
      );
      localStorage.clear();
      window.location.href = "/";
    }
  };

  return (
    <nav
      className="border-width: 1px; z-100 fixed left-0 right-0 top-0 shadow-lg backdrop-blur-md"
      style={{ border: "3px solid rgba(0, 0, 0, 0.3" }}
    >
      <div>
        <div className="ml-10 items-center md:flex">
          <a href="/">
            <img
              src="http://localhost:5173/src/assets/BazaarIcon.gif"
              width={100}
              height={40}
            />
          </a>
          <div className="mr-4 mt-0 pb-3 md:block md:pb-0">
            <ul className="flex flex-col justify-end space-y-0 pr-0 md:flex md:flex-row">
              {leftNavigation.map((item, idx) => (
                <li
                  key={idx}
                  className="ml-0 md:ml-4"
                  onClick={() => setState(false)}
                >
                  <NavBarLink
                    to={item.path}
                    icon={item.icon}
                    label={item.label}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="md:hidden">
            <button
              className="rounded-md p-2 text-gray-700 outline-none focus:border focus:border-gray-400"
              onClick={() => setState(!state)}
            >
              {state ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="ml-auto mr-12 mt-0 justify-self-center pb-3 md:block md:pb-0">
            <ul className="flex flex-col justify-end space-y-0 pr-0 md:flex md:flex-row">
              {rightNavigation.map((item, idx) => {
                return (
                  <li
                    key={idx}
                    className="ml-0 md:ml-4"
                    onClick={() => setState(false)}
                  >
                    <NavBarLink
                      to={item.path}
                      icon={item.icon}
                      label={item.label}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
