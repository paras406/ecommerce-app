"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch } from "@/lib/hooks/store";
import { removeFromCart, setQuantity } from "@/lib/actions/cart";
import type { CartItem } from "@/lib/types/cart";

function CartLineItem({ item }: { item: CartItem }) {
  const dispatch = useAppDispatch();

  return (
    <li className="flex items-center gap-4 py-4">
      <div className="relative h-20 w-20 shrink-0 rounded bg-neutral-100 dark:bg-neutral-800">
        <Image
          src={item.thumbnail}
          alt={item.title}
          fill
          sizes="80px"
          className="object-contain"
        />
      </div>

      <div className="min-w-0 flex-1">
        <Link
          href={`/products/${item.id}`}
          className="line-clamp-1 font-medium hover:underline"
        >
          {item.title}
        </Link>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          ${item.price.toFixed(2)} each
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label={`Decrease quantity of ${item.title}`}
          onClick={() =>
            dispatch(setQuantity({ id: item.id, quantity: item.quantity - 1 }))
          }
          className="h-8 w-8 rounded border border-black/15 hover:bg-neutral-100 dark:border-white/15 dark:hover:bg-neutral-800"
        >
          −
        </button>
        <span className="w-8 text-center tabular-nums">{item.quantity}</span>
        <button
          type="button"
          aria-label={`Increase quantity of ${item.title}`}
          onClick={() =>
            dispatch(setQuantity({ id: item.id, quantity: item.quantity + 1 }))
          }
          className="h-8 w-8 rounded border border-black/15 hover:bg-neutral-100 dark:border-white/15 dark:hover:bg-neutral-800"
        >
          +
        </button>
      </div>

      <p className="w-20 text-right font-semibold tabular-nums">
        ${(item.price * item.quantity).toFixed(2)}
      </p>

      <button
        type="button"
        aria-label={`Remove ${item.title} from cart`}
        onClick={() => dispatch(removeFromCart(item.id))}
        className="text-sm text-red-600 hover:underline dark:text-red-400"
      >
        Remove
      </button>
    </li>
  );
}

export default memo(CartLineItem);
