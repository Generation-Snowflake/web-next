"use client";

import { useState } from "react";
import Image from "next/image";
import type { Photo } from "@/lib/products";

/**
 * Main photo + a row of thumbnails. Photos sit on the paper-3 backdrop with
 * object-contain so white studio shots and portrait photos both fit.
 */
export default function ProductGallery({
  photos,
  figure = 1,
  priority = false,
  aspect = "aspect-[4/3]",
}: {
  photos: Photo[];
  figure?: number;
  priority?: boolean;
  aspect?: string;
}) {
  const [index, setIndex] = useState(0);
  if (photos.length === 0) return null;
  const current = photos[Math.min(index, photos.length - 1)];

  return (
    <figure>
      <div className={`relative overflow-hidden bg-paper-3 ${aspect}`}>
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 45rem, 100vw"
          className="object-contain mix-blend-multiply"
        />
      </div>
      <figcaption className="caption mt-2">
        FIG. {figure}
        {photos.length > 1 ? `.${index + 1}` : ""} — {current.alt}
      </figcaption>
      {photos.length > 1 && (
        <ul className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-6" aria-label="More photos">
          {photos.map((p, i) => (
            <li key={p.src}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show photo ${i + 1}: ${p.alt}`}
                aria-current={i === index ? "true" : undefined}
                className={`relative block aspect-square w-full overflow-hidden bg-paper-3 outline-offset-2 transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-ink ${
                  i === index ? "ring-1 ring-ink" : "opacity-80 hover:opacity-100"
                }`}
              >
                <Image src={p.src} alt="" fill sizes="96px" className="object-cover mix-blend-multiply" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </figure>
  );
}
