import React from "react";
import supportIcon from "../assets/support_agent_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.png";
import logo from "../assets/Icon-192.png";
const navbar = () => {
  return (
    <div>
      <nav className="bg-white sticky top-0 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <a href="#">
            <img
              src={logo}
              alt="Angelx Logo"
              className="w-10 h-10 rounded-full"
            />
          </a>
          <a href="#">
            <img src={supportIcon} alt="Support Icon" className="w-8" />
          </a>
        </div>
      </nav>
    </div>
  );
};

export default navbar;
