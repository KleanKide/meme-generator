import { create } from "zustand";
import type { Meme } from "@/types/meme";

interface StoreState {
  memes: Meme[];
  gettingClientMemo: () => Promise<void>;
}

export const useStore = create<StoreState>((set) => ({
  memes: [],
  async gettingClientMemo() {
    const response = await fetch("https://api.imgflip.com/get_memes");
    const data = await response.json();

    set({ memes: data.data.memes });
  },
}));
