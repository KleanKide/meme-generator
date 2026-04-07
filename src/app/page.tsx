import React from "react";
import Link from "next/link";
import Wrapper from "./components/Wrapper";
// import Canvas from "./components/Canvas";



async function page() {
  return (
    <>
      <p className="font-sans text-6xl text-gray-600 text-center font-bold">
        Добро пожаловать в генеретор мемов
      </p>
      <Wrapper></Wrapper>
    </>
  );
}

export default page;
