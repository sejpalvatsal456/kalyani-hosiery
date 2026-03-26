import { IDisplayProduct } from "@/lib/typeDefinitions"
import ProductCard from "./DisplayCard"
import DisplayCard from "./DisplayCard"

export interface IProductCard {
  id: string
  brand: string
  name: string
  image: string
  price: number
  originalPrice: number
  discount: number
}

export function mapProductToCard(product: IDisplayProduct): IProductCard {
  
  const variant = product.varients[0]
  const size = variant.sizes[0]

  return {
    id: product._id || "",
    brand: product.brandName,
    name: product.productName,
    image: variant.imgLinks[0] || product.thumbnail,
    price: size.sellingPrice,
    originalPrice: size.mrp,
    discount: size.discountPercent
  }
}

export default function DisplayCardGrid({ products }: { products: IDisplayProduct[] }) {
  
  const cards = products.map(mapProductToCard)

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-4 mt-4 place-items-center">
      {products.map((product) => (
        <DisplayCard key={product._id} product={product} />
      ))}
    </div>
  )
}