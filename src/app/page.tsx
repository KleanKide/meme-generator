import React from "react";
import Link from "next/link";
import axios from "axios";
import Wrapper from "./components/Wrapper";

async function gettingClientMemo() {
  const response = await axios("https://api.imgflip.com/get_memes");
  return response.data.data.memes;
}

async function page() {
  const data = await gettingClientMemo();
  return (
    <>
      <p className="font-sans text-6xl text-gray-600 text-center font-bold">
        Добро пожаловать в генеретор мемов
      </p>
      <Wrapper />
    </>
  );
}

export default page;
