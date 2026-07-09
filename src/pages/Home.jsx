import { Link } from "react-router-dom";
// import { ImagePlaceholder } from "../components/Icons";
import BottomNav from "../components/ButtonNav";
import Human from "../components/Human";
import Box from "../components/Box";

const cards = [
  {
    key: "heroes",
    title: "أبطال التسبيح",
    color: "bg-rose-500",
    img: "king",
    to: "/songs",
  },
  {
    key: "yearly",
    title: " العب معانا",
    color: "bg-amber-400",
    img: "clender",
    to: "/flip-cards",
  },
  {
    key: "songs",
    title: "قصص الالحان",
    color: "bg-fuchsia-500",
    img: "musicBook",
    to: "./stories",
  },
  {
    key: "reward",
    title: "مكافاه",
    color: "bg-emerald-500",
    img: "box",
    to: "/spin",
  },
];

export default function Home() {
  return (
    <div className="relative w-full h-full bg-slate-100 overflow-hidden flex flex-col">
      {/* الهيدر */}
      <div className="bg-[#4A90E2] rounded-b-[90px] w-full h-[420px] pt-[24px] px-[20px] relative flex-shrink-0">
        <Link to="/profile">
          <Human />
        </Link>
        <div className="flex flex-col items-center gap-[9px] w-full absolute top-[70px] left-0 right-0 px-[20px]">
          <img src="/images/boat.png" className="w-50 h-50 object-cover" />
          <h1 className="text-blue-500">سفينه التسبيح</h1>
        </div>
      </div>

      {/* الشبكة */}
      <div className="grid grid-cols-2 gap-8 px-5 pt-6 mb-4 flex-1 overflow-y-auto -translate-y-1/6">
        {cards.map((c) => (
          <Box
            key={c.key}
            color={c.color}
            img={c.img}
            title={c.title}
            to={c.to}
            noLink={!c.to}
          />
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
