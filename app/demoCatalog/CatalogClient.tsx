"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  Check,
  ChevronLeft,
  ChevronRight,
  Maximize2,
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
    <div className="flex h-full w-full items-center justify-center bg-catalog-ink">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-catalog-teal/30 border-t-catalog-teal" />
    </div>
  ),
});

const STORAGE_KEY = "gsf:demo-catalog-selection";
const total = products.length;
const total3D = products.filter((p) => p.model).length;

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
    <div className="flex min-h-screen flex-col bg-catalog-mist font-sans text-catalog-ink">
      {/* ── Header ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-catalog-line bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <span className="block h-6 w-6 bg-catalog-teal" />
            <span className="text-lg font-bold tracking-tight">GSF</span>
            <span className="hidden h-5 w-px bg-catalog-line sm:block" />
            <span className="hidden text-xs font-semibold uppercase tracking-[0.25em] text-catalog-slate sm:block">
              Demo Catalog
            </span>
          </div>
          <div className="flex items-center gap-4">
            {selectedProducts.length > 0 && (
              <span className="hidden text-sm text-catalog-slate sm:block">
                เลือกแล้ว{" "}
                <strong className="text-catalog-ink">
                  {selectedProducts.length}
                </strong>{" "}
                รายการ
              </span>
            )}
            <button
              onClick={() => openDemo(selectedProducts)}
              disabled={selectedProducts.length === 0}
              className="inline-flex items-center gap-2 bg-catalog-teal px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-catalog-teal-dark disabled:cursor-not-allowed disabled:bg-catalog-line disabled:text-catalog-slate"
            >
              <Play className="h-4 w-4" /> เริ่มเดโม่
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-catalog-ink text-white">
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-catalog-teal/25 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-catalog-teal">
            Product Catalog
          </p>
          <h1 className="max-w-3xl text-4xl font-extrabold uppercase leading-[1.05] tracking-tight md:text-6xl">
            สินค้าและโซลูชัน
            <br />
            <span className="text-catalog-teal">สำหรับงานเดโม่</span>
          </h1>
          <p className="mt-6 max-w-xl leading-relaxed text-white/70">
            เลือกสินค้าที่ต้องการได้หลายรายการ — มีทั้งแบบรูปภาพและไฟล์ 3 มิติ
            ที่หมุนดูได้รอบทิศ จากนั้นกด “เริ่มเดโม่” เพื่อเข้าสู่โหมดนำเสนอ
            แบบเต็มจอสำหรับสาธิตให้ลูกค้า
          </p>
          <div className="mt-10 flex gap-10">
            <div>
              <p className="text-3xl font-bold">{total}</p>
              <p className="text-xs uppercase tracking-widest text-white/50">
                สินค้าทั้งหมด
              </p>
            </div>
            <div className="border-l border-white/15 pl-10">
              <p className="text-3xl font-bold text-catalog-teal">{total3D}</p>
              <p className="text-xs uppercase tracking-widest text-white/50">
                โมเดล 3 มิติ
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Toolbar ────────────────────────────────────────────── */}
      <div className="border-b border-catalog-line bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-catalog-slate" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ค้นหาสินค้า…"
                className="w-full border border-catalog-line bg-catalog-mist py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-catalog-slate focus:border-catalog-teal"
              />
            </div>
            <button
              onClick={() => setOnly3D((v) => !v)}
              className={`inline-flex items-center justify-center gap-2 border px-4 py-2.5 text-sm font-semibold uppercase tracking-wider transition ${
                only3D
                  ? "border-catalog-teal bg-catalog-teal text-white"
                  : "border-catalog-line text-catalog-slate hover:border-catalog-teal hover:text-catalog-teal"
              }`}
            >
              <Box className="h-4 w-4" /> เฉพาะที่มี 3D
            </button>
          </div>

          {/* Category tabs */}
          <div className="-mb-px flex flex-wrap gap-1 overflow-x-auto">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition ${
                  category === c
                    ? "border-catalog-teal text-catalog-ink"
                    : "border-transparent text-catalog-slate hover:text-catalog-ink"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Product grid ───────────────────────────────────────── */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-12 pb-40">
        <div className="grid gap-px overflow-hidden border border-catalog-line bg-catalog-line sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => {
            const isSelected = selected.includes(p.id);
            return (
              <article
                key={p.id}
                className={`group flex flex-col bg-white transition ${
                  isSelected ? "ring-2 ring-inset ring-catalog-teal" : ""
                }`}
              >
                {/* Thumbnail */}
                <div className="relative h-56 w-full overflow-hidden bg-catalog-mist">
                  <Image
                    src={p.img}
                    alt={p.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-0 top-0">
                    {p.model ? (
                      <span className="inline-flex items-center gap-1 bg-catalog-teal px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white">
                        <Box className="h-3 w-3" /> 3D
                      </span>
                    ) : (
                      <span className="inline-flex items-center bg-catalog-ink/80 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white">
                        Image
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => toggle(p.id)}
                    aria-label={isSelected ? "เอาออกจากเดโม่" : "เลือกไปเดโม่"}
                    className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center border transition ${
                      isSelected
                        ? "border-catalog-teal bg-catalog-teal text-white"
                        : "border-catalog-line bg-white/90 text-catalog-slate hover:border-catalog-teal hover:text-catalog-teal"
                    }`}
                  >
                    <Check className="h-4 w-4" />
                  </button>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-6">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-catalog-teal">
                    {p.category}
                  </span>
                  <h3 className="mt-1.5 text-lg font-bold leading-snug">
                    {p.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-catalog-slate">
                    {p.desc}
                  </p>

                  {p.tags && p.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="bg-catalog-mist px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-catalog-slate"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-5 flex gap-2">
                    <button
                      onClick={() => toggle(p.id)}
                      className={`flex-1 border px-3 py-2.5 text-sm font-semibold uppercase tracking-wider transition ${
                        isSelected
                          ? "border-catalog-teal bg-catalog-teal text-white"
                          : "border-catalog-ink text-catalog-ink hover:bg-catalog-ink hover:text-white"
                      }`}
                    >
                      {isSelected ? "เลือกแล้ว" : "เลือก"}
                    </button>
                    {p.model && (
                      <button
                        onClick={() => openDemo([p])}
                        aria-label={`ดูโมเดล 3D ของ ${p.name}`}
                        className="inline-flex items-center gap-1.5 border border-catalog-line px-3 py-2.5 text-sm font-semibold uppercase tracking-wider text-catalog-slate transition hover:border-catalog-teal hover:text-catalog-teal"
                      >
                        <Maximize2 className="h-4 w-4" /> 3D
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="py-20 text-center text-catalog-slate">
            ไม่พบสินค้าที่ตรงกับเงื่อนไข
          </p>
        )}
      </main>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="bg-catalog-ink text-white/60">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-8 text-sm md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="block h-5 w-5 bg-catalog-teal" />
            <span className="font-semibold text-white">GSF Robotics &amp; AI</span>
            <span className="text-white/40">· Demo Catalog</span>
          </div>
          <p className="text-white/40">
            แคตตาล็อกภายในสำหรับงานนำเสนอลูกค้า · © {new Date().getFullYear()}
          </p>
        </div>
      </footer>

      {/* ── Selection tray ─────────────────────────────────────── */}
      <AnimatePresence>
        {selectedProducts.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed inset-x-0 bottom-0 z-40 px-4 pb-4"
          >
            <div className="mx-auto flex max-w-5xl flex-col gap-3 border border-white/10 bg-catalog-ink/95 p-4 shadow-2xl backdrop-blur-md md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3 overflow-x-auto">
                <span className="shrink-0 text-sm font-semibold uppercase tracking-wider text-catalog-teal">
                  {selectedProducts.length} รายการ
                </span>
                <div className="flex gap-2">
                  {selectedProducts.map((p) => (
                    <span
                      key={p.id}
                      className="inline-flex shrink-0 items-center gap-1.5 border border-white/15 py-1 pl-3 pr-1.5 text-xs text-white/80"
                    >
                      {p.name}
                      <button
                        onClick={() => toggle(p.id)}
                        aria-label={`เอา ${p.name} ออก`}
                        className="flex h-5 w-5 items-center justify-center text-white/50 transition hover:bg-white/10 hover:text-white"
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
                  className="inline-flex items-center gap-1.5 border border-white/15 px-3 py-2.5 text-sm text-white/70 transition hover:border-white/40 hover:text-white"
                >
                  <Trash2 className="h-4 w-4" /> ล้าง
                </button>
                <button
                  onClick={() => openDemo(selectedProducts)}
                  className="inline-flex items-center gap-2 bg-catalog-teal px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-catalog-teal-dark"
                >
                  <Play className="h-4 w-4" /> เริ่มเดโม่
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Demo presentation overlay ──────────────────────────── */}
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

  // Portal to <body> so the overlay sits above everything regardless of where
  // it is mounted in the tree.
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex flex-col bg-catalog-ink"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-4 text-white">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-catalog-teal">
            {current.category} · {index + 1}/{list.length}
          </p>
          <h2 className="text-xl font-bold uppercase tracking-tight">
            {current.name}
          </h2>
        </div>
        <button
          onClick={onClose}
          aria-label="ปิดการนำเสนอ"
          className="flex h-10 w-10 items-center justify-center border border-white/15 text-white/80 transition hover:border-catalog-teal hover:text-catalog-teal"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Stage */}
      <div className="relative flex-1 overflow-hidden">
        {current.model ? (
          <ProductViewer key={current.id} modelUrl={current.model} />
        ) : (
          <div className="relative h-full w-full bg-catalog-ink">
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
              className="absolute left-6 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/15 bg-catalog-ink/70 text-white/80 backdrop-blur-md transition hover:border-catalog-teal hover:text-catalog-teal md:left-10"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="ถัดไป"
              className="absolute right-6 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/15 bg-catalog-ink/70 text-white/80 backdrop-blur-md transition hover:border-catalog-teal hover:text-catalog-teal md:right-10"
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
              className={`relative h-14 w-20 shrink-0 overflow-hidden border transition ${
                i === index
                  ? "border-catalog-teal"
                  : "border-white/15 opacity-60 hover:opacity-100"
              }`}
            >
              <Image src={p.img} alt={p.name} fill className="object-cover" />
              {p.model && (
                <span className="absolute bottom-0 right-0 bg-catalog-teal px-1 text-[9px] font-bold text-white">
                  3D
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </motion.div>,
    document.body,
  );
}
