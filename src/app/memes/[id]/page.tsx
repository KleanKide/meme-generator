import axios from "axios";
import Image from "next/image";

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
      <p>{meme.name}</p>
      <Image
        src={meme.url}
        width={meme.width}
        height={meme.height}
        alt={meme.name}
      />
    </div>
  );
}
