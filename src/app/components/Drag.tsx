import { IInput } from "./Canvas";

interface DragProps {
  arrValue: IInput[];
  selectedId: number | null;
  draftValue: string;
  onSelect: (id: number) => void;
  onDraftChange: (value: string) => void;
  onDraftBlur: () => void;
  handleDelete: (id: number) => void;
}

function Drag({
  arrValue,
  selectedId,
  draftValue,
  onSelect,
  onDraftChange,
  onDraftBlur,
  handleDelete,
}: DragProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
          Layers
        </p>
        <div className="space-y-2">
          {arrValue.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[var(--line)] px-4 py-5 text-sm leading-6 text-[var(--muted)]">
              Пока нет ни одного текстового слоя. Нажми `Add text`, и он сразу
              появится здесь и на канвасе.
            </div>
          ) : null}

          {arrValue.map((el, index) => (
            <div key={el.id} className="flex items-center gap-2">
              <button
                type="button"
                className={`block w-full rounded-2xl border px-4 py-3 text-left transition ${
                  selectedId === el.id
                    ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                    : "border-[var(--line)] bg-white/65 hover:bg-white"
                }`}
                onClick={() => onSelect(el.id)}
              >
                <span className="block text-xs font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
                  Layer {index + 1}
                </span>
                <span className="mt-1 block text-sm font-semibold text-[var(--ink)]">
                  {el.value || "Empty text"}
                </span>
              </button>
              <button
                type="button"
                onClick={() => handleDelete(el.id)}
                className="rounded-full border border-[var(--line)] px-3 py-2 text-sm font-semibold text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent-strong)]"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      <input
        type="text"
        className="brand-input"
        value={draftValue}
        onChange={(e) => onDraftChange(e.target.value)}
        onBlur={onDraftBlur}
        placeholder="Type text and click outside"
      />
    </div>
  );
}

export default Drag;
