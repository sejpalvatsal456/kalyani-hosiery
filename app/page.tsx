"use client";

import { Category, DisplayProductType, navLinksDataType, ProductDataType, SubCategory } from "@/lib/typeDefinitions";
import Header from "./_components/Header";
import Navbar from "./_components/Navbar";
import { useEffect, useState } from "react";
import DisplayCard from "./_components/DisplayCard";

const navLinksData: navLinksDataType[] = [
  { name: "Men", tag: "men" },
  { name: "Women", tag: "women" },
  { name: "Kids", tag: "kids" },
]

export default function Home() {

  const [page, setPage] = useState<string>("men")
  const [productDataList, setProductDataList] = useState<DisplayProductType[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    fetch('/api/auth/me', {
      method: "GET",
      credentials: "include"
    })
    .then(res => res.json())
    .then(data => console.log(data.login))
    .catch(err => console.log(err));
  })

  return (
    <>
      <Header visibility={false} />
      <Navbar displayNavLinks={true} activePage={page} setPage={setPage} search={search} setSearch={setSearch} navLinksData={navLinksData} cartCount={2} />
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
