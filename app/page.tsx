"use client";

import { Category, DisplayProductType, navLinksDataType, ProductDataType, SubCategory, User } from "@/lib/typeDefinitions";
import Header from "./_components/Header";
import Navbar from "./_components/Navbar";
import { useEffect, useState } from "react";
import DisplayCard from "./_components/DisplayCard";
import SubcategoryButton from "./_components/SubcategoryButton";

export default function Home() {

  const [page, setPage] = useState<string>("Men");
  const [subcategories, setSubcategories] = useState<SubCategory[]|null>(null);
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
      <Navbar isLogin={isLogin} displayNavLinks={true} activePage={page} setPage={setPage} search={search} setSearch={setSearch} cartCount={user ? user.cart.length : 0} />
      <div className="m-5">
        <h1 className="text-2xl font-semibold">{page}</h1>
        <div className="flex flex-row gap-10 mt-5">
          {subcategories?.map((subCat, key) => {
            return (
              <SubcategoryButton key={key} name={subCat.name} />
            )
          })}
        </div>
      </div>
    </>
  );
}
