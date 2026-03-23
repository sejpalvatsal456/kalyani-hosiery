"use client";

import React, { FormEvent, useEffect, useState } from "react";
import "@tailwindplus/elements";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { FaRegUser, FaSearch } from "react-icons/fa";
import { CiBellOn, CiSearch, CiShoppingCart, CiUser } from "react-icons/ci";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ICategory, ISubcategory, IUser } from "@/lib/typeDefinitions";
import { category } from "@/lib/category";

export default function Navbar({
  activePage,
  setPage,
  categories,
  search,
  setSearch,
  displayNavLinks,
  user,
  setUser
}: {
  activePage: ICategory|null;
  setPage: (val: ICategory|null) => void;
  categories: ICategory[]|null;
  search: string;
  setSearch: (search: string) => void;
  displayNavLinks: boolean;
  user:IUser|null;
  setUser: (val: (IUser|null)) => void;
}) {

  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const handleUserClick = (e:FormEvent) => {
    e.preventDefault();
    router.push(`/profile?callbackUrl=${encodeURIComponent(pathname)}`);
  }

  useEffect(() => {
    // fetch('/api/auth/me', {
    //   method: "GET",
    //   credentials: "include"
    // })
    // .then(res => res.json())
    // .then(data => {
    //   setIsLogin(data.login);
    //   console.log(data.data);
    //   setUser(data.data)
    // })
    // .catch(err => console.log(err));
    
  }, []);

  useEffect(() => {
    // fetch('/api/categories/', { method: "GET" })
    // .then(res => res.json())
    // .then(data => {
    //   let temp:string[]  = [];
    //   data.cats.map((cat: ISubcategory) => {
    //     temp.push(cat.name);
    //   });
    //   setNavLinks(temp);
    // })
    // .catch(err => console.log(err));

  }, []);

  const themeColor: string = "#fcecb6";
  // Men - #b6d7fc
  // Women - #fcb6c5
  /// Kids - #fcb6b6
  // Sales - #fcecb6


  return (
    <nav className={
      `border-b-1 border-gray-300 w-[100vw] md:bg-none md:bg-white transition-all duration-300`
    }
    style={{
      background: `linear-gradient(180deg, ${activePage?.theme} 0%, white 110%)`
    }}
    >
      {/* Top Bar */}
      <div className="flex justify-between items-center h-[13vh] md:px-5 px-5 pr-5 md:pr-10 gap-5 w-[100vw]">
        {/* Logo */}
        <a href="/" className="hidden md:flex">
          <Image src="/logo1.png" alt="Next.js logo" width={150} height={50} />
        </a>

        {/* Nav links desktop */}
        {displayNavLinks ? (
          <ul className="hidden md:flex items-center gap-10">
            {/* {navLinks.map((name: string, key) => {
              return (
                <li
                  key={key}
                  className={
                    "w-full h-10 text-center hover:font-medium border-[#fc2167] cursor-pointer hover:border-b-3 hover:border-[#fc2167] " +
                    (activePage.toLowerCase() === name ? "border-b-3 text-[#fc2167]" : "")
                  }
                  onClick={() => setPage(name)}
                >
                  <span className="text-sm font-semibold">{name.toUpperCase()}</span>
                </li>
              );
            })} */}
            {activePage && categories?.map((cat, key) => {
              return (
                <li
                  key={key}
                  className={
                    "w-full h-10 text-center hover:font-medium border-[#fc2167] cursor-pointer hover:border-b-3 hover:border-[#fc2167] " +
                    (activePage.slug.toLowerCase() === cat.slug ? "border-b-3 text-[#fc2167]" : "")
                  }
                  onClick={() => setPage(cat)}
                >
                  <span className="text-sm font-semibold">{cat.name}</span>
                </li>
              )
            })}
          </ul>
        ) : null}

        {/* Nav Search desktop */}
        <form
          action="/search"
          method="GET"
          className="flex items-center bg-[#f5f5f5] pl-3 md:pl-5 pr-5 gap-5 rounded-lg border-1 border-gray-400"
          onSubmit={(e) => {
            router.push(`/search?searchQuery=${search}`)
          }}
        >
          <a href="/" className="md:hidden">
            <Image src="/cropped_logo.png" alt="Next.js logo" width={30} height={50} />
          </a>
          {/* TODO: Fix size of search bar in mobile view */}
          <input
            className="w-25 md:w-auto h-10 focus:outline-none"
            placeholder="Search..."
            type="text"
            name="searchQuery"
            id="searchInput"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FiSearch
            size={20} 
            className="hidden md:flex h-10 cursor-pointer" 
            onClick={(e) => {
            router.push(`/search?serachInput=${search}`)
          }}
          />
        </form>

        {/* Profile logos - desktop */}
        <ul className="hidden md:flex items-center gap-7 md:gap-10">
          <li
            className="relative cursor-pointer"
            onClick={e => router.push('/cart/')}
          >
            <FiShoppingCart size={25} />
            {user && user.cart.length > 0 && (
              <div className="absolute -bottom-2 -right-3 bg-red-500 text-white text-[14px] h-[20px] min-w-[20px] flex items-center justify-center rounded-full px-1">
                {user?.cart.length}
              </div>
            )}
          </li>
          <li>
              {isLogin 
              ? <FaRegUser className="cursor-pointer" onClick={handleUserClick} size={25} />
              : (<button
                className="border-2 px-5 py-2 rounded border-[#fc2167] text-[#fc2167] font-medium cursor-pointer hover:text-white hover:bg-[linear-gradient(135deg,_#fc2167,_#ef123e)] transistion-all duration-300"
                onClick={e => router.push('/auth/login')}
              >Login</button>) }
          </li>
        </ul>

        {/* Profile logos - mobile */}
        <ul className="flex md:hidden items-center gap-4 md:gap-7">
          {/* <li 
            className={"relative cursor-pointer" + (!isLogin ? "hidden" : "")}
            onClick={e => router.push('/cart/')}
          >
            { isLogin && <FiShoppingCart size={25} /> }
            {(user && user.cart.length > 0 && isLogin) && (
              <div className="absolute -bottom-2 -right-3 bg-red-500 text-white text-[14px] h-[20px] min-w-[20px] flex items-center justify-center rounded-full px-1">
                {user.cart.length}
              </div>
            )}
          </li>
          <li className="flex items-center gap-5">
            {isLogin 
            ? <FaRegUser className="cursor-pointer" onClick={handleUserClick} size={25} />
            : (<button
              className="border-2 px-3 py-2 rounded border-[#fc2167] text-[#fc2167] font-medium cursor-pointer hover:text-white hover:bg-[linear-gradient(135deg,_#fc2167,_#ef123e)] transistion-all duration-300"
              onClick={e => router.push('/auth/login')}
            >Login</button>) }  
          </li> */}
          <li className="flex items-center md:gap-5">
            <CiBellOn size={30} />
          </li>
          <li className="flex relative items-center gap-5">
            <CiShoppingCart size={30} />
            {/* {user && user.cart.length > 0 && (
              <div className="absolute -bottom-2 -right-3 bg-red-500 text-white text-[14px] h-[20px] min-w-[20px] flex items-center justify-center rounded-full px-1">
                {user?.cart.length}
              </div>
            )} */}
            <div className="absolute -bottom-2 -right-2 bg-red-500 text-white text-[14px] h-[20px] min-w-[20px] flex items-center justify-center rounded-full px-1">
              2
              </div>
          </li>
          <li className="flex items-center gap-5">
            <CiUser size={30} />
          </li>
        </ul>
      </div>

      {/* Mobile links */}
      {displayNavLinks ? (
        <ul className="flex justify-between md:hidden">
          {/* {navLinks.map((name: string, key) => {
            return (
              <li
                key={key}
                className={
                  "w-full h-10 text-center hover:font-medium border-[#fc2167] cursor-pointer hover:border-b-3 hover:border-[#fc2167] " +
                  (activePage === name ? "border-b-3 text-[#fc2167]" : "")
                }
                onClick={() => setPage(name)}
              >
                <span>{name}</span>
              </li>
            );
          })} */}
          {activePage && categories?.map((cat, key) => {
            return (
              <li
                key={key}
                className={
                  "w-full h-10 text-center hover:font-medium border-[#fc2167] cursor-pointer hover:border-b-3 hover:border-[#fc2167] " +
                  (activePage.slug.toLowerCase() === cat.slug ? "border-b-3 text-[#fc2167]" : "")
                }
                onClick={() => setPage(cat)}
              >
                <span>{cat.name}</span>
              </li>
            )
          })}
        </ul>
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
          action="/search"
          method="GET"
          className="flex items-center bg-[#f5f5f5] px-5 gap-5 rounded mb-3"
          onSubmit={(e) => {
            router.push(`/search?searchQuery=${search}`)
          }}
        >
          <a href="/" className="md:hidden">
            <Image src="/logo1.png" alt="Next.js logo" width={0} height={50} />
          </a>
          <CiSearch size={20} />
          <input
            className="h-10 bg-transparent focus:outline-none w-full"
            placeholder="Search..."
            type="text"
            name="searchQuery"
          />
        </form>

        {/* Mobile icons */}
        <ul className="flex flex-col gap-5 pb-6"></ul>
      </div>
    </nav>
  );
}
