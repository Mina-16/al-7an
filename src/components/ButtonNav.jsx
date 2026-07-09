import { Link } from "react-router-dom";
import Icon from "./Icon/Icon";

export default function BottomNav() {
  return (
    <div className="absolute bg-white bottom-0 left-0 right-0 flex items-center w-full h-15 justify-between px-10 py-4 ">
      <Link to="/" className="text-slate-700 active:scale-90 transition-transform">
      <Icon name="home"/>
      </Link>
      <button className="absolute left-1/2 -translate-x-1/2 -top-6 w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-300 active:scale-90 transition-transform">
      <Icon name="stars"/>

      </button>
      <button className="text-slate-700 active:scale-90 transition-transform">
      <Icon name="bel"/>

      </button>
    </div>
  );
}