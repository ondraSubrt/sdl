# 🧩 single-data-layer (sdl)

A unified, scalable, and structured approach to collecting event and context data across websites.

## 📌 What is `sdl`?

The `sdl` (single dataLayer) is a consistent JavaScript-based data structure used to:
- Standardize event naming and context across brands and pages
- Simplify integration with GTM and server-side tagging solutions
- Speed up websites and streamline analytics tracking

## 🚀 Why use `sdl`?

✅ Predictable naming convention  
✅ Lightweight GTM configuration  
✅ Faster load times  
✅ Easier debugging and documentation  
✅ Improved privacy and consent handling  
✅ Easier migration to server-side tagging  

## 📁 Repository Structure

This repository contains:

- `README.md` — Project overview and entry point
- `docs/overview.md` — Strategic goals, motivations, and background
- `docs/sdl-core.md` — Core implementation, naming conventions, push examples
- `docs/events/` — One file per tracked event (e.g. `user.download.products.md`)
- `docs/gtm/` — GTM integration, triggers, and configuration
- `docs/architecture/` — How `sdlHub`, `mhub`, and server-side flows work
- `assets/` — Visuals like diagrams, exports, or helper screenshots

# Why `sdl` (single dataLayer) Works — And When It Doesn’t

## ✅ The Strengths

### 1. Clear, Structured, and Predictable
`sdl` turns tracking into a **structured protocol**. Events follow a consistent schema:
- `event`: always present
- Contextual data like `screen`, `user.download.products`, etc.
- Reusable data in `client`, `session`, `server`, `screen` blocks

This makes tracking **predictable, analyzable, and scalable**.

---

### 2. Visibility Across Roles
- **Developers** know what to send and when — guided by documentation
- **GTM & Tracking Architects** build logic based on clear event names and parameters
- **Analysts & Business** see clean data in their tools

📌 The analyst (you) acts as the **bridge** between worlds — turning business needs into a tracking structure, validating implementation, and optimizing delivery.

---

### 3. Events as Meaningful Signals
`sdl` events aren’t just raw actions — they’re **semantic events**.

Instead of guessing what “click on button X” means, you define:
- `event: user.buy.products`
- ...with proper context (product ID, price, currency, etc.)

This makes reporting **simpler**, **cleaner**, and **cross-platform compatible**.

---

### 4. Debug-Friendly
When an event is pushed to `window.sdl`, you **see it immediately** in:
- DevTools console
- GTM preview/debug
- Network requests (if forwarded)
- Your `sdlHub` validator

You *know* the event left the page. If it’s missing in GA or a pixel, the issue is downstream — and that gives you clarity when debugging.

---

### 5. GTM Logic Is Clean
GTM doesn’t need to scrape the DOM or guess what happened. It just listens:
```js
window.sdl.push({ event: "user.download.products", ... });
```

## 🛠 Quick Start

```html
<!-- 1. Init -->
<script>window.sdl = window.sdl || [];</script>

<!-- 2. GTM snippet with custom layer name -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','sdl','GTM-XXXXXXX');</script>
```

Then push events like:

```js
sdl.push({ 
    event: "screen", 
    screen: { 
        name: "BillingInfo", 
        type: "checkout" 
    } 
});
```

## 👥 Contributors

Maintained by by Ondřej Šubrt.

---

---

## 📚 Documentation

- [Overview](docs/overview.md) – strategic goals, motivations, value
- [sdl Core](docs/sdl-core.md) – implementation structure, examples, and guidelines
