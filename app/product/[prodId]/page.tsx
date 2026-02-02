import Navbar from '@/app/_components/Navbar';
import ProductDesc from '@/app/_components/ProductDesc';

const productData = {
  title: "T Shirts",
  price: 200,
  mrp: 250,
  subtitle: "Description...............",
  colors: ["232323", "ff470f", "efff43"]
}

export default async function page(
  { params } : { params: Promise<{ prodId: number }> }
) {

  const { prodId } = await params;

  return (
    <div className='h-[100vh] w-[100vw] mt-10 flex justify-evenly'>
      
      {/* Photo Privews */}
      <div className='w-[45vw] h-full bg-red-200'>

      </div>

      {/* Product Desciption */}
      <ProductDesc productData={productData} />
      
    </div>
  )
}
