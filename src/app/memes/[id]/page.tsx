import Canvas from "@/app/components/Canvas";
import axios from "axios";


type Props = {
  params: Promise<{ id: string }>;
};

export default async function PostPage({ params }: Props) {
  const { id } = await params;
  const res = await axios.get(`https://api.imgflip.com/get_memes`);
  const memes = res.data.data.memes;
  const meme = memes.find((m: { id: string; }) => m.id === id);

  if (!meme) {
    return <p>Meme not found</p>;
  }

  return (
    <div>
      < Canvas meme={meme}/>
    </div>
  );
}