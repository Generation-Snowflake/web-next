import type { Product, ProductModel } from "@/lib/products";
import { formatTHB } from "@/lib/products";
import ButtonLink from "@/components/ui/Button";
import ProductGallery from "./ProductGallery";
import SpecTable from "./SpecTable";
import InTheBox from "./InTheBox";
import { quoteHref } from "./productUi";

/** One model of a multi-model product (a Makerzoid kit), anchored by model.id. */
export default function KitBlock({
  product,
  model,
  figure,
}: {
  product: Product;
  model: ProductModel;
  figure: number;
}) {
  const photos = model.gallery ?? (model.image ? [{ src: model.image, alt: model.name }] : []);
  const price = formatTHB(model.priceTHB);
  return (
    <article id={model.id} className="scroll-mt-24 border-t border-ink py-12 md:py-14">
      <div className="grid gap-8 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <ProductGallery photos={photos} figure={figure} />
        </div>
        <div className="md:col-span-7">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h3 className="text-[1.5rem] font-medium leading-tight tracking-[-0.015em] sm:text-[1.75rem]">
              {product.name} {model.name}
            </h3>
            <p className="font-mono text-[1.25rem] text-signal">{price ?? "Price on request"}</p>
          </div>
          <p className="caption mt-1">
            {model.sku && <>SKU {model.sku} · </>}
            {model.audience}
          </p>
          <p className="mt-4 max-w-prose text-[17px] leading-relaxed text-graphite">{model.tagline}</p>

          <SpecTable specs={model.specs} className="mt-8" />

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {model.inTheBox && model.inTheBox.length > 0 && (
              <div>
                <h4 className="mb-2 text-[15px] font-medium">In the box</h4>
                <InTheBox items={model.inTheBox} />
              </div>
            )}
            {model.extras && model.extras.length > 0 && (
              <div>
                <h4 className="mb-2 text-[15px] font-medium">Also included</h4>
                <table className="w-full border-t border-ink text-left text-[15px]">
                  <tbody>
                    {model.extras.map((e) => (
                      <tr key={e.label} className="border-b border-hairline">
                        <th scope="row" className="py-2 pr-4 font-normal">
                          {e.label}
                        </th>
                        <td className={`py-2 text-right font-mono text-[14px] ${e.included ? "text-ink" : "text-graphite"}`}>
                          {e.included ? "Yes" : "No"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="mt-8">
            <ButtonLink href={quoteHref(model.id)} variant="outline">
              Ask about {model.name}
            </ButtonLink>
          </div>
        </div>
      </div>
    </article>
  );
}
