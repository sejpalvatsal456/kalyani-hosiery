"use client";

import { navLinksDataType } from "@/lib/typeDefinitions";
import Header from "./_components/Header";
import Navbar from "./_components/Navbar";
import { useState } from "react";

const navLinksData: navLinksDataType[] = [
  { name: "Men", tag: "men" },
  { name: "Women", tag: "women" },
  { name: "Kids", tag: "kids" },
]

export default function Home() {

  const [page, setPage] = useState<string>("men")

  return (
    <>
      <Header visibility={false} />
      <Navbar activePage={page} setPage={setPage} navLinksData={navLinksData} cartCount={2} />
      <h1 className="text-2xl m-5 font-semibold">{page}</h1>
    </>
  );
}
