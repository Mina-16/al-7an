// components/SongRow.jsx
import { Link } from "react-router-dom";
import Icon from "./Icon/Icon";

const SongRow = ({ id, title }) => {
  return (
    <Link
      to={`/player/${id}`}
      className="w-full flex items-center justify-between bg-slate-50 hover:bg-slate-100 rounded-2xl px-4 py-3 shadow-sm active:scale-[0.98] transition-transform"
    >
      <Icon name="stars" size="lg" />
      <div className="flex items-center justify-center gap-[25px]">
        <span className="flex-1 text-center font-semibold text-slate-800">{title}</span>
        <div className="w-[70px] h-[70px] rounded-full bg-[#4A90E2] flex items-center justify-center overflow-hidden border-2 border-blue-700">
          <img src="/images/angel.png" alt={title} />
        </div>
      </div>
    </Link>
  );
};

export default SongRow;