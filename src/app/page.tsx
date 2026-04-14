import React from "react";
import Link from "next/link";
import Wrapper from "./components/Wrapper";
import HomePage from "./components/HomePage";

async function page() {
  return (
    <div className="space-y-8 pb-12">
      <section className="shell grid gap-6 pt-4 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div className="space-y-5">
          <p className="inline-flex rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent-strong)]">
            Meme generator playground
          </p>
          <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
            Делай мемы быстро, чисто и без лишней боли в интерфейсе.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-[var(--muted)]">
            Открой шаблон, расставь подписи прямо на холсте и сразу сохрани
            готовую картинку. Здесь всё собрано вокруг одного сценария:
            выбрать, написать, подвигать, скачать.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/memes" className="brand-button brand-button--accent">
              Open templates
            </Link>
            <a href="#preview" className="brand-button">
              See preview
            </a>
          </div>
        </div>
        <div className="panel relative overflow-hidden rounded-[2rem] p-6">
          <div className="absolute inset-x-8 top-0 h-32 rounded-b-full bg-[radial-gradient(circle,_rgba(232,111,61,0.26),_transparent_70%)]" />
          <div className="relative space-y-4">
            <div className="flex items-center justify-between rounded-2xl bg-white/70 px-4 py-3">
              <span className="text-sm font-semibold text-[var(--muted)]">
                Current flow
              </span>
              <span className="rounded-full bg-[var(--ink)] px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[var(--surface-strong)]">
                Live
              </span>
            </div>
            <div className="grid gap-3">
              {[
                "1. Pick a meme template",
                "2. Add text blocks to canvas",
                "3. Drag captions into place",
                "4. Save as image",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/60 bg-[var(--surface-strong)]/85 px-4 py-4 text-base font-semibold"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Wrapper>
        <div id="preview">
          <HomePage />
        </div>
      </Wrapper>
    </div>
  );
}

export default page;
