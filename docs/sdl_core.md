# 🧩 Simple and General-Purpose Documentation for sdl (single dataLayer)

👉 For high-level context, see [overview.md](overview.md)


---

## 1. Concept

The `sdl` (single dataLayer) is a structured and unified JavaScript object that enables tracking and managing events and context data across websites. Instead of working with multiple tracking scripts, tag managers, and inconsistent data structures, sdl consolidates everything into a single, predictable format (`window.sdl`).

It’s used by Google Tag Manager (or other systems) to trigger tags, log user actions, and send data to various analytics and marketing platforms. The key idea is to create a robust foundation that:
- Minimizes duplication and complexity
- Unifies tracking across brands and platforms
- Reduces load time and improves maintainability

---

## 2. How It Works (Overview)

- `sdl` is initialized as a global array: `window.sdl = window.sdl || [];`
- Developers push event data to `sdl` using the `.push()` method
- A script in GTM or another TMS listens for new pushes to `sdl`
- Each event typically consists of two parts:
  - `event` (event name)
  - Contextual data (e.g., `user.download.products`, `screen`, `order`, etc.)
- When an event is pushed, its values are cached into an internal helper object (`sdlHub`) so GTM can reuse values efficiently

---

## 3. Naming Convention

Event names follow a structured pattern based on semantic logic:

### a) User Actions
Format: `user.action.subject`
Examples:
- `user.click.link`
- `user.download.products`
- `user.send.form`

### b) System Events
Format: `system.subject`
Examples:
- `system.error`
- `system.modal`
- `system.afterLoad`

This naming convention makes the data predictable, searchable, and easier to analyze.

---

## 4. Root Properties

These are static or contextual values sent at the start of the session or when the page loads. They include:

- `client` — consent ID, device ID, account status
- `session` — country code, platform, mobile flag, user-agent data
- `server` — backend provider, environment, data center
- `screen` — URL, locale, screen name, and other metadata
- `order` — order and cart data if applicable
- `consentGroups` — formatted consent group string (e.g. `C0001:1,C0002:1`)

These are pushed as objects, e.g.:
```js
sdl.push({
  client: { cmpId: "...", deviceId: "..." },
  session: { countryCode: "CZ", platform: "macOS" },
  ...
});
```

---

## 5. Example Events

### a) Screen Event (page or popup view)
```js
sdl.push({ event: "screen", 
  screen: { 
    name: "BillingInfo", 
    type: "checkout", ... 
  } 
});
```

### b) User Click on Download
```js
sdl.push({
  event: "user.download.products",
  user: {
    download: {
      products: [ 
        { 
          sku: "XYZ", 
          price: 0, 
          brand: "avast", 
          ... 
        } 
      ]
    }
  }
});
```

### c) System Modal Display
```js
sdl.push({
  event: "system.modal",
  system: { 
    modal: { 
      id: "popup1", 
      component: "cmp-popup" 
    } 
  }
});
```

---

## 6. GTM Integration and Caching in sdlHub

To optimize performance and avoid repetitive data collection, a helper structure (`sdlHub`) caches the current state of the sdl context. This means:
- When a new event is pushed, sdlHub is updated
- A second event like `sdl.screen` is triggered (internally or via tag) to tell GTM to read from sdlHub
- GTM tags then pull only what they need from cached state

Benefits:
- Faster processing in GTM
- Less need for inline JS variables or scraping DOM
- Consistent data across all tags

---

## 7. Implementation Guidelines

### Initialization
Place this as early as possible:
```html
<script>window.sdl = window.sdl || [];</script>
```

### Event Sending
Use this pattern:
```js
sdl.push({ event: "event.name", [context] });
```

### Consent Updates
If consent is delayed (e.g., via OneTrust), listen to the update:
```js
window.addEventListener("OneTrustGroupsUpdated", function() {
  sdl.push({
    client: { 
      cmpId: "..." 
    },
    consentGroups: "C0001:1,...",
    event: "user.update.consent",
    user: { 
      update: { 
        consent: {} 
      } 
    }
  });
});
```

---

## 8. Summary

The `sdl` standardizes data collection into a structured, scalable system that reduces overhead, simplifies GTM setups, and provides better governance for analytics and marketing tags.

This structure can be reused across brands and platforms, supports clean migrations to new tag managers, and aligns with privacy-first tracking principles.