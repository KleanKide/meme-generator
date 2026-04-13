
import React from "react";
import Link from "next/link";
import Wrapper from "./components/Wrapper";
import CanvasApi from "./components/CanvasApi";
// import Canvas from "./components/Canvas";



async function page() {
  return (
    <>
      <p className="font-sans text-6xl text-gray-600 text-center font-bold">
        Добро пожаловать в генеретор мемов
      </p>
      <Wrapper>
        <CanvasApi/>
      </Wrapper>
    </>
  );
}

export default page;
