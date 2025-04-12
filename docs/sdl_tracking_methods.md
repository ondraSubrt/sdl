# Tracking Integration Methods for `sdl.push()`

This document outlines three primary approaches to triggering `sdl.push()` tracking events across websites and applications. Each method suits a different environment — from CMS-driven sites to JavaScript-heavy apps.

---

## 1. Tracking via `data-*` Attributes

### Concept  
Use semantic `data-` attributes (e.g. `data-role`, `data-sku`, `data-campaign`) in HTML. A centralized listener reads these attributes and triggers the appropriate `sdl.push()` event.

### Use Cases  
- CMS-managed websites  
- Static or server-rendered pages  
- Sites with low JS complexity  

### Example HTML  
```html
<a href="..." data-role="download-link" data-download-name="FAV-PRODUCT" data-campaign="summer-2025">
  Download
</a>
```

### Example Listener  
```js
document.addEventListener("click", (e) => {
  const el = e.target.closest('[data-role]');
  if (!el) return;

  const role = el.getAttribute("data-role");
  if (role === "download-link") {
    sdl.push({
      event: "user.download.products",
      user: {
        download: {
          products: [{
            sku: el.getAttribute("data-download-name"),
            campaign: el.getAttribute("data-campaign") || "",
            offerType: "download",
            price: 0
          }]
        }
      }
    });
  }
});
```

### Pros  
- Easy for non-dev teams (e.g. CMS editors)  
- Minimal JS required  
- Keeps tracking declarative in markup  

### Cons  
- HTML can get cluttered  
- Not ideal for highly dynamic UI or SPAs  

---

## 2. Direct `sdl.push()` Calls in Code

### Concept  
Manually trigger tracking events at appropriate points in your code logic.

### Use Cases  
- Complex interactions  
- JS-heavy sites or apps  
- Events based on logic or user state  

### Example  
```js
button.addEventListener("click", () => {
  const product = {
    sku: "ABC123",
    campaign: "spring-deal",
    offerType: "download",
    price: 0
  };

  sdl.push({
    event: "user.download.products",
    user: {
      download: {
        products: [product]
      }
    }
  });
});
```

### Pros  
- Full control over data and timing  
- No reliance on HTML attributes  

### Cons  
- More development work  
- Not as portable between teams  

---

## 3. Custom JS Events with Listeners

### Concept  
Fire custom JS `CustomEvent` objects and let a central listener translate those into `sdl.push()` calls. This approach decouples business logic from analytics.

### Use Cases  
- SPAs or modular frontend architectures  
- Tracking across components  
- Event bus or pub-sub style communication  

### Example: Dispatch  
```js
const data = {
  sku: "XYZ789",
  offerType: "trial"
};

document.dispatchEvent(new CustomEvent("tracking:download", {
  detail: data
}));
```

### Example: Listener  
```js
document.addEventListener("tracking:download", (e) => {
  const d = e.detail;
  sdl.push({
    event: "user.download.products",
    user: {
      download: {
        products: [d]
      }
    }
  });
});
```

### Pros  
- Clean separation of concerns  
- Easy to unit test or observe  
- Great for modern frontend frameworks  

### Cons  
- Slightly more abstract  
- Requires coordination and documentation  

---

## Summary Table

| Method               | Best for                            | Requires Markup | Decoupled | Suitable for SPAs |
|----------------------|--------------------------------------|------------------|-----------|-------------------|
| `data-*` Attributes  | CMS, static pages                    | ✅               | ❌        | ❌                |
| Direct Calls         | Dynamic logic, JS-based triggers     | ❌               | ❌        | ✅                |
| Custom Events        | Modular apps, component systems      | ❌               | ✅        | ✅                |

---

*Last updated: April 2025*
