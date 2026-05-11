import React from "react";
import { FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full bg-black flex flex-col md:flex-row py-10 md:px-30 gap-20">
      <div className="flex flex-col gap-5 items-center md:items-start">
        <span className="text-white">About "Kalyani hosiery"</span>
        <span className="text-white flex gap-5">
          Mo.:-
          <b>+91 9XXXX 8XXXX</b>
        </span>
        <span className="text-white flex gap-5">
          Email:-
          <b>email@business.com</b>
        </span>
      </div>

      <div className="flex flex-col gap-5 items-center md:items-start">
        <span className="text-white text-xl">CUSTMOR SERVICE</span>
        <ul className="text-white flex flex-col gap-2">
          <li className="hover:underline">
            <a href="/aboutus">About Us</a>
          </li>
          <li className="hover:underline">
            <a href="/search">Search</a>
          </li>
          <li className="hover:underline">
            <a href="/contactus">Contact Us</a>
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-5 items-center md:items-start">
        <span className="text-white text-xl">POLICIES</span>
        <ul className="text-white flex flex-col gap-2">
          <li className="hover:underline">
            <a href="/policy/privacy">Privacy Policys</a>
          </li>
          <li className="hover:underline">
            <a href="/policy/return">Return & Exchange</a>
          </li>
          <li className="hover:underline">
            <a href="/policy/shipping">Shipping Policy</a>
          </li>
          <li className="hover:underline">
            <a href="/policy/service">Terms Of Service</a>
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-5 h-[35vh] md:w-[20vw] px-10 md:px-0">
        <div className="h-[30%] w-full flex items-center gap-5 justify-end text-white px-5">
          <FaInstagram size={35} />
          <FaYoutube size={35} />
          <FaWhatsapp size={35} />
        </div>
        <span className="text-white text-right">
          &copy; 2026 Kalyani Hosiery, RAJKOT
        </span>
      </div>
    </div>
  );
};

export default Footer;
