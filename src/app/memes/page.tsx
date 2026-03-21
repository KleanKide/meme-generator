

import Image from "next/image";
import axios from "axios";
import Link from "next/link";
export interface IMems {
  box_count: number;
  captions: number;
  height: number;
  id: number;
  name: string;
  url: string;
  width: number;
}

    async function gettingClientMemo() {
      const response = await axios("https://api.imgflip.com/get_memes");
      return response.data.data.memes;
    }

export default async function Home() {
    const data = await gettingClientMemo();
  
  return (

  <div className="flex flex-wrap justify-center items-center gap-4 mt-12 px-24">
      {data.map((meme:IMems) => (
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