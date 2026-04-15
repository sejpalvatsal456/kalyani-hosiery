"use client";
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
import { FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { Josefin_Sans } from "next/font/google";
import {
  ICategory,
  IDisplayProduct,
  ISubcategory,
  IUser,
  IBrand,
} from "@/lib/typeDefinitions";
import SubcategorySlider from "./_components/SubcategorySlider";
import DisplayCardGrid from "./_components/DisplayCardGrid";
import ItemSlider from "./_components/ItemSlider";
import ReelsSlider from "./_components/ReelsSlider";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-josefin",
});

export interface ReelItem {
  id: string;
  videoUrl: string;
  thumbnail?: string;
}

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

const reels: ReelItem[] = [
  { id: "1", videoUrl: "/reels1.mp4" },
  { id: "2", videoUrl: "/reels2.mp4" },
  { id: "3", videoUrl: "/reels1.mp4" },
  { id: "4", videoUrl: "/reels2.mp4" },
  { id: "5", videoUrl: "/reels1.mp4" },
  { id: "6", videoUrl: "/reels2.mp4" },
];

export default function Home() {
  const router = useRouter();

  const [page, setPage] = useState<ICategory | null>(null);
  const [subcategories, setSubcategories] = useState<ISubcategory[] | null>(
    null,
  );
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [search, setSearch] = useState<string>("");
  const [user, setUser] = useState<IUser | null>(null);

  // Fetch the brand data

  useEffect(() => {
    fetch("/api/brands/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Brand data from API: ")
        console.log(data);
        setBrands(data);
      })
      .catch((err) => console.log(err));

    // Men - #b6d7fc
    // Women - #fcb6c5
    /// Kids - #fcb6b6
    // Sales - #fcecb6

    fetch('/api/categories/', {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
    .then(res => res.json())
    .then(data => {
      console.log("Category Data from API: ");
      console.log(data);
      setCategories(data);
      setPage(data[0]);
    })
    .catch(err => console.log(err));

  }, []);

  // Dev only - Fetch the categories data as per page state

  useEffect(() => {
    if (!page) return;
    fetch("/api/subcategories/categoryId/" + page._id, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        console.log("Subcategory Data from API:");
        console.log(data)
        setSubcategories(data);
      })
      .catch((err) => console.log(err));

  }, [page]);

  useEffect(() => {
    console.log(subcategories);
  }, [subcategories])

  // Dev only category data as per page state

  // Dev only part - replace it when backend is completed
  const displayProducts: IDisplayProduct[] = [
    {
      _id: "1",
      brandId: {
        brandName: "Powerlook",
        brandLogo: ""
      },
      productName: "Men Alphanumeric Printed Pullover",
      slug: "man-alphanumeric-printed-pullover",
      createdAt: "2026-02-25T14:50:24.481Z",
      updatedAt: "2026-02-25T14:50:24.481Z",
      category: {
        _id: "123",
        slug: "men",
        name: "Men",
      },
      subcategory: {
        _id: "1234",
        categoryId: "123",
        slug: "sweaters",
        name: "Sweaters",
      },
      thumbnail:
        "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
      varients: [
        {
          colorID: "color1",
          colorName: "Orange",
          imgLinks: [
            "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
          ],
          colorCode: "#ff5f1f",
          sizes: [
            {
              sizeID: "size1",
              sizeName: "S",
              sku: "sku1",
              stock: 10,
              mrp: 2999,
              sellingPrice: 670,
              discountPercent: 77,
            },
          ],
        },
      ],
      tags: [],
      desc: [],
    },

    {
      _id: "2",
      brandId: {
        brandName: "Powerlook",
        brandLogo: ""
      },
      productName: "Men Alphanumeric Printed Pullover",
      slug: "man-alphanumeric-printed-pullover",
      createdAt: "2026-02-25T14:50:24.481Z",
      updatedAt: "2026-02-25T14:50:24.481Z",
      category: {
        _id: "123",
        slug: "men",
        name: "Men",
      },
      subcategory: {
        _id: "1234",
        categoryId: "123",
        slug: "sweaters",
        name: "Sweaters",
      },
      thumbnail:
        "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
      varients: [
        {
          colorID: "color1",
          colorName: "Orange",
          imgLinks: [
            "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
          ],
          colorCode: "#ff5f1f",
          sizes: [
            {
              sizeID: "size1",
              sizeName: "S",
              sku: "sku1",
              stock: 10,
              mrp: 2999,
              sellingPrice: 670,
              discountPercent: 77,
            },
          ],
        },
      ],
      tags: [],
      desc: [],
    },

    {
      _id: "3",
      brandId: {
        brandName: "Powerlook",
        brandLogo: ""
      },
      productName: "Men Alphanumeric Printed Pullover",
      slug: "man-alphanumeric-printed-pullover",
      createdAt: "2026-02-25T14:50:24.481Z",
      updatedAt: "2026-02-25T14:50:24.481Z",
      category: {
        _id: "123",
        slug: "men",
        name: "Men",
      },
      subcategory: {
        _id: "1234",
        categoryId: "123",
        slug: "sweaters",
        name: "Sweaters",
      },
      thumbnail:
        "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
      varients: [
        {
          colorID: "color1",
          colorName: "Orange",
          imgLinks: [
            "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
          ],
          colorCode: "#ff5f1f",
          sizes: [
            {
              sizeID: "size1",
              sizeName: "S",
              sku: "sku1",
              stock: 10,
              mrp: 2999,
              sellingPrice: 670,
              discountPercent: 77,
            },
          ],
        },
      ],
      tags: [],
      desc: [],
    },

    {
      _id: "4",
      brandId: {
        brandName: "Powerlook",
        brandLogo: ""
      },
      productName: "Men Alphanumeric Printed Pullover",
      slug: "man-alphanumeric-printed-pullover",
      createdAt: "2026-02-25T14:50:24.481Z",
      updatedAt: "2026-02-25T14:50:24.481Z",
      category: {
        _id: "123",
        slug: "men",
        name: "Men",
      },
      subcategory: {
        _id: "1234",
        categoryId: "123",
        slug: "sweaters",
        name: "Sweaters",
      },
      thumbnail:
        "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
      varients: [
        {
          colorID: "color1",
          colorName: "Orange",
          imgLinks: [
            "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
          ],
          colorCode: "#ff5f1f",
          sizes: [
            {
              sizeID: "size1",
              sizeName: "S",
              sku: "sku1",
              stock: 10,
              mrp: 2999,
              sellingPrice: 670,
              discountPercent: 77,
            },
          ],
        },
      ],
      tags: [],
      desc: [],
    },

    {
      _id: "5",
      brandId: {
        brandName: "Powerlook",
        brandLogo: ""
      },
      productName: "Men Alphanumeric Printed Pullover",
      slug: "man-alphanumeric-printed-pullover",
      createdAt: "2026-02-25T14:50:24.481Z",
      updatedAt: "2026-02-25T14:50:24.481Z",
      category: {
        _id: "123",
        slug: "men",
        name: "Men",
      },
      subcategory: {
        _id: "1234",
        categoryId: "123",
        slug: "sweaters",
        name: "Sweaters",
      },
      thumbnail:
        "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
      varients: [
        {
          colorID: "color1",
          colorName: "Orange",
          imgLinks: [
            "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
          ],
          colorCode: "#ff5f1f",
          sizes: [
            {
              sizeID: "size1",
              sizeName: "S",
              sku: "sku1",
              stock: 10,
              mrp: 2999,
              sellingPrice: 670,
              discountPercent: 77,
            },
          ],
        },
      ],
      tags: [],
      desc: [],
    },

    {
      _id: "6",
      brandId: {
        brandName: "Powerlook",
        brandLogo: ""
      },
      productName: "Men Alphanumeric Printed Pullover",
      slug: "man-alphanumeric-printed-pullover",
      createdAt: "2026-02-25T14:50:24.481Z",
      updatedAt: "2026-02-25T14:50:24.481Z",
      category: {
        _id: "123",
        slug: "men",
        name: "Men",
      },
      subcategory: {
        _id: "1234",
        categoryId: "123",
        slug: "sweaters",
        name: "Sweaters",
      },
      thumbnail:
        "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
      varients: [
        {
          colorID: "color1",
          colorName: "Orange",
          imgLinks: [
            "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
          ],
          colorCode: "#ff5f1f",
          sizes: [
            {
              sizeID: "size1",
              sizeName: "S",
              sku: "sku1",
              stock: 10,
              mrp: 2999,
              sellingPrice: 670,
              discountPercent: 77,
            },
          ],
        },
      ],
      tags: [],
      desc: [],
    },

    {
      _id: "7",
      brandId: {
        brandName: "Powerlook",
        brandLogo: ""
      },
      productName: "Men Alphanumeric Printed Pullover",
      slug: "man-alphanumeric-printed-pullover",
      createdAt: "2026-02-25T14:50:24.481Z",
      updatedAt: "2026-02-25T14:50:24.481Z",
      category: {
        _id: "123",
        slug: "men",
        name: "Men",
      },
      subcategory: {
        _id: "1234",
        categoryId: "123",
        slug: "sweaters",
        name: "Sweaters",
      },
      thumbnail:
        "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
      varients: [
        {
          colorID: "color1",
          colorName: "Orange",
          imgLinks: [
            "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
          ],
          colorCode: "#ff5f1f",
          sizes: [
            {
              sizeID: "size1",
              sizeName: "S",
              sku: "sku1",
              stock: 10,
              mrp: 2999,
              sellingPrice: 670,
              discountPercent: 77,
            },
          ],
        },
      ],
      tags: [],
      desc: [],
    },
  ];

  const salesProduct = [
    {
      thumbnail:
        "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
      slug: "man-alphanumeric-printed-pullover",
      discountPercent: 70,
    },
    {
      thumbnail:
        "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
      slug: "man-alphanumeric-printed-pullover",
      discountPercent: 70,
    },
    {
      thumbnail:
        "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
      slug: "man-alphanumeric-printed-pullover",
      discountPercent: 70,
    },
    {
      thumbnail:
        "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
      slug: "man-alphanumeric-printed-pullover",
      discountPercent: 70,
    },
    {
      thumbnail:
        "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
      slug: "man-alphanumeric-printed-pullover",
      discountPercent: 70,
    },
  ];

  return (
    <>
      <Header visibility={true} />
      <Navbar
        displayNavLinks={true}
        categories={categories}
        activePage={page}
        setPage={setPage}
        search={search}
        setSearch={setSearch}
        user={user}
        setUser={setUser}
      />

      {/* Banner 1 */}

      {/* <div className="md:p-6 px-2 py-3 md:mt-10 flex justify-center">
        <SingleBanner banner="https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2026/FEBRUARY/27/obphjJzo_1ad3360b53864bd2beda235cf8a373c0.jpg" />
      </div> */}

      {/* Banner Slider */}

      <div className="md:p-6 px-2 py-3 md:mt-5 flex justify-center">
        <BannerSlider banners={banners} />
      </div>

      {/* Banner 2 */}
      <div className="md:p-6 px-6 md:mt-10 flex justify-center">
        <SingleBanner banner="https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2026/FEBRUARY/26/VUKUZgUj_b4dda5139af545218f9aea110ab7b12e.jpg" />
      </div>

      <div className="max-w-7xl mt-3 mx-auto md:mt-10">
        {/* <FiveItemSlider brands={brands} /> */}
        <ItemSlider
          items={brands}
          itemCountDesktop={5}
          itemCountMobile={3}
          renderItem={(brand) => (
            <img
              src={brand.brandLogo}
              alt={brand.brandName}
              onClick={e => router.push("/search?brand=" + brand.brandName)}
              className="w-20 h-20 md:w-40 md:h-40 object-contain rounded-lg transition shadow-xl cursor-pointer"
            />
          )}
        />
      </div>

      {/* Banner 3 */}
      <div className="md:p-6 px-6 md:mt-10 flex justify-center">
        <SingleBanner banner="https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2026/FEBRUARY/26/lrGEWYY7_6e08d485e91a4fd8b3a0751379af9720.jpg" />
      </div>

      {/* Cateogries */}

      <div className="md:mt-10">
        <SubcategorySlider subCats={subcategories || []} />
      </div>

      {/* Banner 4 */}
      <div className="md:p-6 px-6 md:mt-10 flex justify-center">
        <SingleBanner banner="https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2026/FEBRUARY/26/VUKUZgUj_b4dda5139af545218f9aea110ab7b12e.jpg" />
      </div>

      <div className="max-w-7xl mt-3 mx-auto md:mt-10">
        {/* <FiveItemSlider brands={brands} /> */}
        <ItemSlider
          items={salesProduct}
          itemCountDesktop={5}
          itemCountMobile={2}
          renderItem={(product) => (
            <div className="relative">
              <img
                src={product.thumbnail}
                alt={product.slug}
                className="w-40 rounded-xl object-contain transition"
              />
            </div>
          )}
        />
      </div>

      {/* Banner 5 */}
      <div className="md:p-6 px-6 md:mt-10 flex justify-center">
        <SingleBanner banner="https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2026/FEBRUARY/26/VUKUZgUj_b4dda5139af545218f9aea110ab7b12e.jpg" />
      </div>

      <DisplayCardGrid products={displayProducts} />

      <h1 className="text-center mt-8 text-3xl font-semibold">
        Trending Products
      </h1>

      {/* Reels Section */}
      <ReelsSlider reels={reels} />

      {/* Address Section */}

      <div
        className={
          "mt-10 h-[70vh] bg-gray-300 flex flex-row items-center justify-center md:justify-between " +
          josefin.className
        }
      >
        <div className=" w-[80vw] sm:w-90 md:w-110 mx-5 md:mx-10 px-10 py-7 flex flex-col gap-5">
          <h1 className="text-xl md:text-2xl font-meduim">"Kalyani Hosiery"</h1>
          <p className="text-sm md:text-lg">
            Kalyani Hosiery <br />
            Sir Lakhajiraj Main Road <br />
            Near Shalimar Complex <br />
            Opposite Prahlad cinema <br />
            Rajkot Gujrat
          </p>
          <p className="text-sm md:text-lg">
            Mon - Sat, 10:00 AM TO 9:00 PM <br />
            Sunday, 11:00 AM TO 5:00 PM
          </p>
          <a
            href="/"
            className="text-white bg-black inline-block w-[50%] text-center py-2 px-2 mb-3"
          >
            GET DIRECTION
          </a>
        </div>
        <img
          src="/brand-img.PNG"
          alt=""
          className="hidden md:flex md:w-[30vw] mr-10"
        />
      </div>

      {/* Footer */}

      <div className="w-full bg-black flex flex-col md:flex-row py-10 md:px-30 gap-20">
        <div className="flex flex-col gap-5 items-center md:items-start">
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

        <div className="flex flex-col gap-5 items-center md:items-start">
          <span className="text-white text-xl">CUSTMOR SERVICE</span>
          <ul className="text-white flex flex-col gap-2">
            <li className="hover:underline">
              <a href="/aboutus">About Us</a>
            </li>
            <li className="hover:underline">
              <a href="/search">Search</a>
            </li>
            <li className="hover:underline">
              <a href="/contactus">Contact Us</a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-5 items-center md:items-start">
          <span className="text-white text-xl">POLICIES</span>
          <ul className="text-white flex flex-col gap-2">
            <li className="hover:underline">
              <a href="/policy/privacy">Privacy Policys</a>
            </li>
            <li className="hover:underline">
              <a href="/policy/return">Return & Exchange</a>
            </li>
            <li className="hover:underline">
              <a href="/policy/shipping">Shipping Policy</a>
            </li>
            <li className="hover:underline">
              <a href="/policy/service">Terms Of Service</a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-5 h-[35vh] md:w-[20vw] px-10 md:px-0">
          <div className="h-[30%] w-full flex items-center gap-5 justify-end text-white px-5">
            <FaInstagram size={35} />
            <FaYoutube size={35} />
            <FaWhatsapp size={35} />
          </div>
          <span className="text-white text-right">
            &copy; 2026 Kalyani Hosiery, RAJKOT
          </span>
        </div>
      </div>
    </>
  );
}
