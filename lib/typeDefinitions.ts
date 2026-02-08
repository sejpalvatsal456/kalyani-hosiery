export type navLinksDataType = {
  name: string;
  tag: string;
};

// const productData = {
//   title: "T Shirts",
//   price: 200,
//   mrp: 250,
//   subtitle: "Subtitle...............",
//   colors: ["9e846d", "956743"],
//   sizes: [ "XS", "S", "L", "XL", "XXL" ],
//   links: [
//     "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/MAY/31/tlOSHE7H_ae3c96e82f9f4515b46b452418cc83f3.jpg",
//     "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/JUNE/10/4duT7YRL_1bc6681414a14f1d9f5bfdf2f492c68c.jpg"
//   ],
//   desc: [
//     { key: "Cloth Material", value: "Cotton" },
//     { key: "Cloth Material", value: "Cotton" },
//     { key: "Cloth Material", value: "Cotton" },
//   ]
// }

const productData = {
  title: "T Shirts",
  price: 200,
  mrp: 250,
  subtitle: "Subtitle...............",
  varitey: [
    {
      color: "9e846d",
      link: "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/MAY/31/tlOSHE7H_ae3c96e82f9f4515b46b452418cc83f3.jpg",
      sizes: [
        { size: "XS", stock: 10 },
        { size: "S", stock: 10 },
        { size: "L", stock: 10 },
        { size: "XL", stock: 10 },
        { size: "XXL", stock: 10 },
      ],
    },
    {
      color: "956743",
      link: "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/JUNE/10/4duT7YRL_1bc6681414a14f1d9f5bfdf2f492c68c.jpg",
      sizes: [
        { size: "XS", stock: 10 },
        { size: "S", stock: 10 },
        { size: "L", stock: 10 },
        { size: "XL", stock: 10 },
      ],
    },
  ],
  thumbnail:
    "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/MAY/31/tlOSHE7H_ae3c96e82f9f4515b46b452418cc83f3.jpg",
  desc: [
    { key: "Cloth Material", value: "Cotton" },
    { key: "Cloth Material", value: "Cotton" },
    { key: "Cloth Material", value: "Cotton" },
  ],
};

export type Category = {
  _id: string;
  name: string; // Like Men, Women, Kids
};

export type SubCategory = {
  _id: string;
  categoryId: string;
  name: string; // Like Shirt, Tshirt, etc
};

export type ProductDataType = {
  _id: string;
  title: string;
  subtitle: string;
  categoryId: string;
  subcategoryId: string;
  thumbnail: string;
  variety: {
    id: string;
    color: string;
    imgLinks: string[];
    sizes: { size: string; stock: number; mrp: number; sellingPrice: number; }[];
  }[];
  desc: { key: string; value: string }[];
};

export type DisplayProductType = Omit<ProductDataType, "variety"|"categoryId"|"subcategoryId"|"desc"> & { category: Category, subcategory: SubCategory };
export type ProductOverviewType = Omit<ProductDataType, "categoryId"|"subcategoryId"|"thumbnail"> & { category: Category, subcategory: SubCategory };
