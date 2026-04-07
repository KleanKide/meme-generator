import { create } from "zustand";
export const useStore = create((set)=>({
  memes: [],
  async gettingClientMemo(){
  const response = await fetch("https://api.imgflip.com/get_memes");
  const data = await response.json();
   set({memes: data.data.memes}) 
  }
}))