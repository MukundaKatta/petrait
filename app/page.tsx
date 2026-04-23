"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {
      // silent
    }
  }

  return (
    <>
      {/* Nav */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-500" />
          Petrait
        </a>
        <div className="flex items-center gap-4 text-sm">
          <a href="#demo" className="hidden sm:inline hover:opacity-70">See a demo</a>
          <Link
            href="/try"
            className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
          >
            Try it
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 -z-10 h-[500px] bg-gradient-to-b from-amber-100 via-amber-50 to-transparent opacity-60" />
        <div className="mx-auto max-w-4xl px-6 pt-20 pb-20 text-center sm:pt-28">
          <p className="mb-5 inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-700">
            Consumer AI
          </p>
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-neutral-900 sm:text-7xl">
            Your dog. As Napoleon.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600 sm:text-xl">
            AI portraits of your pet in any style — royal, Renaissance, astronaut, wizard. Made for your wall.
          </p>

          {submitted ? (
            <p className="mt-12 text-sm font-medium text-amber-700">
              Thanks. We will ping you the day we launch.
            </p>
          ) : (
            <form
              id="waitlist"
              onSubmit={handleSubmit}
              className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
            >
              <input
                type="email"
                placeholder="you@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-full border border-neutral-300 bg-white px-5 py-3.5 text-base placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/10 sm:w-80"
              />
              <button
                type="submit"
                className="rounded-full bg-neutral-900 px-7 py-3.5 font-medium text-white transition hover:bg-neutral-700"
              >
                Join the waitlist
              </button>
            </form>
          )}

          <p className="mt-6 text-xs text-neutral-400">
            Early access list is open. First 100 get in free forever.
          </p>
        </div>
      </section>

      {/* Demo */}
      <section id="demo" className="border-y border-neutral-200 bg-neutral-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-600">Live preview</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">See it in action</h2>
          </div>
          <div className="mt-12">
            <div className="mx-auto max-w-2xl grid grid-cols-3 gap-4">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-amber-200 via-orange-300 to-red-300 flex items-center justify-center text-6xl">👑</div>
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-200 via-indigo-300 to-purple-300 flex items-center justify-center text-6xl">🧙</div>
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-gray-200 via-slate-300 to-gray-400 flex items-center justify-center text-6xl">🚀</div>
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-emerald-200 via-green-300 to-teal-300 flex items-center justify-center text-6xl">🎨</div>
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-pink-200 via-rose-300 to-fuchsia-300 flex items-center justify-center text-6xl">🎸</div>
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-stone-300 to-stone-500 flex items-center justify-center text-6xl text-white">+34</div>
            </div>
            <p className="mt-4 text-center text-sm text-neutral-500">Your dog. Forty styles. One afternoon.</p>
            <div className="mt-8 text-center">
              <Link
                href="/try"
                className="inline-block rounded-full bg-amber-500 px-7 py-3.5 font-medium text-white transition hover:bg-amber-600"
              >
                Try the Napoleon style →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What you get</h2>
          </div>
          <div className="mt-12 grid gap-12 sm:grid-cols-3">
            <div>
              <div className="text-3xl">🐕</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">Dogs, cats, whatever</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">Horses, parrots, bearded dragons. If you love it, we can portrait it.</p>
            </div>
            <div>
              <div className="text-3xl">👑</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">Forty painterly styles</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">Baroque royalty. Pixar cartoon. Album cover. Pick any.</p>
            </div>
            <div>
              <div className="text-3xl">🖼️</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">Print-quality exports</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">High-res files ready to frame or print. Canvas in one tap.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-neutral-200 bg-neutral-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-600">How it works</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Three steps. No learning curve.</h2>
          </div>
          <div className="mt-12 grid gap-12 sm:grid-cols-3">
            <div>
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">1</div>
              <h3 className="text-lg font-semibold tracking-tight">Upload your pet</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">A clear photo is all we need. No special angles required.</p>
            </div>
            <div>
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">2</div>
              <h3 className="text-lg font-semibold tracking-tight">Pick a style</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">Royal, Pixar, Renaissance, astronaut — forty options and counting.</p>
            </div>
            <div>
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">3</div>
              <h3 className="text-lg font-semibold tracking-tight">Download and frame</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">Print-ready. Wall-ready. Gift-ready. In seconds.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-6 py-28 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          Be the first in line.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-neutral-600">
          Early access starts soon. Get on the list and we will reach out the moment we open the doors.
        </p>
        <a
          href="#waitlist"
          className="mt-8 inline-block rounded-full bg-amber-600 px-7 py-3.5 font-medium text-white transition hover:bg-amber-700"
        >
          Reserve my spot
        </a>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 text-sm text-neutral-500">
          <p className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-amber-500" />
            Petrait
          </p>
          <p>© 2026</p>
        </div>
      </footer>
    </>
  );
}
