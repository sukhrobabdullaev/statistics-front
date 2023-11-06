import React from "react";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="p-2 flex justify-between items-center">
      <img src="imgs/panel_hsat_logo.png" alt="hsat logo" className="w-28" />
      <div className="flex items-center gap-2 pr-4">
        <Link className="relative">
          <MdOutlineNotificationsNone
            size={25}
            className="text-gray-600 hover:text-black transition-all "
          />
          <span className="rounded-full text-white text-sm w-4 h-4 bg-red-500 text-center absolute top-0 right-0">
            4
          </span>
        </Link>
        <Link>
          <AiOutlineUser
            size={25}
            className="text-gray-600 hover:text-black transition-all"
          />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
