# 📖 Overview

This document provides a high-level summary of how the `sdl` (single dataLayer) approach works.

## 🔍 Purpose

`sdl` consolidates all analytics and tracking data into one centralized structure (`window.sdl`) to reduce complexity and improve performance across platforms and brands.

## 🧠 Key Concepts

- **Single source of truth** for all frontend events
- **Predictable structure**: root data + event-specific payload
- **Event-driven** design that supports client and system activity
- **Seamless integration** with GTM and server-side solutions

## 🔧 Key Components

| Component | Purpose |
|----------|---------|
| `event` | Name used by GTM triggers |
| `screen` | Page context |
| `user.*` | User interactions |
| `system.*` | Technical/system events |
| `client`, `session`, `server`, `order` | Root context |

## ✍️ Example

```js
sdl.push({
  event: "user.buy.products",
  user: {
    download: {
      products: [
        { 
          sku: "XYZ", 
          price: 0, 
          brand: "avast" 
        }
      ]
    }
  }
});
```

## 🧰 Who Is It For?

- Developers implementing or maintaining tracking
- Analysts reading or validating data
- Marketers needing consistent naming

## 🌐 Technology Stack

- JavaScript (ES5 compatible)
- Google Tag Manager


---

👉 For technical implementation, see [sdl-core.md](sdl-core.md)
