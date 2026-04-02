"use client";

import Image from "next/image";
import Navbar from "../_components/Navbar";
import { ItemsType, IUser } from "@/lib/typeDefinitions";
import { FormEvent, useEffect, useState } from "react";
import CartItem from "../_components/CartItem";
import Script from "next/script";

type CartItemType = {
  productId: string;
  brand: string;
  title: string;
  thumbnail: string;
  color: string;
  size: string;
  mrp: number;
  sellingPrice: number;
  stock?: number;
  quantity: number;
};

export default function CartPage() {
  const [user, setUser] = useState<IUser | null>(null);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const toggleSelection = (productId: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);

      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }

      return next;
    });
  };

  const selectedTotal = cartItems
    .filter((item) => selectedIds.has(item.productId))
    .reduce((sum, item) => sum + (item.sellingPrice ?? 0) * item.quantity, 0);

  const allSelected = selectedIds.size === cartItems.length;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(cartItems.map((i) => i.productId)));
    }
  };

  const updateQuantity = (productId: string, newQty: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity: newQty } : item,
      ),
    );
  };

  const onDeleteItem = async (id: string) => {
    const res = await fetch("/api/cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: id }),
    });
    const data = await res.json();
    if (!res.ok) {
      alert(data.msg);
      return;
    }
    setCartItems(cartItems.filter((item) => item.productId !== id));
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("/api/cart");
        const data = await res.json();
        console.log(data.data);
        setCartItems(data.data);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handlePlaceOrder = async (e: FormEvent) => {
    e.preventDefault();

    const items: ItemsType[] = cartItems.map((item) => {
      return {
        productId: item.productId,
        name: item.title,
        color: item.color,
        size: item.size,
        price: item.sellingPrice,
        quantity: item.quantity,
      };
    });

    const res = await fetch("/api/createOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: selectedTotal, items: items }),
    });
    const data = await res.json();
    if (!res.ok) {
      alert(data.msg);
      return;
    }
    console.log(data);
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: data.razorpayOrder.amount,
      currency: data.razorpayOrder.currency,
      name: "Your Store",
      description: "Order Payment",
      order_id: data.razorpayOrder.id,

      handler: async function (response: any) {
        // 4️⃣ Verify Payment
        const verifyRes = await fetch("/api/verifyOrder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(response),
        });

        const verifyData = await verifyRes.json();

        if (verifyData.success) {
          alert("Payment Successful 🎉");
          // Redirect to success page
          cartItems.forEach(async (item) => {
            await fetch("/api/cart/", {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ productId: item.productId }),
            });
            if (res.ok) {
              setCartItems(
                cartItems.filter((item) => item.productId !== item.productId),
              );
            }
          });
        } else {
          alert("Payment verification failed");
        }
      },

      modal: {
        ondismiss: function () {
          console.log("Payment popup closed");
        },
      },

      theme: {
        color: "#000000",
      },
    };

    const payment = new (window as any).Razorpay(options);
    payment.open();
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
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
        <Script
          type="text/javascript"
          src="https://checkout.razorpay.com/v1/checkout.js"
        />
        <div className="w-full md:w-[90%] h-[90%] py-5 px-3 md:px-10 border-1 border-gray-300 shadow-lg overflow-y-scroll">
          <h1 className="ml-2 md:ml-0 text-xl font-semibold">Cart</h1>
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
          <div className="flex flex-col gap-10 mt-3">
            {cartItems.length === 0 && (
              <p className="text-gray-500">Your cart is empty.</p>
            )}

            {cartItems.map((item, key) => (
              <CartItem
                key={item.productId}
                productId={item.productId}
                image={item.thumbnail}
                brand={item.brand}
                title={item.title}
                seller={item.brand}
                size={item.size ?? ""}
                quantity={item.quantity}
                price={item.sellingPrice ?? 0}
                originalPrice={item.mrp ?? 0}
                isSelected={selectedIds.has(item.productId)}
                onSelect={() => toggleSelection(item.productId)}
                onQuantityChange={(qty) => updateQuantity(item.productId, qty)}
                onDeleteItem={onDeleteItem}
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
