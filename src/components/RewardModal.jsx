// import { ImagePlaceholder } from "./Icons";

export default function RewardModal({ points, onClaim }) {
  return (
    <div className="absolute inset-0 z-50 flex items-end">
      {/* خلفية معتمة */}
      <div className="absolute inset-0 bg-black/40" onClick={onClaim} />

      {/* الكارت */}
      <div className="relative w-full bg-white rounded-t-4xl px-6 pt-10 pb-8 flex flex-col items-center gap-4 z-10">
        {/* <ImagePlaceholder className="w-28 h-28 rounded-xl" label="شخصية الفوز" /> */}
        <h2 className="text-blue-500 text-2xl font-extrabold">{points} نقاط</h2>
        <button
          onClick={onClaim}
          className="w-full bg-blue-500 text-white font-bold py-3 rounded-full active:scale-95 transition-transform"
        >
          المطالبة الآن
        </button>
      </div>
    </div>
  );
}