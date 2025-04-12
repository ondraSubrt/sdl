# Event: user.download.products

## Summary
Tracks when a user clicks a download link for a product.

## Trigger
Typically fired when the user clicks an element with `data-role="download-link"` or via manual JS event.

## Structure
```js
sdl.push({
  event: "user.download.products",
  user: {
    download: {
      products: [
        {
          sku: "PROD-001",
          campaign: "spring_sale",
          campaignMarker: "WDS-en-US/abc",
          price: 0,
          offerType: "download",
          brand: "Avast"
        }
      ]
    }
  }
});
```

## Properties

| Field             | Type     | Description                          | Required |
|------------------|----------|--------------------------------------|----------|
| `sku`            | string   | Product identifier                   | ✅       |
| `campaign`       | string   | Campaign ID or name                  | ❌       |
| `campaignMarker` | string   | Full marketing marker string         | ❌       |
| `price`          | number   | Price at the time of download        | ✅       |
| `offerType`      | string   | "download" or "buy"                  | ✅       |
| `brand`          | string   | Product brand (e.g., "Avast")        | ✅       |

## Example HTML (Data Attribute Variant)
```html
<a href="..." 
   data-role="download-link" 
   data-download-name="PROD-001" 
   data-campaign="spring_sale">
   Download Now
</a>
```

## Notes
- Tracked both on initial click and optionally again if download popup appears
- Supports both single-product and multi-product arrays
