import { Link } from "react-router-dom";
import { useCoins } from "../context/CoinsContext";

const IconArrowLeft = ({ className = "w-5 h-5" }) => (
  <img src="/icons/arrowCircleLeft.svg" alt="Arrow Left" className={className} />
);

export default function TopBar() {
  const { coins } = useCoins();

  return (
    <div className="flex items-end justify-between h-25 w-full bg-white px-4 pt-4 pb-4 shrink-0">
      <div className="flex items-center gap-1 bg-emerald-500 rounded-lg border-1 pl-3 pr-3 py-1">
        <span className="w-5 h-5 rounded-full bg-amber-400 text-white text-[10px] font-bold flex items-center justify-center">
          C
        </span>
        <span className="text-white text-sm font-bold">{coins}</span>
      </div>

      <Link to="/" className="flex items-center gap-3 text-slate-700 text-sm">
        <span>رجوع</span>
        <IconArrowLeft className="w-6 h-6" />
      </Link>
    </div>
  );
}