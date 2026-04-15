import { connectDB } from "@/lib/connectDB";
import { Product } from "@/lib/models";
import { ICart, IProduct } from "@/lib/typeDefinitions";
import { NextRequest, NextResponse } from "next/server";
import { MdProductionQuantityLimits } from "react-icons/md";

interface IItems {
  productId: string;
  colorId: string;
  sizeId: string;
  sku: string;
  quantity: number;
}

const getTotalMRP = (products: IProduct[], items: IItems[]) => {
  let sum = 0;
  products.forEach((product, key) => {
    const selectVarient = product.varients.find(
      (v) => v.colorID == items[key].colorId
    );
    const selectedSize = selectVarient?.sizes.find(
      (s) => s.sizeID === items[key].sizeId
    );
    
    sum += (selectedSize?.mrp || 0)*items[key].quantity;
  });

  return sum;
}

const getTotalSellingPrice = (products: IProduct[], items: IItems[]) => {
  let sum = 0;
  products.forEach((product, key) => {
    const selectVarient = product.varients.find(
      (v) => v.colorID == items[key].colorId
    );
    const selectedSize = selectVarient?.sizes.find(
      (s) => s.sizeID === items[key].sizeId
    );
    const item = items.find(
      (i) => i.productId === product._id?.toString()
    );
    console.log(product._id === items[0].productId)
    console.log(item)
    console.log({selectedSize, quantity: item?.quantity});
    sum += (selectedSize?.sellingPrice || 0)*(item?.quantity || 0);
  });

  return sum;
}

// const cartItems = user.cart.map((item: any) => {
//   const product = item.productId;
//   console.log(product);

//   const selectedVarient = product.varients.find(
//     (v: any) => v.colorID === item.colorId,
//   );

//   const selectedSize = selectedVarient?.sizes.find(
//     (s: any) => s.sizeID === item.sizeId,
//   );

//   return {
//     productId: product._id,
//     brand: product.brandId.brandName,
//     title: product.productName,
//     thumbnail: product.thumbnail,
//     color: selectedVarient?.colorCode,
//     colorId: selectedVarient?.colorID,
//     size: selectedSize?.sizeName,
//     sizeId: selectedSize?.sizeID,
//     mrp: selectedSize?.mrp,
//     sellingPrice: selectedSize?.sellingPrice,
//     sku: selectedSize?.sku,
//     stock: selectedSize?.stock,
//     quantity: item.quantity, // Add quantity in cart schema later
//   };
// });

export const POST = async(req: NextRequest) => {
  try {
    
    await connectDB();
    const { items } = await req.json() as { items: IItems[] };

    const productIds = items.map((i:IItems) => i.productId);

    const products = await Product.find({
      _id: { $in: productIds }
    }) as IProduct[];

    const payload = {
      length: items.length,
      totalMRP: getTotalMRP(products, items),
      totalSellingPrice: getTotalSellingPrice(products, items)
    }

    return NextResponse.json(payload);

  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { msg: "Internal Serveer Error" },
      { status: 500 }
    )
  }
}