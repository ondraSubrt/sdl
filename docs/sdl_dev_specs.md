# 🧠 SDL Developer Specification

This document provides a complete technical reference for implementing and maintaining the **SDL (Single Data Layer)** standard. It combines the core concept, data structure, integration methods, and development guidelines.

---

## 📌 Introduction

SDL is a unified JavaScript-based data layer that enables consistent, scalable tracking of user behavior and system state across websites and apps. It is designed to reduce complexity, support GTM and server-side integrations, and ensure a clean separation between developers, analysts, and marketers.

---

## 🔧 GTM Snippet

Place this snippet as high as possible in the `<head>` of the HTML:

```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','sdl','GTM-XXXXXX');</script>
<!-- End Google Tag Manager -->
```

---

## 🧱 Core Principles

- ✅ Unified structure (`window.sdl`)
- ✅ Context-rich events
- ✅ Works with both GTM and server-side setups
- ✅ Decouples tracking logic from UI code
- ✅ Supports semantic naming and reuse

---

## 📂 Directory Structure

```txt
📁 /docs
│   ├── sdl_dev_specs.md  <-- you are here
│   ├── events.md
│   └── root_properties.md
📁 /events
│   ├── user.click.link.md
│   ├── user.download.products.md
│   └── ...
```

---

## 🧠 Data Model

### 🌐 Root Properties

| Key         | Description                        |
|-------------|------------------------------------|
| `client`    | Consent and identity e.g. cmpId    |
| `session`   | Device, locale, platform info      |
| `screen`    | Page metadata e.g. name, type      |
| `server`    | Backend/env context                |
| `order`     | Purchase/cart data if available    |
| `consentGroups` | Consent strings for marketing  |

see: [root](root) 

These are pushed like this:

```js
sdl.push({
  client: { deviceId: "abc123", cmpId: "xyz" },
  session: { countryCode: "CZ", platform: "macOS" },
  screen: { name: "ProductPage", locale: "en-US" }
});
```

---

## 📦 Event Naming Convention

### User Events
```
user.action.subject
```
Examples:
- `user.click.link`
- `user.download.products`
- `user.buy.products`

### System Events
```
system.subject
```
Examples:
- `system.modal`
- `system.afterLoad`
- `system.error`

### Screen Event
```js
sdl.push({
  event: "screen",
  screen: {
    name: "CheckoutStep",
    type: "checkout"
  }
});
```

---

## 🚀 Integration Methods

| Method               | Best for              | Requires Markup | Decoupled | SPA Friendly |
|----------------------|-----------------------|------------------|-----------|--------------|
| `data-*` attributes  | CMS/static pages      | ✅               | ❌        | ❌           |
| Direct JS call       | Complex UI logic      | ❌               | ❌        | ✅           |
| Custom JS event      | Modular apps (SPA)    | ❌               | ✅        | ✅           |

---

## 👥 Project Roles

| Role        | Responsibilities                     |
|-------------|--------------------------------------|
| Developer   | Emits correct `sdl.push()` events    |
| Analyst     | Defines event specs and monitors     |
| Tag Manager | Implements triggers and exports data |

---

## 📚 Best Practices

- Use semantic and consistent event names
- Avoid inline JS tracking logic in markup-heavy environments
- Use `sdlHub` or equivalent to cache and expose current state
- Avoid duplication of root properties
- Validate events manually or via automation
- Work in collaboration with devs, analysts, and product teams

---

_Last updated: April 12, 2025_
