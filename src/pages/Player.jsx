import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import {
//   IconChevronDown,
//   IconSpeaker,
//   IconHeart,
//   IconShuffle,
//   IconSkipBack,
//   IconSkipForward,
//   IconPlay,
//   IconPause,
//   IconRepeat,
//   ImagePlaceholder,
// } from "../components/Icons";
import { songs } from "../data/songs";

export default function Player() {
  const { id } = useParams();
  const navigate = useNavigate();
  const song = songs.find((s) => s.id === id) || songs[0];

  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [progress, setProgress] = useState(35);

  return (
    <div className="relative w-full h-full bg-blue-500 overflow-hidden flex flex-col px-6 pt-6 pb-8">
      {/* الهيدر */}
      <div className="flex items-center justify-between flex-shrink-0">
        <button onClick={() => navigate(-1)} className="text-white active:scale-90 transition-transform">
          {/* <IconChevronDown className="w-7 h-7" /> */}
        </button>
        <button className="text-white active:scale-90 transition-transform">
          {/* <IconSpeaker /> */}
        </button>
      </div>

      {/* الغلاف */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6 min-h-0">
        {/* <ImagePlaceholder className="w-full max-w-[280px] aspect-square rounded-2xl" label="صورة الغلاف" /> */}

        <div className="flex items-center gap-3">
          <button onClick={() => setLiked((v) => !v)} className="text-white active:scale-90 transition-transform">
            {/* <IconHeart filled={liked} className="w-6 h-6" /> */}
          </button>
          <h2 className="text-white text-xl font-bold">{song.title}</h2>
        </div>

        {/* شريط التقدم */}
        <div className="w-full px-2">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className="w-full accent-white h-1 cursor-pointer"
          />
        </div>
      </div>

      {/* أزرار التحكم */}
      <div className="flex items-center justify-between px-2 pb-2 flex-shrink-0">
        <button className="text-white/90 active:scale-90 transition-transform">
          {/* <IconShuffle /> */}
        </button>
        <button className="text-white active:scale-90 transition-transform">
          {/* <IconSkipBack /> */}
        </button>
        <button
          onClick={() => setIsPlaying((v) => !v)}
          className="w-16 h-16 rounded-full bg-white text-blue-500 flex items-center justify-center shadow-lg active:scale-90 transition-transform"
        >
          {/* {isPlaying ? <IconPause /> : <IconPlay className="w-8 h-8 -mr-1" />} */}
        </button>
        <button className="text-white active:scale-90 transition-transform">
          {/* <IconSkipForward /> */}
        </button>
        <button className="text-white/90 active:scale-90 transition-transform">
          {/* <IconRepeat /> */}
        </button>
      </div>
    </div>
  );
}