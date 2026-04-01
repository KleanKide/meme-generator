import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { IInput } from "./Canvas";

interface DragProps {
  arrValue: IInput[];
  setArrValue: React.Dispatch<React.SetStateAction<IInput[]>>;
}

interface DraggableContentProps {
  value: string | number;
  id: number;
  x: number;
  y: number;
}

function DraggableContent({ value, id, x, y }: DraggableContentProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
    });

  const style = {
    left: x,
    top: y,
    transform: CSS.Translate.toString(transform),
  };

  return (
    <>
      <div
        ref={setNodeRef}
        className={`
  absolute  w-20 h-20 text-white flex items-center justify-center cursor-grab select-none text-5xl
  ${value ? "bg-gray-0" : "bg-gray-300"}
`}
        style={style}
        {...listeners}
        {...attributes}
      >
        {value}
      </div>
    </>
  );
}

function Drag({ arrValue, setArrValue }: DragProps) {
  const [selectedId, setSelectedId] = useState();
  const [value, setValue] = useState("");

  function handleClick(id) {
    setSelectedId(id);
    console.log("выбран ID", id);
  }
  function handleChange(e) {
    const event = e.target.value;
    setArrValue((prev) =>
      prev.map((el) => {
        if (el.id === selectedId)
          return {
            ...el,
            value: event,
          };
        return el;
      }),
    );
  }

  function handleCreateBox() {
    setArrValue((prev) => [
      ...prev,
      {
        value: value,
        id: Date.now(),
        x: 20,
        y: 20,
      },
    ]);
  }

  return (
    <>
      <button onClick={handleCreateBox}>Button</button>

      {arrValue.map((el) => (
        <div
          className=" w-50 h-10  m-5 cursor-pointer border-none bg-gray-400 flex"
          key={el.id}
          onClick={() => handleClick(el.id)}
        >
          <DraggableContent
            key={el.id}
            value={el.value}
            id={el.id}
            x={el.x}
            y={el.y}
          />
          {el.value}
        </div>
      ))}
      <input
        type="text"
        className="outline"
        value={arrValue.find((el) => el.id === selectedId)?.value || ""}
        onChange={(e) => handleChange(e)}
      />
    </>
  );
}

export default Drag;
