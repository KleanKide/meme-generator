"use client";
import React, { useEffect, useRef, useState } from "react";
import { IMems } from "../memes/page";
// import Image from "next/image";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Drag from "./Drag";

type Mems = {
  meme: IMems;
};
export interface IInput {
  id: number;
  value: string | number;
  x: number;
  y: number;
}

function Canvas({ meme }: Mems) {
  const [arrValue, setArrValue] = useState<IInput[]>([]);
  const [canvasCtx, setCanvasCtx] = useState(null);
  const sensors = useSensors(useSensor(PointerSensor));
  const canvasRef = useRef(null);

  useEffect(() => {
    function draw() {
      const canvas = canvasRef.current;
      if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.src = meme.url;
        img.onload = function () {
          ctx.drawImage(img, 0, 0, 800, 600);
           ctx.font = "48px serif";
           ctx.fillStyle = "white";
           ctx.textBaseline = "top";
          arrValue.forEach(el=>ctx.fillText(el.value, el.x, el.y))
          
          setCanvasCtx(canvas);
        };
      }
    }

    draw();
  }, [arrValue, meme.url]);

  console.log(arrValue);
  function handleDragEnd(event: { active: any; delta: any }) {
    const { active, delta } = event;

    setArrValue((prev) =>
      prev.map((item) =>
        item.id === active.id
          ? {
              ...item,
              x: item.x + delta.x,
              y: item.y + delta.y,
            }
          : item,
      ),
    );
  }

  return (
    <div>
      <p>{meme.name}</p>
        <canvas ref={canvasRef} width={800} height={900}>
        {" "}
      </canvas>
      <div>
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <Drag arrValue={arrValue} setArrValue={setArrValue} />
        </DndContext>
      </div>
    </div>
  );
}

export default Canvas;
