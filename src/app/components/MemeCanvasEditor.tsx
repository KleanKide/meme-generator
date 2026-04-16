"use client";
import React, { useEffect, useEffectEvent, useRef, useState } from "react";
import type { Meme } from "@/types/meme";
import CaptionLayersPanel from "./CaptionLayersPanel";

type Mems = {
  meme: Meme;
};

export interface IInput {
  id: number;
  value: string;
  x: number;
  y: number;
}

function MemeCanvasEditor({ meme }: Mems) {
  const [arrValue, setArrValue] = useState<IInput[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [draftValue, setDraftValue] = useState("");
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const drawCanvas = useEffectEvent(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imageRef.current;
    if (!canvas || !ctx || !img) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.font = "48px serif";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.textBaseline = "top";

    arrValue.forEach((el) => {
      ctx.strokeText(el.value, el.x, el.y);
      ctx.fillText(el.value, el.x, el.y);
    });
  });

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = meme.url;
    img.onload = () => {
      imageRef.current = img;
      drawCanvas();
    };
  }, [meme.url]);

  useEffect(() => {
    drawCanvas();
  }, [arrValue, meme.url]);

  function handleSave() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "canvas-image.png";
    link.href = dataURL;
    link.click();
  }

  function handleCreateBox() {
    const newItem = {
      id: Date.now(),
      value: "New text",
      x: 40,
      y: 40,
    };



    setArrValue((prev) => [...prev, newItem]);
    setSelectedId(newItem.id);
    setDraftValue(newItem.value);
  }

  function handleSelect(id: number) {
    setSelectedId(id);
    const currentValue = arrValue.find((item) => item.id === id)?.value ?? "";
    setDraftValue(currentValue);
  }

  function handleDraftChange(value: string) {
    setDraftValue(value);
  }

  function handleDelete(id: number) {
    setArrValue((prev) => prev.filter((elem) => elem.id !== id));

    if (selectedId === id) {
      setSelectedId(null);
      setDraftValue("");
    }
  }

  function handleDraftBlur() {
    if (selectedId === null) return;

    setArrValue((prev) =>
      prev.map((item) =>
        item.id === selectedId ? { ...item, value: draftValue } : item,
      ),
    );
  }

  function getCanvasCoordinates(
    event: React.MouseEvent<HTMLCanvasElement>,
  ) {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY,
    };
  }

  function findTextAtPosition(x: number, y: number) {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return null;

    ctx.font = "48px serif";

    for (let i = arrValue.length - 1; i >= 0; i -= 1) {
      const item = arrValue[i];
      const width = ctx.measureText(item.value).width;
      const height = 48;

      if (
        x >= item.x &&
        x <= item.x + width &&
        y >= item.y &&
        y <= item.y + height
      ) {
        return item;
      }
    }

    return null;
  }

  function handleMouseDown(event: React.MouseEvent<HTMLCanvasElement>) {
    const point = getCanvasCoordinates(event);
    if (!point) return;

    const target = findTextAtPosition(point.x, point.y);
    if (!target) return;

    setSelectedId(target.id);
    setDraftValue(target.value);
    setDraggingId(target.id);
    setDragOffset({
      x: point.x - target.x,
      y: point.y - target.y,
    });
  }

  function handleMouseMove(event: React.MouseEvent<HTMLCanvasElement>) {
    if (draggingId === null) return;

    const point = getCanvasCoordinates(event);
    if (!point) return;

    setArrValue((prev) =>
      prev.map((item) =>
        item.id === draggingId
          ? {
              ...item,
              x: point.x - dragOffset.x,
              y: point.y - dragOffset.y,
            }
          : item,
      ),
    );
  }

  function handleMouseUp() {
    setDraggingId(null);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
      <div className="panel rounded-[2rem] p-4 md:p-6">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="h-auto w-full rounded-[1.5rem] border border-white/60 bg-[#fff8ef] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
      </div>
      <aside className="panel space-y-5 rounded-[2rem] p-5 md:p-6">
        <div className="space-y-2">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent-strong)]">
            Controls
          </p>
          <h2 className="text-2xl font-black">Edit your caption layers</h2>
          <p className="text-sm leading-6 text-[var(--muted)]">
            Нажми на текст на холсте или в списке справа, измени значение в
            поле и кликни вне инпута, чтобы применить его.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleSave}
            className="brand-button brand-button--accent"
          >
            Save image
          </button>
          <button onClick={handleCreateBox} className="brand-button">
            Add text
          </button>
        </div>
        <CaptionLayersPanel
          arrValue={arrValue}
          selectedId={selectedId}
          draftValue={draftValue}
          onSelect={handleSelect}
          onDraftChange={handleDraftChange}
          onDraftBlur={handleDraftBlur}
          handleDelete={handleDelete}
        />
      </aside>
    </div>
  );
}

export default MemeCanvasEditor;
