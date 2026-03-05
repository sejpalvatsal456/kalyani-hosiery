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
import { useRouter } from "next/navigation";
import SingleBanner from "./_components/SingleBanner";
import FiveItemSlider from "./_components/FiveItemSlider";
import { Product } from "@/lib/models";

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
  const router = useRouter();

  const [page, setPage] = useState<string>("men");
  const [subcategories, setSubcategories] = useState<SubCategory[] | null>(
    null,
  );
  const [brands, setBrands] = useState<{ name: string; logo: string }[]>([]);
  const [search, setSearch] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);

  // Fetch the brand data

  useEffect(() => {
    fetch("/api/brand/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setBrands(data.data);
      })
      .catch((err) => console.log(err));
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

  // Dev only part - replace it when backend is completed
  const salesProducts:DisplayProductType[] = [
    {
      _id: "1",
      brandName: "Powerlook",
      productName: "Men Alphanumeric Printed Pullover",
      categoryId: {
        _id: "123",
        name: "Men"
      },
      subcategoryId: {
        _id: "1234",
        categoryId: "123",
        name: "Sweaters"
      },
      thumbnail: "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
      variety: [
        {
          id: "color1",
          colorName: "Orange",
          imgLinks: ["https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg"],
          color: "#ff5f1f",
          sizes: [
            {
              id: "size1",
              size: "S",
              stock: 10,
              mrp: 2999,
              sellingPrice: 670,
            }
          ]
        }
      ],
      desc: [],
      createdAt: "",
      updatedAt: ""
    },

    {
      _id: "2",
      brandName: "Powerlook",
      productName: "Men Alphanumeric Printed Pullover",
      categoryId: {
        _id: "123",
        name: "Men"
      },
      subcategoryId: {
        _id: "1234",
        categoryId: "123",
        name: "Sweaters"
      },
      thumbnail: "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
      variety: [
        {
          id: "color1",
          colorName: "Orange",
          imgLinks: ["https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg"],
          color: "#ff5f1f",
          sizes: [
            {
              id: "size1",
              size: "S",
              stock: 10,
              mrp: 2999,
              sellingPrice: 670,
            }
          ]
        }
      ],
      desc: [],
      createdAt: "",
      updatedAt: ""
    },

    {
      _id: "3",
      brandName: "Powerlook",
      productName: "Men Alphanumeric Printed Pullover",
      categoryId: {
        _id: "123",
        name: "Men"
      },
      subcategoryId: {
        _id: "1234",
        categoryId: "123",
        name: "Sweaters"
      },
      thumbnail: "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
      variety: [
        {
          id: "color1",
          colorName: "Orange",
          imgLinks: ["https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg"],
          color: "#ff5f1f",
          sizes: [
            {
              id: "size1",
              size: "S",
              stock: 10,
              mrp: 2999,
              sellingPrice: 670,
            }
          ]
        }
      ],
      desc: [],
      createdAt: "",
      updatedAt: ""
    },

    {
      _id: "4",
      brandName: "Powerlook",
      productName: "Men Alphanumeric Printed Pullover",
      categoryId: {
        _id: "123",
        name: "Men"
      },
      subcategoryId: {
        _id: "1234",
        categoryId: "123",
        name: "Sweaters"
      },
      thumbnail: "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
      variety: [
        {
          id: "color1",
          colorName: "Orange",
          imgLinks: ["https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg"],
          color: "#ff5f1f",
          sizes: [
            {
              id: "size1",
              size: "S",
              stock: 10,
              mrp: 2999,
              sellingPrice: 670,
            }
          ]
        }
      ],
      desc: [],
      createdAt: "",
      updatedAt: ""
    },
    {
      _id: "1",
      brandName: "Powerlook",
      productName: "Men Alphanumeric Printed Pullover",
      categoryId: {
        _id: "123",
        name: "Men"
      },
      subcategoryId: {
        _id: "1234",
        categoryId: "123",
        name: "Sweaters"
      },
      thumbnail: "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
      variety: [
        {
          id: "color1",
          colorName: "Orange",
          imgLinks: ["https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg"],
          color: "#ff5f1f",
          sizes: [
            {
              id: "size1",
              size: "S",
              stock: 10,
              mrp: 2999,
              sellingPrice: 670,
            }
          ]
        }
      ],
      desc: [],
      createdAt: "",
      updatedAt: ""
    },

    {
      _id: "2",
      brandName: "Powerlook",
      productName: "Men Alphanumeric Printed Pullover",
      categoryId: {
        _id: "123",
        name: "Men"
      },
      subcategoryId: {
        _id: "1234",
        categoryId: "123",
        name: "Sweaters"
      },
      thumbnail: "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
      variety: [
        {
          id: "color1",
          colorName: "Orange",
          imgLinks: ["https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg"],
          color: "#ff5f1f",
          sizes: [
            {
              id: "size1",
              size: "S",
              stock: 10,
              mrp: 2999,
              sellingPrice: 670,
            }
          ]
        }
      ],
      desc: [],
      createdAt: "",
      updatedAt: ""
    },

    {
      _id: "3",
      brandName: "Powerlook",
      productName: "Men Alphanumeric Printed Pullover",
      categoryId: {
        _id: "123",
        name: "Men"
      },
      subcategoryId: {
        _id: "1234",
        categoryId: "123",
        name: "Sweaters"
      },
      thumbnail: "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
      variety: [
        {
          id: "color1",
          colorName: "Orange",
          imgLinks: ["https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg"],
          color: "#ff5f1f",
          sizes: [
            {
              id: "size1",
              size: "S",
              stock: 10,
              mrp: 2999,
              sellingPrice: 670,
            }
          ]
        }
      ],
      desc: [],
      createdAt: "",
      updatedAt: ""
    },

    {
      _id: "4",
      brandName: "Powerlook",
      productName: "Men Alphanumeric Printed Pullover",
      categoryId: {
        _id: "123",
        name: "Men"
      },
      subcategoryId: {
        _id: "1234",
        categoryId: "123",
        name: "Sweaters"
      },
      thumbnail: "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
      variety: [
        {
          id: "color1",
          colorName: "Orange",
          imgLinks: ["https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg"],
          color: "#ff5f1f",
          sizes: [
            {
              id: "size1",
              size: "S",
              stock: 10,
              mrp: 2999,
              sellingPrice: 670,
            }
          ]
        }
      ],
      desc: [],
      createdAt: "",
      updatedAt: ""
    }
  ]

  return (
    <>
      <Header visibility={true} />
      <Navbar
        displayNavLinks={true}
        activePage={page}
        setPage={setPage}
        search={search}
        setSearch={setSearch}
        user={user}
        setUser={setUser}
      />

      {/* Banner 1 */}

      <div className="p-6 mt-10 flex justify-center">
        <SingleBanner banner="https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2026/FEBRUARY/27/obphjJzo_1ad3360b53864bd2beda235cf8a373c0.jpg" />
      </div>

      {/* Banner 2 */}
      <div className="p-6 mt-10 flex justify-center">
        <SingleBanner banner="https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2026/FEBRUARY/26/VUKUZgUj_b4dda5139af545218f9aea110ab7b12e.jpg" />
      </div>

      {/* Brands Slider */}
      {/* <div className="mt-10 mx-5 md:mx-10">
        <h1 className="text-2xl font-semibold">Brands</h1>
        <div className="md:ml-3 my-5 w-full grid grid-cols-2 md:grid-cols-7 gap-10">
          {brands.map((brand, key) => {
            return (
              <div
                key={key}
                className="bg-gray-200 h-35 w-35 p-3 rounded-lg flex items-center justify-center cursor-pointer"
                onClick={(e) => {
                  router.push(`/brand/${brand.name}`);
                }}
              >
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
      </div> */}

      <div className="max-w-7xl mx-auto mt-10">
        <FiveItemSlider
          items={brands.map((brand, key) => {
            return (
              <div
                key={key}
                className="shadow-lg py-5 h-30 w-30 rounded-lg flex items-center justify-center cursor-pointer"
                onClick={(e) => {
                  router.push(`/brand/${brand.name}`);
                }}
              >
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
          interval={5000}
        />
      </div>

      {/* Banner 3 */}
      <div className="p-6 mt-10 flex justify-center">
        <SingleBanner banner="https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2026/FEBRUARY/26/lrGEWYY7_6e08d485e91a4fd8b3a0751379af9720.jpg" />
      </div>

      {/* Cateogries */}

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
      </div>

      {/* Banner 4 */}
      <div className="p-6 mt-10 flex justify-center">
        <SingleBanner banner="https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2026/FEBRUARY/26/VUKUZgUj_b4dda5139af545218f9aea110ab7b12e.jpg" />
      </div>

      {/* Product on sales */}

      <div className="mt-10 mx-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 place-items-center gap-5">
        {salesProducts.map((product, key) => {
          return (
            <DisplayCard
              key={key}
              productData={product}
            />
          )
        })}
      </div>

      {/* Address Section */}

      <div className="my-10 mx-10 h-[70vh] bg-red-200">
        
      </div>

      {/* Footer */}

      <div className="w-full bg-black flex py-10 md:px-30 gap-20">
        <div className="flex flex-col gap-5">
          <span className="text-white">About "Kalyani hosiery"</span>
          <span className="text-white flex gap-5">
            Mo.:- 
            <b>+91 9XXXX 8XXXX</b>
          </span>
          <span className="text-white flex gap-5">
            Email:- 
            <b>email@business.com</b>
          </span>
        </div>
        <div className="flex flex-col gap-5">
          <span className="text-white text-xl">CUSTMOR SERVICE</span>
          <ul className="text-white">
            <li><a href="/aboutus">About Us</a></li>
            <li><a href="/search">Search</a></li>
            <li><a href="/contactus">Contact Us</a></li>
          </ul>
        </div>
        <div></div>
        <div></div>
      </div>

    </>
  );
}
