"use client";

import React, { useState } from "react";
import "@tailwindplus/elements";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegUser, FaSearch } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import Image from "next/image";
import { useRouter } from "next/navigation";

const navLinksData = [
  { name: "Men" },
  { name: "Women" },
  { name: "Kids" },
  { name: "Sales" }
]

export default function Navbar({
  activePage,
  search,
  setSearch,
  setPage,
  cartCount,
  displayNavLinks,
  isLogin=false
}: {
  activePage: string;
  search: string;
  setSearch: (search: string) => void;
  setPage: (val: string) => void;
  cartCount: number;
  displayNavLinks: boolean;
  isLogin: boolean;
}) {

  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  const navLinksEl = navLinksData.map((navLink, key) => {
    return (
      <li
        key={key}
        className={
          "w-full h-10 text-center hover:font-medium border-[#fc2167] cursor-pointer hover:border-b-3 hover:border-[#fc2167] " +
          (activePage === navLink.name ? "border-b-3 text-[#fc2167]" : "")
        }
        onClick={() => setPage(navLink.name)}
      >
        <span>{navLink.name}</span>
      </li>
    );
  });

  return (
    <nav className="border-b-1 border-gray-300">
      {/* Top Bar */}
      <div className="flex justify-evenly items-center h-20 pl-3 md:pl-6 pr-3 md:pr-10 gap-5">
        {/* Logo */}
        <a href="/">
          <Image src="/logo1.png" alt="Next.js logo" width={150} height={50} />
        </a>

        {/* Nav links desktop */}
        {displayNavLinks ? (
          <ul className="hidden md:flex items-center gap-10">{navLinksEl}</ul>
        ) : null}

        {/* Nav Search desktop */}
        <form
          action=""
          method="GET"
          className="flex items-center bg-[#f5f5f5] px-5 gap-5 rounded"
        >
          <CiSearch size={20} className="hidden md:flex h-10 " />
          {/* TODO: Fix size of search bar in mobile view */}
          <input
            className="w-30 md:w-auto h-10 focus:outline-none"
            placeholder="Search..."
            type="text"
            name="serachInput"
            id="searchInput"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

        {/* Profile logos - desktop */}
        <ul className="hidden md:flex items-center">
          <li className="relative">
            <FiShoppingCart size={25} />
            {cartCount > 0 && (
              <div className="absolute -bottom-2 -right-3 bg-red-500 text-white text-[14px] h-[20px] min-w-[20px] flex items-center justify-center rounded-full px-1">
                {cartCount}
              </div>
            )}
          </li>
          <li>
            {isLogin 
            ? <FaRegUser size={25} />
            : (<button
              className="border-2 px-5 py-2 rounded border-[#fc2167] text-[#fc2167] font-medium cursor-pointer hover:text-white hover:bg-[linear-gradient(135deg,_#fc2167,_#ef123e)] transistion-all duration-300"
              onClick={e => router.push('/auth/login')}
            >Login</button>) }            
          </li>
        </ul>

        {/* Profile logos - mobile */}
        <ul className="flex md:hidden items-center gap-7 w-20">
          <li className={"relative " + (!isLogin ? "hidden" : "")}>
            { isLogin && <FiShoppingCart size={25} /> }
            {(cartCount > 0 && isLogin) && (
              <div className="absolute -bottom-2 -right-3 bg-red-500 text-white text-[14px] h-[20px] min-w-[20px] flex items-center justify-center rounded-full px-1">
                {cartCount}
              </div>
            )}
          </li>
          <li className="flex items-center gap-5">
            {isLogin 
            ? <FaRegUser size={25} />
            : (<button
              className="border-2 px-3 py-2 rounded border-[#fc2167] text-[#fc2167] font-medium cursor-pointer hover:text-white hover:bg-[linear-gradient(135deg,_#fc2167,_#ef123e)] transistion-all duration-300"
              onClick={e => router.push('/auth/login')}
            >Login</button>) }  
          </li>
        </ul>
      </div>

      {/* Mobile links */}
      {displayNavLinks ? (
        <ul className="flex justify-between md:hidden">{navLinksEl}</ul>
      ) : null}

      {/* Foldable Menu for mobile view */}
      <div
        className={
          "md:hidden px-6 transistion-[max-height] duration-300 ease-in-out " +
          (open ? "max-h-100 opacity-100" : "max-h-0 opacity-0")
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

        {/* Mobile icons */}
        <ul className="flex flex-col gap-5 pb-6"></ul>
      </div>
    </nav>
  );
}
