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

  // Fetch the categories data as per page state

  useEffect(() => {
    fetch("/api/subcategories/" + page.toLowerCase(), { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setSubcategories(data.subCats);
      })
      .catch((err) => console.log(err));

    // Frontend only
    setBrands([
      {
        logo: "data:image/png;base64,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",
      },
      {
        logo: "data:image/png;base64,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"
      },

    ]);
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
      <div className="m-10">
        <div className="flex flex-row gap-10 mt-5">
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
        <div className="p-6 mt-10 flex justify-center">
          <BannerSlider banners={banners} />
        </div>
        <div className="p-6 mt-10 relative">
          <h1 className="text-2xl font-semibold">Banners</h1>
          <div className="ml-3 my-5 flex items-center w-full gap-5">
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
