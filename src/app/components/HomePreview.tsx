"use client";
import Link from "next/link";
import React, { useEffect, useRef } from "react";

const previewMeme = {
  name: "One Does Not Simply",
  url: "https://i.imgflip.com/1bij.jpg",
};

function HomePreview() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = previewMeme.url;
    img.onload = function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(20, 13, 8, 0.42)";
      ctx.fillRect(0, 0, canvas.width, 78);
      ctx.fillRect(0, canvas.height - 102, canvas.width, 102);

      ctx.font = '700 42px "Arial Black", sans-serif';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#1a120b";
      ctx.fillStyle = "#fff8ef";

      ctx.strokeText("MAKE YOUR FIRST MEME", canvas.width / 2, 40);
      ctx.fillText("MAKE YOUR FIRST MEME", canvas.width / 2, 40);
      ctx.strokeText("IN A FEW CLICKS", canvas.width / 2, canvas.height - 52);
      ctx.fillText("IN A FEW CLICKS", canvas.width / 2, canvas.height - 52);
    };
  }, []);

  return (
    <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
      <div className="space-y-5 px-2 py-2 md:px-4">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--accent-strong)]">
          Start Simple
        </p>
        <h2 className="text-3xl font-black leading-tight md:text-5xl">
          Build your first meme and jump into the editor in one click.
        </h2>
        <p className="max-w-xl text-base leading-7 text-[var(--muted)]">
          Start with a ready-made preview, then head to the template gallery and
          pick any meme from the collection to customize.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/memes" className="brand-button brand-button--accent">
            Open templates
          </Link>
        </div>
      </div>

      <div className="panel demo-float overflow-hidden rounded-[1.75rem] p-3">
        <div className="overflow-hidden rounded-[1.35rem] border border-white/60 bg-[#2a1f18] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
          <canvas
            ref={canvasRef}
            width={710}
            height={520}
            className="h-auto w-full rounded-[1rem] border border-white/10 bg-[#241912]"
          >
            {" "}
          </canvas>
        </div>
      </div>
    </div>
  );
}

export default HomePreview;
