"use client";

import React, { useState } from "react";
import "@tailwindplus/elements";
import { ElDropdown, ElMenu } from "@tailwindplus/elements/react";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegUser, FaSearch } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { navLinksDataType } from "@/lib/typeDefinitions";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar({
  activePage,
  navLinksData,
  cartCount,
}: {
  activePage: string;
  navLinksData: navLinksDataType[];
  cartCount: number;
}) {
  const [open, setOpen] = useState<boolean>(false);

  const navLinksEl = navLinksData.map((navLink, key) => {
    return (
      <li
        key={key}
        className={
          "hover:font-medium hover:underline underline-offset-3 " +
          (activePage === navLink.tag ? "underline" : "")
        }
      >
        <a href={"/" + navLink.tag}>{navLink.name}</a>
      </li>
    );
  });

  return (
    <nav className="shadow-sm px-6 md:px-20">
      {/* Top Bar */}
      <div className="flex justify-between items-center h-20">
        {/* Navbar hamburger - mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden cursor-pointer"
        >
          {!open ? <HiMenu size={25} /> : <HiX size={25} />}
        </button>

        {/* Logo */}
        <a href="/">
          <img
            width={100}
            className="h-7 cursor-pointer"
            src="https://khushbujewellers.com/cdn/shop/files/khushbu_jewellers_logo_1_d016ce61-73cb-4f48-8fb7-8073abc9b45d.png?v=1751370925&width=320"
            alt="logo"
          />
        </a>

        {/* Nav links desktop */}
        <ul className="hidden md:flex items-center gap-10">{navLinksEl}</ul>

        {/* Nav Search desktop */}
        <form
          action=""
          method="GET"
          className="hidden md:flex items-center bg-[#f5f5f5] px-5 gap-5 rounded"
        >
          <CiSearch size={20} className="h-10 " />
          <input
            className="h-10 focus:outline-none"
            placeholder="Search..."
            type="text"
            name="serachInput"
            id="searchInput"
          />
        </form>

        {/* Profile logos - desktop */}
        <ul className="hidden md:flex items-center gap-10">
          <li className="relative">
            <FiShoppingCart size={25} />
            {cartCount > 0 && (
              <div className="absolute -bottom-2 -right-3 bg-red-500 text-white text-[14px] h-[20px] min-w-[20px] flex items-center justify-center rounded-full px-1">
                {cartCount}
              </div>
            )}
          </li>
          <li>
            <FaRegUser size={25} />
          </li>
        </ul>

        {/* Profile logos - mobile */}
        <ul className="flex md:hidden items-center gap-10">
          <li className="relative">
            <FiShoppingCart size={25} />
            {cartCount > 0 && (
              <div className="absolute -bottom-2 -right-3 bg-red-500 text-white text-[14px] h-[20px] min-w-[20px] flex items-center justify-center rounded-full px-1">
                {cartCount}
              </div>
            )}
          </li>
        </ul>
      </div>

      {/* Foldable Menu for mobile view */}
      <div
        className={
          "md:hidden transistion-[max-height] duration-300 ease-in-out " + (open ? "max-h-100 opacity-100" : "max-h-0 opacity-0")
        }
      >
        {/* Mobile search */}
        <form
          method="GET"
          className="flex items-center bg-[#f5f5f5] px-5 gap-5 rounded mb-3"
        >
          <CiSearch size={20} />
          <input
            className="h-10 bg-transparent focus:outline-none w-full"
            placeholder="Search..."
            type="text"
            name="searchInput"
          />
        </form>

        {/* Mobile links */}
        <ul className="flex flex-col gap-6 py-6 mb-5">{navLinksEl}</ul>

        {/* Mobile icons */}
        <ul className="flex flex-col gap-5 pb-6">
          <li className="flex items-center gap-5">
            <FaRegUser size={20} />
            <span>Profile</span>
          </li>
        </ul>
      </div>
    </nav>
  );
}
