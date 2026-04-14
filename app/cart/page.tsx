"use client";

import Image from "next/image";
import Navbar from "../_components/Navbar";
import { ItemsType, IUser } from "@/lib/typeDefinitions";
import { FormEvent, useEffect, useState } from "react";
import CartItem from "../_components/CartItem";
import Script from "next/script";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

type CartItemType = {
  productId: string;
  brand: string;
  title: string;
  thumbnail: string;
  color: string;
  colorId: string;
  size: string;
  sizeId: string;
  mrp: number;
  sellingPrice: number;
  sku: string;
  stock?: number;
  quantity: number;
};

// TODO: When user clicks to place order, if address is not given then send them to /addAddress and then to /checkout, else directly to /checkout

export default function CartPage() {
  const [user, setUser] = useState<IUser | null>(null);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const toggleSelection = (sku: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);

      if (next.has(sku)) {
        next.delete(sku);
      } else {
        next.add(sku);
      }

      return next;
    });
  };

  const selectedTotal = cartItems
    .filter((item) => selectedIds.has(item.sku)) // ✅ use sku
    .reduce((sum, item) => sum + item.sellingPrice * item.quantity, 0);

  const allSelected =
    selectedIds.size === cartItems.length && cartItems.length !== 0;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(cartItems.map((i) => i.sku))); // ✅ sku
    }
  };

  const updateQuantity = (sku: string, newQty: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.sku === sku ? { ...item, quantity: newQty } : item,
      ),
    );
  };

  const onDeleteItem = async (sku: string) => {
    const res = await fetch("/api/cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sku }), // ✅ send sku instead
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.msg);
      return;
    }

    setCartItems((prev) => prev.filter((item) => item.sku !== sku)); // ✅
  };

  const handlePlaceOrder = async (e: FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    const items = cartItems
      .filter((item) => selectedIds.has(item.sku)) // ✅
      .map((item) => ({
        productId: item.productId,
        color: item.color,
        colorId: item.colorId,
        size: item.size,
        sizeId: item.sizeId,
        sku: item.sku,
        price: item.sellingPrice,
        quantity: item.quantity,
      }));

     if(!user){
      router.push('/auth/login');
      return;
    }

    const res = await fetch('/api/orders', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: items })
    });

    const data = await res.json();

    if(!res.ok) {
      alert(data.msg);
      return;
    }

    if(!user.address){
      router.push('/addAddress/');
      return;
    }

    router.push('/checkout/');
    

    // const payload = { amount: selectedTotal, items: items };
    // console.log("Payload: ");
    // console.log(payload);

    // const res = await fetch("/api/createOrder/", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(payload),
    // });

    // const data = await res.json();

    // if (!res.ok) {
    //   alert("Error in API response");
    //   setIsLoading(false);
    //   return;
    // }

    // const redirectUrl = data?.data?.instrumentResponse?.redirectInfo?.url;
    // if (redirectUrl) window.location.href = redirectUrl;

    setIsLoading(false);
    alert(`Payment of ₹${selectedTotal} initiated successfully!`);
  };

  

  useEffect(() => {
    const status = sessionStorage.getItem("paymentStatus");
    if(!status) return;
    console.log(status);

    if (status === "success") {
      toast.success("Payment Successful");
    }

    if (status === "failed") {
      toast.error("Payment Failed");
    }

    // 🧹 clear after showing
    sessionStorage.removeItem("paymentStatus");
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("/api/cart");
        const data = await res.json();
        // debugging shit
        // console.log("Data from API: ");
        // console.log(data.data);
        setCartItems(data.data);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        displayNavLinks={false}
        categories={null}
        activePage={null}
        setPage={() => {}}
        search={search}
        setSearch={setSearch}
        user={user}
        setUser={setUser}
      />
      <div className="flex h-full items-center justify-center">
        <Toaster />
        <div className="w-full md:w-[90%] h-[90%] py-5 px-3 md:px-10 border-1 border-gray-300 shadow-lg overflow-y-scroll">
          <h1 className="ml-2 md:ml-0 text-xl font-semibold">Cart</h1>
          {cartItems.length > 0 && (
            <div className="mt-10 ml-2 md:ml-0 flex flex-row gap-5">
              <input
                type="checkbox"
                className="scale-[1.4]"
                checked={allSelected}
                onChange={toggleSelectAll}
              />
              <span className="text-lg font-medium">
                {selectedIds.size}/{cartItems.length} Selected Items
              </span>
            </div>
          )}
          <div className="flex flex-col gap-10 mt-3">
            {cartItems.length === 0 && (
              <p className="text-gray-500">Your cart is empty.</p>
            )}

            {cartItems.map((item, key) => (
              <CartItem
                key={item.sku} // ✅ IMPORTANT (not index)
                productId={item.productId}
                image={item.thumbnail}
                brand={item.brand}
                title={item.title}
                seller={item.brand}
                size={item.size ?? ""}
                quantity={item.quantity}
                price={item.sellingPrice ?? 0}
                originalPrice={item.mrp ?? 0}
                isSelected={selectedIds.has(item.sku)} // ✅
                onSelect={() => toggleSelection(item.sku)} // ✅
                onQuantityChange={(qty) => updateQuantity(item.sku, qty)} // fix below
                onDeleteItem={() => onDeleteItem(item.sku)} // fix below
              />
            ))}
          </div>
          <div className="mt-8 text-left text-xl font-semibold">
            Total: ₹{selectedTotal.toLocaleString()}
          </div>
          <button
            onClick={handlePlaceOrder}
            className="bg-[#ff3f6c] w-full py-3 text-white font-semibold text-lg cursor-pointer mt-5"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
