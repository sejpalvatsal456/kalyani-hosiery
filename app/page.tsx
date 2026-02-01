"use client";

import { navLinksDataType, ProductDataType } from "@/lib/typeDefinitions";
import Header from "./_components/Header";
import Navbar from "./_components/Navbar";
import { useEffect, useState } from "react";
import DisplayCard from "./_components/DisplayCard";

const navLinksData: navLinksDataType[] = [
  { name: "Men", tag: "men" },
  { name: "Women", tag: "women" },
  { name: "Kids", tag: "kids" },
]

const productDataListFromApi: ProductDataType[] = [
  {
    id: 1,
    category: "Men",
    subcategory: "tshirt",
    link: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dCUyMHNoaXJ0fGVufDB8fDB8fHww",
    price: 200,
    mrp: 250,
    title: "T Shirt",
    subtitle: "Subtitle for T shirt"
  },
  {
    id: 2,
    category: "Men",
    subcategory: "pant",
    link: "data:image/jpeg;base64,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",
    price: 500,
    mrp: 750,
    title: "Pant",
    subtitle: "Subtitle for Pant"
  }
]

export default function Home() {

  const [page, setPage] = useState<string>("men")
  const [productDataList, setProductDataList] = useState<ProductDataType[]>([]);
  const [search, setSearch] = useState<string>("");


  
  useEffect(() => {
    setProductDataList(productDataListFromApi.filter(productData => productData.title.toLowerCase().includes(search.toLowerCase())))
  }, [search]);
  
  useEffect(() => {
    // fetch from api
    setProductDataList(productDataListFromApi);
  }, []);
  return (
    <>
      <Header visibility={false} />
      <Navbar activePage={page} setPage={setPage} search={search} setSearch={setSearch} navLinksData={navLinksData} cartCount={2} />
      <h1 className="text-2xl m-5 font-semibold">{page}</h1>
      <div id="showCase" className='mx-10 grid grid-cols-2 md:grid-cols-4 gap-10'>
        {
          productDataList.map((productData, key) => {
            return (
              <DisplayCard key={productData.id} productData={productData} />
            )
          })
        }
      </div>
    </>
  );
}
