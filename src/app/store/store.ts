import { create } from "zustand";
import type { Meme } from "@/types/meme";
import { fetchMemes as fetchMemesFromApi } from "@/services/queries";

interface StoreState {
  memes: Meme[];
  isLoading: boolean;
  error: string | null;
  fetchMemes: () => Promise<void>;
}

export const useStore = create<StoreState>((set) => ({
  memes: [],
  isLoading: false,
  error: null,
  async fetchMemes() {
    set({ isLoading: true, error: null });

    try {
      const memes = await fetchMemesFromApi();
      set({ memes, isLoading: false });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to fetch memes";

      set({ error: message, isLoading: false });
    }
  },
}));
