import React from "react";
import Logo from '../Images/Logo.jpg';
import Image from "next/image";

const Header = () => {
  return (
    <div className=" bg-gray-600 relative z-10 flex items-center justify-between  px-12">
    <div>
      <Image
      className='ml-10'
        alt="logo"
        src={Logo}
        width={100}
        height={100}
      />
    </div>
    <div className="flex flex-grow justify-center space-x-6">
      <a href="" className="text-white text-lg underline-animation"></a>
      <a href="/Admin/Posts" className="text-white text-lg underline-animation">Post</a>
      <a href="" className="text-white text-lg underline-animation">Delete</a>
      <a href="" className="text-white text-lg underline-animation">Agents</a>
    </div>
    <a
      href="#"
      className="block rounded-md border border-white px-3 py-2 text-center text-sm text-white shadow-sm hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      Logout
    </a>
  </div>
  );
}

export default Header;
