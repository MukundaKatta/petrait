"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";

export default function TryPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [styled, setStyled] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      setPreview(src);
      setStyled(null);
      applyNapoleonStyle(src);
    };
    reader.readAsDataURL(file);
  }, []);

  function applyNapoleonStyle(src: string) {
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Draw base image
      ctx.drawImage(img, 0, 0);

      // Sepia filter via pixel manipulation
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2];
        // Sepia
        data[i]     = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
        data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
        data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
        // Boost contrast
        for (let c = 0; c < 3; c++) {
          const idx = i + c;
          data[idx] = Math.min(255, Math.max(0, (data[idx] - 128) * 1.4 + 128));
        }
      }
      ctx.putImageData(imageData, 0, 0);

      // Warm amber overlay
      ctx.globalAlpha = 0.15;
      ctx.fillStyle = "#b45309";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;

      // Crown emoji overlay — centered top area
      const crownSize = Math.min(canvas.width, canvas.height) * 0.25;
      ctx.font = `${crownSize}px serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText("👑", canvas.width / 2, canvas.height * 0.02);

      setStyled(canvas.toDataURL("image/png"));
    };
    img.src = src;
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) handleFile(file);
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Nav */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-500" />
          Petrait
        </Link>
        <Link
          href="/#waitlist"
          className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
        >
          Get early access
        </Link>
      </nav>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="text-center mb-10">
          <p className="mb-3 inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-700">
            Napoleon style — preview
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Your pet. As Napoleon.
          </h1>
          <p className="mt-4 text-neutral-600">
            Upload a photo and see the royal treatment. Download yours below.
          </p>
        </div>

        {/* Upload zone */}
        {!preview && (
          <div
            className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-neutral-300 bg-neutral-50 px-8 py-20 text-center cursor-pointer hover:border-amber-400 hover:bg-amber-50 transition"
            onClick={() => fileRef.current?.click()}
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className="text-5xl mb-4">🐾</div>
            <p className="text-base font-medium text-neutral-700">Drop a pet photo here</p>
            <p className="mt-1 text-sm text-neutral-400">or click to browse — JPG, PNG, WebP</p>
          </div>
        )}

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onInputChange}
        />

        {/* Hidden canvas for processing */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Results */}
        {preview && (
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-neutral-400">Original</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview}
                alt="Original pet photo"
                className="w-full rounded-2xl object-cover aspect-square"
              />
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-amber-600">Napoleon style</p>
              {styled ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={styled}
                    alt="Napoleon style portrait"
                    className="w-full rounded-2xl object-cover aspect-square"
                  />
                  <a
                    href={styled}
                    download="petrait-napoleon.png"
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-amber-500 px-6 py-3 font-medium text-white transition hover:bg-amber-600"
                  >
                    ⬇ Download portrait
                  </a>
                  <p className="mt-2 text-center text-xs text-neutral-400">
                    Tip: right-click → Save image as for full resolution
                  </p>
                </>
              ) : (
                <div className="flex aspect-square w-full items-center justify-center rounded-2xl bg-neutral-100 text-neutral-400">
                  Processing…
                </div>
              )}
            </div>
          </div>
        )}

        {preview && (
          <div className="mt-8 text-center">
            <button
              onClick={() => { setPreview(null); setStyled(null); }}
              className="text-sm text-neutral-500 underline hover:text-neutral-700"
            >
              Try a different photo
            </button>
          </div>
        )}

        <div className="mt-16 rounded-2xl bg-amber-50 border border-amber-200 px-8 py-8 text-center">
          <p className="text-lg font-semibold text-neutral-900">Want all 40 styles?</p>
          <p className="mt-2 text-sm text-neutral-600">Join the waitlist and be the first in when we launch.</p>
          <Link
            href="/#waitlist"
            className="mt-5 inline-block rounded-full bg-neutral-900 px-7 py-3 font-medium text-white transition hover:bg-neutral-700"
          >
            Join the waitlist
          </Link>
        </div>
      </main>

      <footer className="border-t border-neutral-200 mt-12">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 text-sm text-neutral-500">
          <p className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-amber-500" />
            Petrait
          </p>
          <p>© 2026</p>
        </div>
      </footer>
    </div>
  );
}
