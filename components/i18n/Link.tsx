"use client";

import NextLink from "next/link";
import { localizeHref } from "@/lib/i18n";
import { useLang } from "./LangProvider";

type Props = Omit<React.ComponentProps<typeof NextLink>, "href"> & { href: string };

/** next/link that keeps the visitor in their language: "/about" becomes
 *  "/th/about" on Thai pages. Use it for every internal link. */
export default function Link({ href, ...rest }: Props) {
  const lang = useLang();
  return <NextLink href={localizeHref(href, lang)} {...rest} />;
}
