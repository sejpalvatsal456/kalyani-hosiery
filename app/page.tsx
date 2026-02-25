"use client";

import {
  Category,
  DisplayProductType,
  navLinksDataType,
  ProductDataType,
  SubCategory,
  User,
} from "@/lib/typeDefinitions";
import Header from "./_components/Header";
import Navbar from "./_components/Navbar";
import { useEffect, useState } from "react";
import DisplayCard from "./_components/DisplayCard";
import SubcategoryButton from "./_components/SubcategoryButton";
import BannerSlider from "./_components/BannerSlider";
import Image from "next/image";

const banners = [
  {
    id: 1,
    image:
      "https://infashionbusiness.com/admin_assets/images/products/infashion-1724920175.jpeg",
    title: "Highlander",
    subtitle: "",
    cta: "",
  },
  {
    id: 2,
    image:
      "https://img.freepik.com/free-vector/fashion-template-design_23-2150368863.jpg?semt=ais_user_personalization&w=740&q=80",
    title: "Adidas Originals",
    subtitle: "",
    cta: "",
  },
  {
    id: 3,
    image:
      "https://d3jmn01ri1fzgl.cloudfront.net/photoadking/webp_thumbnail/shark-new-collection-sale-clothing-banner-template-p3ztild89dffd0.webp",
    title: "Puma Sports Collection",
    subtitle: "Buy 1 Get 1 Free",
    cta: "Grab Deal",
  },
];

export default function Home() {
  const [page, setPage] = useState<string>("men");
  const [subcategories, setSubcategories] = useState<SubCategory[] | null>(
    null,
  );
  const [brands, setBrands] = useState<{ logo: string }[]>([]);
  const [search, setSearch] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);


  // Fetch the brand data

  useEffect(() => {
    fetch("/api/brand/", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setBrands(data.data);
    })
    .catch(err => console.log(err));
  }, []);

  // Fetch the categories data as per page state

  useEffect(() => {
    fetch("/api/subcategories/" + page.toLowerCase(), { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setSubcategories(data.subCats);
      })
      .catch((err) => console.log(err));

  }, [page]);

  return (
    <>
      <Header visibility={false} />
      <Navbar
        displayNavLinks={true}
        activePage={page}
        setPage={setPage}
        search={search}
        setSearch={setSearch}
        user={user}
        setUser={setUser}
      />
      <div className="mt-10">
        <div className="flex flex-row gap-10 mt-5 mx-5 md:mx-10">
          {subcategories?.map((subCat, key) => {
            return (
              <SubcategoryButton
                key={key}
                name={subCat.name}
                categoryName={page}
              />
            );
          })}
        </div>
        {/* <div className="p-6 mt-10 flex justify-center">
          <BannerSlider banners={banners} />
        </div> */}
        <div className="mt-10 mx-5 md:mx-10">
          <h1 className="text-2xl font-semibold">Brands</h1>
          <div className="bg-red-200 md:ml-3 my-5 w-full grid grid-cols-2 md:grid-cols-3 gap-10">
            {brands.map((brand, key) => {
              return (
                <div key={key} className="bg-gray-200 h-35 w-35 p-3 rounded-lg flex items-center justify-center">
                  <Image
                    src={brand.logo}
                    alt="logo"
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
