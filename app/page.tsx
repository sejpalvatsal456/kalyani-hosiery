"use client";

import { Category, DisplayProductType, navLinksDataType, ProductDataType, SubCategory, User } from "@/lib/typeDefinitions";
import Header from "./_components/Header";
import Navbar from "./_components/Navbar";
import { useEffect, useState } from "react";
import DisplayCard from "./_components/DisplayCard";

export default function Home() {

  const [page, setPage] = useState<string>("Men")
  const [productDataList, setProductDataList] = useState<DisplayProductType[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [user, setUser] = useState<User|null>(null);

  useEffect(() => {
    fetch('/api/auth/me', {
      method: "GET",
      credentials: "include"
    })
    .then(res => res.json())
    .then(data => {
      setIsLogin(data.login);
      console.log(data.data);
      setUser(data.data)
    })
    .catch(err => console.log(err));
  }, []);

  return (
    <>
      <Header visibility={false} />
      <Navbar isLogin={isLogin} displayNavLinks={true} activePage={page} setPage={setPage} search={search} setSearch={setSearch} cartCount={user ? user.cart.length : 0} />
      <h1 className="text-2xl m-5 font-semibold">{page}</h1>
      <div id="showCase" className='mx-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10'>
        {
          productDataList.map((productData) => {
            return (
              <DisplayCard key={productData._id} productData={productData} />
            )
          })
        }
      </div>
    </>
  );
}
