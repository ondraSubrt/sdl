
# Event: user.buy.products

## Summary
Tracks when a user clicks a "buy" or "add to cart" link or button.

## Trigger
Typically fired when the user clicks an element with `data-role="cart-link"` or via manual JS event.

## Structure

```js
sdl.push({
  event: "user.buy.products",
  user: {
    buy: {
      products: [
        {
          sku: "PROD-001",
          campaign: "spring_sale",
          campaignMarker: "WDS-en-US/abc",
          maintenance: 1,
          seats: 3,
          quantity: 1,
          currencyCode: "USD",
          category: "Security",
          brand: "Avast",
          offerType: "buy",
          localCurrencyCode: "CZK",
          localPrice: 999
        }
      ]
    }
  }
});
```

## Properties

| Field             | Type    | Description                         | Required |
|------------------|---------|-------------------------------------|----------|
| `sku`            | string  | Product identifier (internal SKU)   | ✅       |
| `campaign`       | string  | Campaign ID or name                 | ❌       |
| `campaignMarker` | string  | Full marketing marker string        | ❌       |
| `maintenance`    | number  | Maintenance flag (0 or 1)           | ❌       |
| `seats`          | number  | Number of seats                     | ❌       |
| `quantity`       | number  | Number of items                     | ✅       |
| `currencyCode`   | string  | Global currency (e.g. "USD")        | ✅       |
| `category`       | string  | Product category (e.g. "Security")  | ❌       |
| `brand`          | string  | Product brand (e.g. "Avast")        | ✅       |
| `offerType`      | string  | "buy" or "download"                 | ✅       |
| `localCurrencyCode` | string | User's local currency (e.g. "CZK") | ❌       |
| `localPrice`     | number  | Final local price                   | ❌       |

## Example HTML (Data Attribute Variant)

```html
<a href="..."
   data-role="cart-link"
   data-product-id="PROD-001"
   data-campaign="spring_sale"
   data-price="999"
   data-currency="CZK"
   data-seats="3"
   data-maintenance="1">
   Buy Now
</a>
```

## Notes

- This event supports both single-product and multi-product scenarios.
- In the case of multiple SKUs in one tag (via `|` separator), the script generates multiple product entries.
- Tracked immediately on user click; may be followed by screen update (e.g., showing a cart popup).
