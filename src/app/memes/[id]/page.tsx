"use client";
import MemeCanvasEditor from "@/app/components/MemeCanvasEditor";
import { useEffect } from "react";
import { useStore } from "../../store/store";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams<{ id: string }>();
  const fetchMemes = useStore((state) => state.fetchMemes);
  const memes = useStore((state) => state.memes);
  const isLoading = useStore((state) => state.isLoading);
  const error = useStore((state) => state.error);

  useEffect(() => {
    if (memes.length === 0) {
      void fetchMemes();
    }
  }, [fetchMemes, memes.length]);

  const meme = memes.find((m: { id: string }) => m.id === params.id);

  if (isLoading && memes.length === 0) {
    return (
      <section className="shell pb-12">
        <div className="panel rounded-[2rem] px-6 py-12 text-center">
          <p className="text-lg font-semibold">Loading meme...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="shell pb-12">
        <div className="panel rounded-[2rem] px-6 py-12 text-center">
          <p className="text-lg font-semibold">{error}</p>
        </div>
      </section>
    );
  }

  if (!meme) {
    return (
      <section className="shell pb-12">
        <div className="panel rounded-[2rem] px-6 py-12 text-center">
          <p className="text-lg font-semibold">Meme not found</p>
        </div>
      </section>
    );
  }

  return (
    <section className="shell space-y-6 pb-12">
      <div className="space-y-3 px-1">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--accent-strong)]">
          Editor
        </p>
        <h1 className="text-3xl font-black md:text-5xl">{meme.name}</h1>
        <p className="max-w-2xl text-base leading-7 text-[var(--muted)]">
          Add captions, drag them directly on the canvas, and save the finished
          image with one click.
        </p>
      </div>
      <MemeCanvasEditor meme={meme} />
    </section>
  );
}
