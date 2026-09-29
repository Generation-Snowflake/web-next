// Presentation helpers shared by the product pages. Product facts live in
// lib/products.ts; this file only decides how to show them.
import type { Photo, Product } from "@/lib/products";

/** Quote link that pre-selects a product or model on the contact form. */
export function quoteHref(id: string) {
  return `/contact?product=${encodeURIComponent(id)}`;
}

/** Quote id for a whole product line: the model id when there is only one. */
export function productQuoteId(product: Product) {
  return product.models.length === 1 ? product.models[0].id : product.slug;
}

/** Main photo + gallery, de-duplicated, in display order. */
export function productPhotos(product: Product): Photo[] {
  const seen = new Set<string>();
  const out: Photo[] = [];
  const main = product.image ? [{ src: product.image, alt: product.imageAlt ?? product.name }] : [];
  for (const p of [...main, ...product.gallery]) {
    if (seen.has(p.src)) continue;
    seen.add(p.src);
    out.push(p);
  }
  return out;
}

/**
 * Split "IR sensor × 2" / "2 × SO-101 arms" into item + quantity. Lines
 * without a count come back with qty undefined.
 */
export function splitQty(line: string): { item: string; qty?: string } {
  const tail = line.match(/^(.*?)\s*×\s*(\d+)$/);
  if (tail) return { item: tail[1], qty: tail[2] };
  const head = line.match(/^(\d+)\s*×\s*(.+)$/);
  if (head && !head[2].includes("×")) return { item: head[2], qty: head[1] };
  return { item: line };
}

/** priceNote without a leading "Price on request." when the price line already says so. */
export function priceNoteDetail(note?: string) {
  return note?.replace(/^Price on request\.\s*/, "");
}
