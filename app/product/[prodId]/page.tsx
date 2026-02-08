import ProductOverview from '@/app/_components/ProductOverview';
import { ProductDataType, ProductOverviewType } from '@/lib/typeDefinitions';

const productData:ProductOverviewType = {
  _id: "3",
  title: "T Shirts",
  subtitle: "Subtitle...............",
  category: {
    _id: "1",
    name: "Men"
  },
  subcategory: {
    _id: "2",
    categoryId: "1",
    name: "T Shirt"
  },
  variety: [
    {
      id: "1",
      color: "9e846d",
      imgLinks: ["https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/MAY/31/tlOSHE7H_ae3c96e82f9f4515b46b452418cc83f3.jpg"],
      sizes: [
        { size: "XS", stock: 10, mrp: 250, sellingPrice: 200 },
        { size: "S", stock: 10, mrp: 250, sellingPrice: 200 },
        { size: "L", stock: 10, mrp: 250, sellingPrice: 200 },
        { size: "XL", stock: 10, mrp: 300, sellingPrice: 250 },
        { size: "XXL", stock: 10, mrp: 300, sellingPrice: 250 },
      ]
    },
    {
      id: "2",
      color: "956743",
      imgLinks: ["https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/JUNE/10/4duT7YRL_1bc6681414a14f1d9f5bfdf2f492c68c.jpg"],
      sizes: [
        { size: "XS", stock: 10, mrp: 250, sellingPrice: 200 },
        { size: "S", stock: 10, mrp: 250, sellingPrice: 200 },
        { size: "L", stock: 0, mrp: 250, sellingPrice: 200 },
        { size: "XL", stock: 10, mrp: 300, sellingPrice: 250 },
      ]
    }
  ],
  desc: [
    { key: "Cloth Material", value: "Cotton" },
    { key: "Cloth Material", value: "Cotton" },
    { key: "Cloth Material", value: "Cotton" },
  ]
}

export default async function page(
  { params } : { params: Promise<{ prodId: string }> }
) {

  const { prodId } = await params;

  return (
    <ProductOverview productData={productData} prodId={prodId} />
  )
}
