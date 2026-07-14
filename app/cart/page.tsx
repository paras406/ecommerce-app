"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/store";
import {
  selectCartCount,
  selectCartItems,
  selectCartTotal,
} from "@/lib/store";
import { clearCart } from "@/lib/actions/cart";
import CartLineItem from "./CartLineItem";

export default function CartPage() {
  const items = useAppSelector(selectCartItems);
  const count = useAppSelector(selectCartCount);
  const total = useAppSelector(selectCartTotal);
  const dispatch = useAppDispatch();

  // Cart contents come from localStorage after hydration; render after mount
  // so the server-rendered empty state doesn't mismatch.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <p className="text-neutral-500 dark:text-neutral-400">
          Browse the catalog and add something you like.
        </p>
        <Link
          href="/"
          className="rounded-lg bg-amber-500 px-6 py-2.5 font-semibold text-white hover:bg-amber-600"
        >
          Shop products
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-2 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Cart</h1>
        <button
          type="button"
          onClick={() => dispatch(clearCart())}
          className="text-sm text-neutral-500 hover:underline dark:text-neutral-400"
        >
          Clear cart
        </button>
      </div>

      <ul className="divide-y divide-black/10 dark:divide-white/10">
        {items.map((item) => (
          <CartLineItem key={item.id} item={item} />
        ))}
      </ul>

      <div className="mt-6 ml-auto w-full max-w-sm rounded-lg border border-black/10 p-4 dark:border-white/10">
        <div className="flex justify-between text-sm text-neutral-600 dark:text-neutral-300">
          <span>Total items</span>
          <span className="tabular-nums">{count}</span>
        </div>
        <div className="mt-2 flex justify-between text-lg font-bold">
          <span>Total</span>
          <span className="tabular-nums">${total.toFixed(2)}</span>
        </div>
      </div>
    </>
  );
}
