"use client";
import Canvas from "@/app/components/Canvas";
import { useEffect } from "react";
import { useStore } from "../../store/store";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const gettingClientMemoById = useStore(
    (state) => state.gettingClientMemo,
  );
  const memes = useStore((state) => state.memes);

  useEffect(() => {
    gettingClientMemoById(params.id);
  }, [gettingClientMemoById, params.id]);

  const meme = memes.find((m: { id: string }) => m.id === params.id);

  if (!meme) {
    return <p>Meme not found</p>;
  }

  return (
    <div>
      <Canvas meme={meme} />
    </div>
  );
}
