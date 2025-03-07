interface Props {
  onHoldStart: () => void;
  onHoldEnd: () => void;
  progress: number;
}

export const HoldButton = ({ onHoldStart, onHoldEnd, progress }: Props) => (
  <button
    onTouchStart={onHoldStart}
    onTouchEnd={onHoldEnd}
    onMouseDown={onHoldStart}
    onMouseUp={onHoldEnd}
    onMouseLeave={onHoldEnd}
    className="relative mx-auto rounded-lg w-48 h-[250px] overflow-hidden"
  >
    <div className="z-10 absolute inset-0">
      <img src="/cards/cardback.png" alt="Card Back" className="w-full h-full object-cover" />
    </div>
    <div
      className="bottom-0 z-20 absolute bg-amber-500/50 rounded-b-lg w-full"
      style={{
        height: `${progress}%`,
        transition: 'height 16ms linear',
      }}
    />
    <div className="z-30 absolute inset-0 flex justify-center items-center">
      <span className="drop-shadow-lg font-bold text-white text-xl">Mantener</span>
    </div>
  </button>
);
