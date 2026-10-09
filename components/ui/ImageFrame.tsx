import Image from "next/image";

/**
 * A figure: image on a light-grey backdrop with rounded corners and an
 * optional short caption. Without `src` it shows a plain hatched box that
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
  /** Short caption under the frame. */
  caption?: React.ReactNode;
  /** @deprecated ignored (no decorative icons in the new design). */
  icon?: unknown;
  /** @deprecated ignored. */
  tint?: string;
  /** Should include an aspect ratio or height. */
  className?: string;
  sizes?: string;
  priority?: boolean;
  fit?: "cover" | "contain";
}) {
  const frame = (
    <div className={`relative overflow-hidden rounded-xl bg-paper-3 ${className}`}>
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
          className="absolute inset-0 flex items-end bg-[repeating-linear-gradient(135deg,transparent_0_11px,rgba(7,17,40,0.06)_11px_12px)] p-3"
        >
          <span className="rounded-md bg-card px-2 py-0.5 text-[13px] text-graphite">{label ?? "Photo to come"}</span>
        </div>
      )}
    </div>
  );
  if (!caption) return frame;
  return (
    <figure>
      {frame}
      <figcaption className="caption mt-3">{caption}</figcaption>
    </figure>
  );
}
