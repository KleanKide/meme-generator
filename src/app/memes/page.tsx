"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useStore } from "../store/store";
import type { Meme } from "@/types/meme";

export default function Home() {
  const fetchMemes = useStore((state) => state.fetchMemes);
  const memes = useStore((state) => state.memes);
  const isLoading = useStore((state) => state.isLoading);
  const error = useStore((state) => state.error);

  useEffect(() => {
    if (memes.length === 0) {
      void fetchMemes();
    }
  }, [fetchMemes, memes.length]);

  return (
    <section className="shell space-y-8 pb-12">
      <div className="space-y-3 px-1">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--accent-strong)]">
          Templates
        </p>
        <h1 className="text-4xl font-black md:text-5xl">
          Выбери основу для следующего мема.
        </h1>
        <p className="max-w-2xl text-base leading-7 text-[var(--muted)]">
          Здесь собраны шаблоны из `imgflip`. Нажми на карточку, и сразу
          откроется редактор с холстом и управлением текстом.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {isLoading && memes.length === 0 ? (
          <div className="panel rounded-[1.75rem] px-5 py-6 text-sm text-[var(--muted)]">
            Loading meme templates...
          </div>
        ) : null}

        {error ? (
          <div className="panel rounded-[1.75rem] px-5 py-6 text-sm text-[var(--accent-strong)]">
            {error}
          </div>
        ) : null}

        {memes.map((meme: Meme) => (
          <Link
            key={meme.id}
            href={`/memes/${meme.id}`}
            className="panel group overflow-hidden rounded-[1.75rem] transition duration-200 hover:-translate-y-1"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                loading="lazy"
                className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                src={meme.url}
                width={600}
                height={450}
                alt={meme.name}
              />
            </div>
            <div className="space-y-2 px-5 py-5">
              <h2 className="text-lg font-bold leading-6">{meme.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
