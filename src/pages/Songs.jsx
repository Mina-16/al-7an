import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { IconChevronLeft, IconSparkle, ImagePlaceholder } from "../components/Icons";
import { songs } from "../data/songs";
import BottomNav from "../components/ButtonNav";
import Human from "../components/Human";
import Icon from "../components/Icon/Icon";
import FilterButton from "../components/FilterButton";
import SongRow from "../components/SongRow";

export default function Songs() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("today");

  const filters = [
    { key: "today", label: "تسبيحه اليوم" },
    { key: "elders", label: "اضف القدسين" },
    { key: "doxologies", label: "ذكصولوجيات" },
  ];

  return (
    <div className="relative w-full min-h-screen bg-slate-100 overflow-hidden flex flex-col ">
      {/* الهيدر */}
      <div className="flex items-center justify-between px-5 pt-6 pb-3 flex-shrink-0">

        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-[#D9D9D9] flex items-center justify-center -translate-y-1/3 active:scale-90 transition-transform">
            <Icon name="arrowLeft"/>
        </button>
        <h1 className="text-xl font-bold text-slate-800">شاشه الالحان</h1>
        <Human/>
      </div>

      {/* أزرار التصنيف */}
      <div className="flex items-center justify-center gap-2 px-4 pb-4">
        {filters.map((f) => (
    <FilterButton
    key={f.key}
    label={f.label}
    active={filter === f.key}
    onClick={() => setFilter(f.key)}
  />
        ))}
      </div>

      {/* القائمة */}
      <div className="flex-1 max-h-[75vh] overflow-y-auto px-4 space-y-[16px] pb-20 pt-6">
{songs.map((song) => (
  <SongRow key={song.id} id={song.id} title={song.title} />
))}
      </div>

      <BottomNav/>
    </div>
  );
}