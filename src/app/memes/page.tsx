"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useStore } from "../store/store";
export interface IMems {
  box_count: number;
  captions: number;
  height: number;
  id: number;
  name: string;
  url: string;
  width: number;
}

export default function Home() {
  const gettingClientMemo = useStore((state) => state.gettingClientMemo);
  const memes = useStore((state) => state.memes);

  useEffect(() => {
    gettingClientMemo();
  }, [gettingClientMemo]);

  return (
    <div className="flex flex-wrap justify-center items-center gap-4 mt-12 px-24">
      {memes.map((meme: IMems) => (
        <Link key={meme.id} href={`/memes/${meme.id}`}>
          <Image
            loading="lazy"
            className="w-100 h-85"
            src={meme.url}
            width={300}
            height={200}
            alt={meme.name}
          />
        </Link>
      ))}
    </div>
  );
}
