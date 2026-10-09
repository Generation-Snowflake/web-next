import { notFound } from "next/navigation";

// Any unknown path under a language renders that language's not-found page.
export default function CatchAll() {
  notFound();
}
