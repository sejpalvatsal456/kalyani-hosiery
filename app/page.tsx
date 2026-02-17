"use client";

import { Category, DisplayProductType, navLinksDataType, ProductDataType, SubCategory, User } from "@/lib/typeDefinitions";
import Header from "./_components/Header";
import Navbar from "./_components/Navbar";
import { useEffect, useState } from "react";
import DisplayCard from "./_components/DisplayCard";
import SubcategoryButton from "./_components/SubcategoryButton";


export default function Home() {

  const [page, setPage] = useState<string>("men");
  const [subcategories, setSubcategories] = useState<SubCategory[]|null>(null);
  const [search, setSearch] = useState<string>("");
  const [user, setUser] = useState<User|null>(null);

  // Fetch the categories data as per page state

  useEffect(() => {
    fetch('/api/subcategories/' + page.toLowerCase(), { method: "GET" })
    .then(res => res.json())
    .then(data => {
      setSubcategories(data.subCats);
    })
    .catch(err => console.log(err));
  }, [page]);

  return (
    <>
      <Header visibility={false} />
      <Navbar displayNavLinks={true} activePage={page} setPage={setPage} search={search} setSearch={setSearch} user={user} setUser={setUser} />
      <div className="m-5">
        <h1 className="text-2xl font-semibold">{page}</h1>
        <div className="flex flex-row gap-10 mt-5">
          {subcategories?.map((subCat, key) => {
            return (
              <SubcategoryButton key={key} name={subCat.name} categoryName={page} />
            )
          })}
        </div>
      </div>
    </>
  );
}
