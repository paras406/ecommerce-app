# DummyShop — Ecommerce Assignment

A simple ecommerce web app built with **Next.js (App Router) + TypeScript + Tailwind CSS**, using the [DummyJSON](https://dummyjson.com) API. Product list, product detail, and a persistent cart.

## Running locally

```bash


npm run dev
```

Open http://localhost:3000. For a production build:

```bash
npm run build
npm start
```

## Pages

| Route | Description |
|---|---|
| `/` | Product grid (image, title, price, rating); cards link to detail |
| `/products/[id]` | Title, main image, description, price, discount %, rating, add to cart |
| `/cart` | Line items with quantity controls and remove, total item count, total price |

A sticky header shows the site name, Home/Cart navigation, and a cart icon with a live item-count badge.

## Thought process

- **Server data in Server Components.** The product list and detail pages are React Server Components that fetch from DummyJSON on the server with ISR (`revalidate: 300`). Content is in the first HTML response, which helps LCP/FCP, SEO, and deeplinks/refreshes — no client-side data fetching for primary content.
- **Redux Toolkit for client state only.** The cart is the only truly client-side state, held in a Redux store created per-request via a client `StoreProvider`. Server Components never touch the store.
- **Cart persistence.** A small subscriber writes cart changes to `localStorage` and rehydrates on load — no extra dependency. Cart UI (badge, cart page) renders after mount to avoid SSR hydration mismatches, since the server can't know localStorage contents.
- **Component structure.** Shared UI (`Header`, `ProductCard`, `Rating`, `AddToCartButton`, `StoreProvider`) lives in `components/`; route-specific pieces (e.g. `CartLineItem`) sit next to their route.
- **Performance details.** `next/image` everywhere (first grid row gets `priority` as the likely LCP element, the rest lazy-load), `next/font` for fonts, `preconnect` to the DummyJSON CDN, and effect/subscription cleanup to avoid leaks.

## Trade-offs

- **No pagination or search** — the home page shows DummyJSON's default first page (30 products). With a full catalog I'd add pagination or infinite scroll, and virtualise the long list (render only visible items plus a buffer). For 30 server-rendered items, virtualisation would hurt LCP/SEO for no memory benefit.
- **Discounted price shown on detail page only** — the list shows the base price, matching the assignment spec.
- **Quantity is managed in the cart** — the detail page's "Add to cart" increments by one; quantities are edited on the cart page.
- **`localStorage` over cookies/server sessions** — simplest persistence that satisfies "persist within the session"; the cart also survives full reloads.

## Known limitations

- DummyJSON is mock data; there is no real checkout, auth, or inventory.
- Cart is per-browser (localStorage), not synced across devices.
- Star rating is a simple visual approximation (half-star rendered as "½").
