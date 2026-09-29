import type { Product } from "@/lib/products";
import { site } from "@/lib/site";
import { productPhotos } from "./productUi";

const absolute = (path: string) => (/^https?:\/\//.test(path) ? path : `${site.url}${path}`);

/**
 * schema.org Product + BreadcrumbList. Offers only for models with a listed
 * THB price; "price on request" products get none.
 */
export default function ProductJsonLd({ product }: { product: Product }) {
  const url = `${site.url}/products/${product.slug}`;
  const images = productPhotos(product).map((p) => absolute(p.src));
  const priced = product.models.filter((m) => m.priceTHB !== undefined);

  const offers = priced.map((m) => ({
    "@type": "Offer",
    name: m.name,
    ...(m.sku ? { sku: m.sku } : {}),
    price: m.priceTHB,
    priceCurrency: "THB",
    url: product.models.length > 1 ? `${url}#${m.id}` : url,
    seller: { "@type": "Organization", name: site.name },
  }));

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${url}#product`,
        name: product.name,
        description: product.summary,
        category: product.category,
        url,
        brand: { "@type": "Brand", name: product.maker },
        ...(images.length > 0 ? { image: images } : {}),
        ...(product.models.length > 1 ? { model: product.models.map((m) => m.name) } : {}),
        ...(offers.length === 1 ? { offers: offers[0] } : {}),
        ...(offers.length > 1
          ? {
              offers: {
                "@type": "AggregateOffer",
                priceCurrency: "THB",
                lowPrice: Math.min(...priced.map((m) => m.priceTHB as number)),
                highPrice: Math.max(...priced.map((m) => m.priceTHB as number)),
                offerCount: offers.length,
                offers,
              },
            }
          : {}),
        ...(product.specs.length > 0
          ? {
              additionalProperty: product.specs.map((s) => ({
                "@type": "PropertyValue",
                name: s.label,
                value: s.value,
              })),
            }
          : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Products", item: `${site.url}/products` },
          { "@type": "ListItem", position: 2, name: product.name, item: url },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Escape "<" so product copy can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
