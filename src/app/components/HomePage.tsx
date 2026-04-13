"use client";
import React, { useEffect, useRef, useState } from "react";
import myPhoto from "../../../public/images/myPhoto.png";

type Props = {};

function CanvasApi({}: Props) {
  const [canvasCtx, setCanvasCtx] = useState(null);
  const canvasRef = useRef(null);
  useEffect(() => {
    function draw() {
      const canvas = canvasRef.current;
      if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.src = myPhoto.src;
        img.onload = function () {
          ctx.drawImage(img, 0, 0, 800, 600);
          ctx.beginPath();
          ctx.moveTo(30, 96);
          ctx.lineTo(70, 66);
          ctx.lineTo(103, 76);
          ctx.lineTo(170, 15);
          ctx.stroke();
          setCanvasCtx(canvas);
        };
      }
    }

    draw();
  }, []);
  function handleSave() {
    const dataURL = canvasCtx.toDataURL("image/png");
    const link = document.createElement('a');
    link.download = 'canvas-image.png';
    link.href = dataURL;
    link.click();
  }

  return (
    <div>
      <canvas ref={canvasRef} width={800} height={900}>
        {" "}
      </canvas>
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default CanvasApi;
