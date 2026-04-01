"use client";
import React, { useEffect, useState } from "react";
import { IMems } from "../memes/page";
import Image from "next/image";
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
  const sensors = useSensors(useSensor(PointerSensor));


  console.log(arrValue)
  function handleDragEnd(event) {
  const { active, delta } = event;

  setArrValue((prev) =>
    prev.map((item) =>
      item.id === active.id
        ? {
            ...item,
            x: item.x + delta.x,
            y: item.y + delta.y,
          }
        : item
    )
  );
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
      <div>
<DndContext sensors={sensors} onDragEnd={handleDragEnd}>
  <Drag arrValue={arrValue} setArrValue={setArrValue} />
</DndContext>
      </div>
    </div>
  );
}

export default Canvas;
