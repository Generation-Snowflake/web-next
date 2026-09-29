import Image from "next/image";
import type { LucideIcon } from "lucide-react";

/**
 * A figure: image on a warm-grey backdrop, square corners, optional mono
 * caption ("FIG. 2 — …"). Without `src` it shows a plain hatched box that
 * says the photo is still to come. Prefer hiding a section over showing it.
 */
export default function ImageFrame({
  src,
  alt,
  label,
  caption,
  className = "aspect-[4/3]",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  fit = "cover",
}: {
  src?: string;
  alt: string;
  /** Text inside the empty placeholder. */
  label?: string;
  /** Mono caption under the frame. */
  caption?: React.ReactNode;
  /** @deprecated ignored (no decorative icons in the new design). */
  icon?: LucideIcon;
  /** @deprecated ignored. */
  tint?: string;
  /** Should include an aspect ratio or height. */
  className?: string;
  sizes?: string;
  priority?: boolean;
  fit?: "cover" | "contain";
}) {
  const frame = (
    <div className={`relative overflow-hidden bg-paper-3 ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={fit === "cover" ? "object-cover" : "object-contain p-[6%] mix-blend-multiply"}
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0 flex items-end bg-[repeating-linear-gradient(135deg,transparent_0_11px,rgba(22,24,26,0.07)_11px_12px)] p-3"
        >
          <span className="bg-paper-3 px-1.5 font-mono text-[12px] text-graphite">{label ?? "Photo to come"}</span>
        </div>
      )}
    </div>
  );
  if (!caption) return frame;
  return (
    <figure>
      {frame}
      <figcaption className="caption mt-2">{caption}</figcaption>
    </figure>
  );
}
