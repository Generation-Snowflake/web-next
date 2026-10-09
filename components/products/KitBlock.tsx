import type { Lang } from "@/lib/i18n";
import type { Product, ProductModel } from "@/lib/products";
import { formatTHB } from "@/lib/products";
import ButtonLink from "@/components/ui/Button";
import ProductGallery from "./ProductGallery";
import SpecTable from "./SpecTable";
import InTheBox from "./InTheBox";
import { quoteHref } from "./productUi";

const copy = {
  en: { onRequest: "Price on request", inTheBox: "In the box", alsoIncluded: "Also included", yes: "Yes", no: "No", ask: "Ask about" },
  th: { onRequest: "สอบถามราคา", inTheBox: "ในกล่องมีอะไรบ้าง", alsoIncluded: "สิ่งที่ได้เพิ่มเติม", yes: "มี", no: "ไม่มี", ask: "สอบถามเรื่อง" },
} satisfies Record<Lang, Record<string, string>>;

/** One model of a multi-model product (a Makerzoid kit), anchored by model.id. */
export default function KitBlock({
  product,
  model,
  lang = "en",
}: {
  product: Product;
  model: ProductModel;
  lang?: Lang;
}) {
  const c = copy[lang];
  const photos = model.gallery ?? (model.image ? [{ src: model.image, alt: model.name }] : []);
  const price = formatTHB(model.priceTHB);
  return (
    <article id={model.id} className="scroll-mt-24 border-t border-hairline py-14 md:py-20">
      <div className="grid gap-8 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <ProductGallery photos={photos} />
        </div>
        <div className="md:col-span-7">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h3 className="text-[1.625rem] font-semibold leading-tight tracking-heading sm:text-[2rem]">
              {product.name} {model.name}
            </h3>
            <p className="font-mono text-[1.375rem] font-semibold tabular-nums text-ink">{price ?? c.onRequest}</p>
          </div>
          <p className="caption mt-1">
            {model.sku && <><span className="font-mono font-normal">SKU {model.sku}</span> · </>}
            {model.audience}
          </p>
          <p className="mt-4 max-w-prose text-lg leading-relaxed text-graphite">{model.tagline}</p>

          <SpecTable specs={model.specs} className="mt-8" />

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {model.inTheBox && model.inTheBox.length > 0 && (
              <div>
                <h4 className="mb-3 text-[15px] font-semibold">{c.inTheBox}</h4>
                <InTheBox items={model.inTheBox} lang={lang} />
              </div>
            )}
            {model.extras && model.extras.length > 0 && (
              <div>
                <h4 className="mb-3 text-[15px] font-semibold">{c.alsoIncluded}</h4>
                <div className="card overflow-hidden">
                <table className="w-full text-left text-[15px]">
                  <tbody>
                    {model.extras.map((e) => (
                      <tr key={e.label} className="border-b border-hairline last:border-b-0">
                        <th scope="row" className="px-4 py-2.5 font-normal">
                          {e.label}
                        </th>
                        <td className={`px-4 py-2.5 text-right text-[14px] font-medium ${e.included ? "text-ink" : "text-graphite"}`}>
                          {e.included ? c.yes : c.no}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8">
            <ButtonLink href={quoteHref(model.id)} variant="outline">
              {c.ask} {model.name}
            </ButtonLink>
          </div>
        </div>
      </div>
    </article>
  );
}
