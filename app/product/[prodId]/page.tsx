
import ProductOverview from '@/app/_components/ProductOverview';

const productData = {
  title: "T Shirts",
  price: 200,
  mrp: 250,
  subtitle: "Description...............",
  colors: ["9e846d", "956743"],
  sizes: [ "XS", "S", "L", "XL" ],
  links: [
    "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/MAY/31/tlOSHE7H_ae3c96e82f9f4515b46b452418cc83f3.jpg",
    "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/JUNE/10/4duT7YRL_1bc6681414a14f1d9f5bfdf2f492c68c.jpg"
  ]
}

export default async function page(
  { params } : { params: Promise<{ prodId: number }> }
) {

  const { prodId } = await params;

  return (
    <ProductOverview productData={productData} />
  )
}
