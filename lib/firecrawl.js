// import FirecrawlApp from "@mendable/firecrawl-js";

// const firecrawl = new FirecrawlApp({
//   apiKey: process.env.FIRECRAWL_API_KEY,
// });

// export async function scrapeProduct(url) {
//   try {
//     const result = await firecrawl.scrapeUrl(url, {
//       formats: ["extract"],
//       extract: {
//         prompt:
//           "Extract the product name as 'productName', current price as a number as 'currentPrice', currency code (USD, EUR, etc) as 'currencyCode', and product image URL as 'productImageUrl' if available",
//         schema: {
//           type: "object",
//           properties: {
//             productName: { type: "string" },
//             currentPrice: { type: "number" },
//             currencyCode: { type: "string" },
//             productImageUrl: { type: "string" },
//           },
//           required: ["productName", "currentPrice"],
//         },
//       },
//     });

//     // Firecrawl returns data in result.extract
//     const extractedData = result.extract;

//     if (!extractedData || !extractedData.productName) {
//       throw new Error("No data extracted from URL");
//     }

//     return extractedData;
//   } catch (error) {
//     console.error("Firecrawl scrape error:", error);
//     throw new Error(`Failed to scrape product: ${error.message}`);
//   }
// }

// lib/firecrawl.js
import FirecrawlApp from "@mendable/firecrawl-js";

const firecrawl = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY,
});

export async function scrapeProduct(url) {
  try {
    const result = await firecrawl.scrape(url, {
      formats: [
        {
          type: "json",
          schema: {
            type: "object",
            properties: {
              productName: { type: "string" },
              currentPrice: { type: ["number", "string", "null"] },
              currencyCode: { type: ["string", "null"] },
              productImageUrl: { type: ["string", "null"] },
            },
            required: ["productName"],
          },
          prompt: `
Extract:
- product name as "productName"
- product price as "currentPrice"
- currency code as "currencyCode"
- product image URL as "productImageUrl"

If price is not visible, return null for currentPrice.
          `,
        },
      ],
    });

    console.log("RAW FIRECRAWL RESULT:", result);

    // 🔥 IMPORTANT: data is in result.json (NOT extract)
    const extractedData = result?.json;

    if (!extractedData?.productName) {
      throw new Error("No product data extracted");
    }

    return extractedData;
  } catch (error) {
    console.error("Firecrawl scrape error:", error);
    throw error; // match PR behavior
  }
}
