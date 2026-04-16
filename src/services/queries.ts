import type { Meme } from "@/types/meme";

interface ImgflipResponse {
  success: boolean;
  data?: {
    memes?: Meme[];
  };
}

export async function getMemesQuery(): Promise<Meme[]> {
  const response = await fetch("https://api.imgflip.com/get_memes", {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Imgflip request failed with status ${response.status}`);
  }

  const data = (await response.json()) as ImgflipResponse;

  if (!data.success || !data.data?.memes) {
    throw new Error("Imgflip returned an invalid memes payload");
  }

  return data.data.memes;
}

export async function fetchMemes(): Promise<Meme[]> {
  const response = await fetch("/api/memes");

  if (!response.ok) {
    throw new Error(`Backend request failed with status ${response.status}`);
  }

  return (await response.json()) as Meme[];
}
