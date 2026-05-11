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
import Footer from "./_components/Footer";

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

interface BannerItem {
  _id: string;
  url: string;
  slot: string;
  order: number;
  variant: "carousel" | "single";
}

interface BannerResponse {
  [key: string]: {
    variant: "carousel" | "single";
    items: BannerItem[];
  };
}

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
  const [banners, setBanners] = useState<BannerResponse | null>(null);

  const [reels, setReels] = useState<ReelItem[]>([]);

  // Fetch the brand data

  useEffect(() => {
    fetch("/api/brands/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("Brand data from API: ");
        // console.log(data);
        setBrands(data);
      })
      .catch((err) => console.log(err));

    // Men - #b6d7fc
    // Women - #fcb6c5
    /// Kids - #fcb6b6
    // Sales - #fcecb6

    fetch("/api/categories/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("Category Data from API: ");
        // console.log(data);
        setCategories(data);
        setPage(data[0]);
      })
      .catch((err) => console.log(err));

    fetch("/api/media?type=banner")
      .then((res) => res.json())
      .then((data) => {
        console.log("Banner Data:");
        console.log(data);

        setBanners(data);
      })
      .catch((err) => console.log(err));

    fetch("/api/media?type=reel")
      .then((res) => res.json())
      .then((data) => {
        const formatted: ReelItem[] = data.map((item: any) => ({
          id: item._id,
          videoUrl: item.url,
        }));

        // Ensure at least 6 reels
        const minimumReels = 6;
        let finalReels = [...formatted];

        if (formatted.length > 0 && formatted.length < minimumReels) {
          let index = 0;

          while (finalReels.length < minimumReels) {
            finalReels.push({
              ...formatted[index % formatted.length],
              // unique id for React keys
              id: `${formatted[index % formatted.length].id}-${finalReels.length}`,
            });

            index++;
          }
        }

        setReels(finalReels);
      })
      .catch((err) => console.log(err));
  }, []);

  // Dev only - Fetch the categories data as per page state

  useEffect(() => {
    if (!page) return;
    fetch("/api/subcategories/categoryId/" + page._id, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        console.log("Subcategory Data from API:");
        console.log(data);
        setSubcategories(data);
      })
      .catch((err) => console.log(err));
  }, [page]);

  useEffect(() => {
    console.log(subcategories);
  }, [subcategories]);

  // Dev only category data as per page state

  // Dev only part - replace it when backend is completed
  const displayProducts: IDisplayProduct[] = [
    {
      _id: "1",
      brandId: {
        brandName: "Powerlook",
        brandLogo: "",
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
          sku: "sku1",
          colorName: "Orange",
          colorCode: "#ff5f1f",
          sizeName: "S",
          imgLinks: [
            "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
          ],
          stock: 10,
          mrp: 2999,
          sellingPrice: 670,
          discountPercent: 77,
        },
      ],
      tags: [],
      desc: [],
    },
    {
      _id: "2",
      brandId: {
        brandName: "Powerlook",
        brandLogo: "",
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
          sku: "sku1",
          colorName: "Orange",
          colorCode: "#ff5f1f",
          sizeName: "S",
          imgLinks: [
            "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
          ],
          stock: 10,
          mrp: 2999,
          sellingPrice: 670,
          discountPercent: 77,
        },
      ],
      tags: [],
      desc: [],
    },
    {
      _id: "3",
      brandId: {
        brandName: "Powerlook",
        brandLogo: "",
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
          sku: "sku1",
          colorName: "Orange",
          colorCode: "#ff5f1f",
          sizeName: "S",
          imgLinks: [
            "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
          ],
          stock: 10,
          mrp: 2999,
          sellingPrice: 670,
          discountPercent: 77,
        },
      ],
      tags: [],
      desc: [],
    },
    {
      _id: "4",
      brandId: {
        brandName: "Powerlook",
        brandLogo: "",
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
          sku: "sku1",
          colorName: "Orange",
          colorCode: "#ff5f1f",
          sizeName: "S",
          imgLinks: [
            "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
          ],
          stock: 10,
          mrp: 2999,
          sellingPrice: 670,
          discountPercent: 77,
        },
      ],
      tags: [],
      desc: [],
    },
    {
      _id: "5",
      brandId: {
        brandName: "Powerlook",
        brandLogo: "",
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
          sku: "sku1",
          colorName: "Orange",
          colorCode: "#ff5f1f",
          sizeName: "S",
          imgLinks: [
            "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
          ],
          stock: 10,
          mrp: 2999,
          sellingPrice: 670,
          discountPercent: 77,
        },
      ],
      tags: [],
      desc: [],
    },
    {
      _id: "6",
      brandId: {
        brandName: "Powerlook",
        brandLogo: "",
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
          sku: "sku1",
          colorName: "Orange",
          colorCode: "#ff5f1f",
          sizeName: "S",
          imgLinks: [
            "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
          ],
          stock: 10,
          mrp: 2999,
          sellingPrice: 670,
          discountPercent: 77,
        },
      ],
      tags: [],
      desc: [],
    },
    {
      _id: "7",
      brandId: {
        brandName: "Powerlook",
        brandLogo: "",
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
          sku: "sku1",
          colorName: "Orange",
          colorCode: "#ff5f1f",
          sizeName: "S",
          imgLinks: [
            "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
          ],
          stock: 10,
          mrp: 2999,
          sellingPrice: 670,
          discountPercent: 77,
        },
      ],
      tags: [],
      desc: [],
    },
    {
      _id: "8",
      brandId: {
        brandName: "Powerlook",
        brandLogo: "",
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
          sku: "sku1",
          colorName: "Orange",
          colorCode: "#ff5f1f",
          sizeName: "S",
          imgLinks: [
            "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
          ],
          stock: 10,
          mrp: 2999,
          sellingPrice: 670,
          discountPercent: 77,
        },
      ],
      tags: [],
      desc: [],
    },
    {
      _id: "9",
      brandId: {
        brandName: "Powerlook",
        brandLogo: "",
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
          sku: "sku1",
          colorName: "Orange",
          colorCode: "#ff5f1f",
          sizeName: "S",
          imgLinks: [
            "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
          ],
          stock: 10,
          mrp: 2999,
          sellingPrice: 670,
          discountPercent: 77,
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
        {banners?.hero?.items?.length ? (
          <BannerSlider
            banners={banners.hero.items.map((item, index) => ({
              id: index + 1,
              image: item.url,
              title: "",
              subtitle: "",
              cta: "",
            }))}
          />
        ) : null}
      </div>

      {/* Banner 2 */}
      <div className="md:p-6 px-6 md:mt-0 flex justify-center">
        {banners?.promo1.items[0].url && (
          <SingleBanner banner={banners.promo1.items[0].url} />
        )}
      </div>

      <div className="max-w-7xl mt-3 mx-auto md:mt-0">
        {/* <FiveItemSlider brands={brands} /> */}
        <ItemSlider
          items={brands}
          itemCountDesktop={5}
          itemCountMobile={3}
          renderItem={(brand) => (
            <img
              src={brand.brandLogo}
              alt={brand.brandName}
              onClick={(e) => router.push("/search?brand=" + brand.brandName)}
              className="w-20 h-20 md:w-30 md:h-30 object-contain rounded-lg transition shadow-xl cursor-pointer"
            />
          )}
        />
      </div>

      {/* Banner 3 */}
      <div className="md:p-6 px-6 md:mt-0 flex justify-center">
        {banners?.promo2.items[0].url && (
          <SingleBanner banner={banners.promo2.items[0].url} />
        )}
      </div>

      {/* Cateogries */}

      <div className="md:mt-0">
        <SubcategorySlider subCats={subcategories || []} />
      </div>

      {/* Banner 4 */}
      <div className="md:p-6 px-6 md:mt-0 flex justify-center">
        {banners?.promo3.items[0].url && (
          <SingleBanner banner={banners.promo3.items[0].url} />
        )}
      </div>

      <div className="max-w-7xl mt-3 mx-auto md:mt-0">
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
      <div className="md:p-6 px-6 md:mt-0 flex justify-center">
        <SingleBanner banner="https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2026/FEBRUARY/26/VUKUZgUj_b4dda5139af545218f9aea110ab7b12e.jpg" />
      </div>

      <DisplayCardGrid products={displayProducts} />

      <h1 className="text-center mt-8 text-3xl font-semibold">
        Trending Products
      </h1>

      {/* Reels Section */}
      {reels.length > 0 && (
        <ReelsSlider
          reels={reels}
        />
      )}

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

      <Footer />
    </>
  );
}
