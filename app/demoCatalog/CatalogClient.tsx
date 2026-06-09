"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  Check,
  ChevronLeft,
  ChevronRight,
  Play,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { products, categories, type Product } from "./products";

// WebGL only runs in the browser — load the 3D viewer client-side only.
const ProductViewer = dynamic(() => import("@/components/ProductViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center rounded-2xl border border-ice/20 bg-darkbg">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-ice/30 border-t-ice" />
    </div>
  ),
});

const STORAGE_KEY = "gsf:demo-catalog-selection";

export default function CatalogClient() {
  const [selected, setSelected] = useState<string[]>([]);
  const [category, setCategory] = useState("ทั้งหมด");
  const [only3D, setOnly3D] = useState(false);
  const [query, setQuery] = useState("");

  // Demo presentation: a list of products to walk through, plus the current index.
  const [demoList, setDemoList] = useState<Product[] | null>(null);
  const [demoIndex, setDemoIndex] = useState(0);

  // Restore the saved selection so a demo line-up survives a refresh.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // Hydrating saved state from an external store (localStorage) is a valid
      // one-shot sync, so the set-state-in-effect guard is relaxed here.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setSelected(JSON.parse(raw));
    } catch {
      /* ignore malformed storage */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selected));
    } catch {
      /* storage may be unavailable */
    }
  }, [selected]);

  const toggle = (id: string) =>
    setSelected((cur) =>
      cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id],
    );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (category !== "ทั้งหมด" && p.category !== category) return false;
      if (only3D && !p.model) return false;
      if (
        q &&
        !`${p.name} ${p.category} ${p.desc} ${(p.tags ?? []).join(" ")}`
          .toLowerCase()
          .includes(q)
      )
        return false;
      return true;
    });
  }, [category, only3D, query]);

  const selectedProducts = useMemo(
    () =>
      selected
        .map((id) => products.find((p) => p.id === id))
        .filter((p): p is Product => Boolean(p)),
    [selected],
  );

  const openDemo = (list: Product[], index = 0) => {
    if (list.length === 0) return;
    setDemoList(list);
    setDemoIndex(index);
  };
  const closeDemo = () => setDemoList(null);

  return (
    <div>
      {/* Toolbar: search + 3D filter */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-softwhite/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ค้นหาสินค้า…"
            className="w-full rounded-xl border border-ice/20 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-softwhite placeholder:text-softwhite/40 outline-none transition focus:border-ice/60"
          />
        </div>
        <button
          onClick={() => setOnly3D((v) => !v)}
          className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
            only3D
              ? "border-ice bg-ice/15 text-ice shadow-glow"
              : "border-ice/20 bg-white/5 text-softwhite/80 hover:border-ice/60 hover:text-ice"
          }`}
        >
          <Box className="h-4 w-4" />
          เฉพาะที่มี 3D
        </button>
      </div>

      {/* Category chips */}
      <div className="mb-10 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-full border px-4 py-1.5 text-sm transition ${
              category === c
                ? "border-ice bg-ice/15 text-ice"
                : "border-ice/15 bg-white/5 text-softwhite/70 hover:border-ice/50 hover:text-ice"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => {
          const isSelected = selected.includes(p.id);
          return (
            <div
              key={p.id}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-white/5 backdrop-blur-lg transition ${
                isSelected
                  ? "border-ice shadow-glow"
                  : "border-ice/20 hover:border-ice/60"
              }`}
            >
              {/* Thumbnail */}
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src={p.img}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* badges */}
                <div className="absolute left-3 top-3 flex gap-2">
                  {p.model ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-ice/40 bg-darkbg/70 px-2.5 py-1 text-xs font-medium text-ice backdrop-blur-md">
                      <Box className="h-3 w-3" /> 3D
                    </span>
                  ) : (
                    <span className="rounded-full border border-white/20 bg-darkbg/70 px-2.5 py-1 text-xs font-medium text-softwhite/70 backdrop-blur-md">
                      Image
                    </span>
                  )}
                </div>
                {/* select toggle */}
                <button
                  onClick={() => toggle(p.id)}
                  aria-label={isSelected ? "เอาออกจากเดโม่" : "เลือกไปเดโม่"}
                  className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border transition ${
                    isSelected
                      ? "border-ice bg-ice text-darkbg"
                      : "border-white/30 bg-darkbg/60 text-softwhite/80 backdrop-blur-md hover:border-ice hover:text-ice"
                  }`}
                >
                  <Check className="h-4 w-4" />
                </button>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col p-5">
                <span className="mb-1 text-xs uppercase tracking-wider text-ice/70">
                  {p.category}
                </span>
                <h3 className="mb-2 text-lg font-semibold text-softwhite">
                  {p.name}
                </h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-softwhite/60">
                  {p.desc}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => toggle(p.id)}
                    className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                      isSelected
                        ? "border-ice bg-ice/15 text-ice"
                        : "border-ice/20 bg-white/5 text-softwhite/80 hover:border-ice/60 hover:text-ice"
                    }`}
                  >
                    {isSelected ? "เลือกแล้ว" : "เลือกไปเดโม่"}
                  </button>
                  {p.model && (
                    <button
                      onClick={() => openDemo([p])}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-ice/20 bg-white/5 px-3 py-2 text-sm font-medium text-softwhite/80 transition hover:border-ice/60 hover:text-ice"
                    >
                      <Box className="h-4 w-4" /> ดู 3D
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="py-20 text-center text-softwhite/50">
          ไม่พบสินค้าที่ตรงกับเงื่อนไข
        </p>
      )}

      {/* Selection tray */}
      <AnimatePresence>
        {selectedProducts.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed inset-x-0 bottom-0 z-40 px-4 pb-4"
          >
            <div className="mx-auto flex max-w-5xl flex-col gap-3 rounded-2xl border border-ice/25 bg-darkbg/85 p-4 shadow-glow backdrop-blur-xl md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3 overflow-x-auto">
                <span className="shrink-0 text-sm font-medium text-ice">
                  เลือกไว้ {selectedProducts.length} รายการ
                </span>
                <div className="flex gap-2">
                  {selectedProducts.map((p) => (
                    <span
                      key={p.id}
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-ice/20 bg-white/5 py-1 pl-3 pr-1.5 text-xs text-softwhite/80"
                    >
                      {p.name}
                      <button
                        onClick={() => toggle(p.id)}
                        aria-label={`เอา ${p.name} ออก`}
                        className="flex h-5 w-5 items-center justify-center rounded-full text-softwhite/60 transition hover:bg-white/10 hover:text-ice"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  onClick={() => setSelected([])}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-2 text-sm text-softwhite/70 transition hover:border-white/30 hover:text-softwhite"
                >
                  <Trash2 className="h-4 w-4" /> ล้าง
                </button>
                <button
                  onClick={() => openDemo(selectedProducts)}
                  className="inline-flex items-center gap-2 rounded-lg bg-ice px-5 py-2 text-sm font-semibold text-darkbg transition hover:bg-ice-light"
                >
                  <Play className="h-4 w-4" /> เริ่มเดโม่
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Demo presentation overlay */}
      <AnimatePresence>
        {demoList && (
          <Presentation
            list={demoList}
            index={demoIndex}
            onIndex={setDemoIndex}
            onClose={closeDemo}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function Presentation({
  list,
  index,
  onIndex,
  onClose,
}: {
  list: Product[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const current = list[index];
  const go = (dir: number) =>
    onIndex((index + dir + list.length) % list.length);

  // Keyboard navigation for hands-free presenting.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, list.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex flex-col bg-darkbg/95 backdrop-blur-xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-ice/70">
            {current.category} · {index + 1}/{list.length}
          </p>
          <h2 className="text-xl font-semibold text-softwhite">
            {current.name}
          </h2>
        </div>
        <button
          onClick={onClose}
          aria-label="ปิดการนำเสนอ"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-softwhite/80 transition hover:border-ice hover:text-ice"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Stage */}
      <div className="relative flex-1 overflow-hidden p-4 md:p-8">
        {current.model ? (
          <ProductViewer key={current.id} modelUrl={current.model} />
        ) : (
          <div className="relative h-full w-full overflow-hidden rounded-2xl border border-ice/20 bg-darkbg">
            <Image
              src={current.img}
              alt={current.name}
              fill
              className="object-contain"
              priority
            />
          </div>
        )}

        {list.length > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              aria-label="ก่อนหน้า"
              className="absolute left-6 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-darkbg/70 text-softwhite/80 backdrop-blur-md transition hover:border-ice hover:text-ice md:left-12"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="ถัดไป"
              className="absolute right-6 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-darkbg/70 text-softwhite/80 backdrop-blur-md transition hover:border-ice hover:text-ice md:right-12"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {list.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto border-t border-white/10 px-6 py-4">
          {list.map((p, i) => (
            <button
              key={p.id}
              onClick={() => onIndex(i)}
              className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border transition ${
                i === index
                  ? "border-ice shadow-glow-sm"
                  : "border-white/15 opacity-60 hover:opacity-100"
              }`}
            >
              <Image src={p.img} alt={p.name} fill className="object-cover" />
              {p.model && (
                <span className="absolute bottom-0.5 right-0.5 rounded bg-darkbg/80 px-1 text-[9px] font-medium text-ice">
                  3D
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}
