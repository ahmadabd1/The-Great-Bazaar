import React, { useState, useEffect } from "react";
import useUserInfo from "../customHooks/useUserInfo";
import NavBarLink from "./NavBarLink";

// Assuming the logout function is defined here or imported
const logout = () => {
  localStorage.clear();
  window.location.href = "/";
};

const PROFILE_IMAGE = "../../src/assets/ProfileTest.png";

export default function NavBar({}) {
  // Receive firstName as a prop
  const [state, setState] = useState(false);
  const { userInfo, loading, error, updateUserInfo } = useUserInfo();
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    if (userInfo && userInfo.firstName) {
      setFirstName(userInfo.firstName);
    }
  }, [userInfo]);

  const leftNavigation = [
    {
      label: "Profile",
      path: "/client/Profile",
    },

    {
      label: "Orders",
      path: "/orders",
      icon: "fluent:shopping-bag-16-regular",
    },
    { label: "Cart", path: "/userCart", icon: "fluent:cart-16-regular" },
    {
      label: "Logout",
      path: "/loggedout",
      icon: "fluent:arrow-exit-20-regular",
      onClick: logout,
    },
  ];

  const rightNavigation = [
    {
      label: (
        <span className="font-mono font-bold text-slate-200">
          {firstName && `Welcome, ${firstName}`}
        </span>
      ),
    },
    { label: "Home", path: "/client", icon: "fluent:home-12-regular" },
    {
      label: "Contact Us",
      path: "/",
      icon: "fluent:contact-card-ribbon-16-regular",
    },
  ];

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleItemClick = (item) => {
    if (item.label === "Logout") {
      item.onClick();
    } else if (item.label === "Contact Us") {
      scrollToBottom();
    } else {
      setState(false);
    }
  };

  return (
    <nav
      className="border-width: 1px; fixed left-0 right-0  top-0 z-auto  bg-slate-950 bg-opacity-30 shadow-lg backdrop-blur-md"
      style={{ border: "3px solid rgba(0, 0, 0, 0.3)" }}
    >
      <div>
        <div className="items-center md:flex">
          <a href="/">
            {" "}
            <a href="/">
              <img
                src="http://localhost:5173/src/assets/BazaarIcon.gif"
                width={100}
                height={40}
              />
            </a>
          </a>
          <img
            src={PROFILE_IMAGE}
            className="  h-[8vh] w-[8vh] items-center rounded-3xl border-2 border-sky-900"
          />
          <div className="absolute ml-[19vh] mt-0  md:block md:pb-0">
            <ul className="flex flex-col justify-end space-y-0 pr-0 md:flex md:flex-row">
              {leftNavigation.map((item, idx) => (
                <li
                  key={idx}
                  className="md:ml-4"
                  onClick={() => handleItemClick(item)}
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

          <div className="ml-auto mr-12 mt-0 justify-self-center pb-3 md:block md:pb-0">
            <ul className="flex flex-col justify-end space-y-0 pr-0 md:flex md:flex-row">
              {rightNavigation.map((item, idx) => (
                <li
                  key={idx}
                  className="ml-0 md:ml-4"
                  onClick={() => handleItemClick(item)}
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
        </div>
      </div>
    </nav>
  );
}
