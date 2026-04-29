import { connectDB } from "@/lib/connectDB";
import { Product } from "@/lib/models";
import { IProduct } from "@/lib/typeDefinitions";
import { NextRequest, NextResponse } from "next/server";

interface IItems {
  productId: string;
  sku: string;
  quantity: number;
  colorId?: string;
  sizeId?: string;
}

const resolveVariant = (product: IProduct, item: IItems) => {
  return product.varients.find((v) => v.sku === item.sku);
};

const getTotalMRP = (products: IProduct[], items: IItems[]) => {
  return products.reduce((sum, product, index) => {
    const item = items[index];
    const selectedVariant = item ? resolveVariant(product, item) : undefined;
    return sum + ((selectedVariant?.mrp ?? 0) * (item?.quantity ?? 0));
  }, 0);
};

const getTotalSellingPrice = (products: IProduct[], items: IItems[]) => {
  return products.reduce((sum, product) => {
    const item = items.find((i) => i.productId === product._id?.toString());
    const selectedVariant = item ? resolveVariant(product, item) : undefined;
    return sum + ((selectedVariant?.sellingPrice ?? 0) * (item?.quantity ?? 0));
  }, 0);
};

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

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();
    const { items } = (await req.json()) as { items: IItems[] };

    const productIds = items.map((i: IItems) => i.productId);

    const products = (await Product.find({
      _id: { $in: productIds },
    })) as IProduct[];

    const payload = {
      length: items.length,
      totalMRP: getTotalMRP(products, items),
      totalSellingPrice: getTotalSellingPrice(products, items),
    };

    return NextResponse.json(payload);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { msg: "Internal Serveer Error" },
      { status: 500 },
    );
  }
};
