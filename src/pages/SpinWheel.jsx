import { useEffect, useState, useRef } from "react";
import TopBar from "../components/TopBar";
import BottomNav from "../components/ButtonNav";
import RewardModal from "../components/RewardModal";
import { useCoins } from "../context/CoinsContext";

const VALUES = [5, 10, 15, 20, 25, 30, 35, 40];
const COLORS = [
  "#38BDF8", // 5  - blue
  "#22C55E", // 10 - green
  "#EAB308", // 15 - yellow
  "#F97316", // 20 - orange
  "#EF4444", // 25 - red
  "#A855F7", // 30 - purple
  "#22C55E", // 35 - green
  "#F97316", // 40 - orange
];
const SEGMENT_ANGLE = 360 / VALUES.length;
const MAX_DAILY_SPINS = 3;
const STORAGE_KEY = "dailySpinData";

// نص البانر حسب رقم المحاولة (0 = هتلعب اول مرة، 1 = ثاني مرة، 2 = تالت مرة)
const ATTEMPT_LABELS = ["تدور اول مرة", "تدور ثاني مرة", "تدور تالت مرة"];

function buildConicGradient() {
  const stops = COLORS.map((color, i) => {
    const start = i * SEGMENT_ANGLE;
    const end = start + SEGMENT_ANGLE;
    return `${color} ${start}deg ${end}deg`;
  });
  return `conic-gradient(${stops.join(", ")})`;
}

function todayKey() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

function loadSpinsUsedToday() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return 0;
    const data = JSON.parse(raw);
    if (data.date !== todayKey()) return 0; // يوم جديد = العداد يتصفر
    return data.count || 0;
  } catch {
    return 0;
  }
}

function saveSpinsUsedToday(count) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: todayKey(), count }));
  } catch {
    // تجاهل أي خطأ تخزين (مثلاً وضع تصفح خاص)
  }
}

export default function SpinWheel() {
  const { addCoins } = useCoins();
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonValue, setWonValue] = useState(null);
  const [spinsUsedToday, setSpinsUsedToday] = useState(0);
  const rotationRef = useRef(0);

  useEffect(() => {
    setSpinsUsedToday(loadSpinsUsedToday());
  }, []);

  const remainingSpins = MAX_DAILY_SPINS - spinsUsedToday;
  const canSpin = remainingSpins > 0 && !isSpinning;

  const handleSpin = () => {
    if (!canSpin) return;
    setIsSpinning(true);

    const winnerIndex = Math.floor(Math.random() * VALUES.length);
    const segmentCenter = winnerIndex * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;
    const target = (360 - segmentCenter + 360) % 360;

    const prev = rotationRef.current;
    let next = Math.ceil(prev / 360) * 360 + 5 * 360 + target;
    if (next <= prev) next += 360;

    rotationRef.current = next;
    setRotation(next);

    // وقت الأنيميشن متطابق مع transition duration بالأسفل (4 ثواني)
    setTimeout(() => {
      setIsSpinning(false);
      setWonValue(VALUES[winnerIndex]);

      const updatedCount = spinsUsedToday + 1;
      setSpinsUsedToday(updatedCount);
      saveSpinsUsedToday(updatedCount);
    }, 4000);
  };

  const claimReward = () => {
    if (wonValue != null) addCoins(wonValue);
    setWonValue(null);
  };

  const bannerText =
    remainingSpins > 0
      ? ATTEMPT_LABELS[spinsUsedToday]
      : "خلصت محاولاتك النهارده، ارجع بكرة تاني";

  return (
    <div className="relative w-full min-h-screen bg-slate-100 border-3 flex flex-col">
      <TopBar />

      <div className="px-4 pt-2">
        <div className="bg-blue-500 text-white text-center rounded-2xl py-3 font-bold text-sm">
          {bannerText}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-8 px-4">
        {/* العجلة */}
        <div className="relative w-64 h-64">
          {/* السهم - بوردر أصفر حوله + المثلث الأصلي فوقه */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-l-[17px] border-r-[17px] border-t-[27px] border-l-transparent border-r-transparent border-t-yellow-400" />
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-l-[13px] border-r-[13px] border-t-[20px] border-l-transparent border-r-transparent border-t-amber-400" />

          <div
            className="w-64 h-64  rounded-full border-[10px] border-slate-800 relative "
            style={{
              background: buildConicGradient(),
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning ? "transform 4s cubic-bezier(0.15, 0.9, 0.25, 1)" : "none",
            }}
          >
            {VALUES.map((val, i) => {
              const angle = i * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;
              return (
                <span
                  key={i}
                  className="absolute left-1/2 top-1/2 text-2xl font-extrabold text-slate-900"
                  style={{
                    transform: `rotate(${angle}deg) translate(0, -90px) rotate(-90deg)`,
                    transformOrigin: "0 0",
                  }}
                >
                  {val}
                </span>
              );
            })}


          </div>

          {/* مركز العجلة — ثابت وغير قابل للضغط، الزرار الحقيقي بقى تحت العجلة */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white border-[8px] border-slate-800 flex items-center justify-center font-extrabold text-slate-800 z-10">
            SPIN
          </div>
        </div>

        <div className="w-full max-w-[280px] flex flex-col items-center gap-2">
          <button
            onClick={handleSpin}
            disabled={!canSpin}
            className="w-full bg-blue-500 text-white font-bold py-3 rounded-full active:scale-95 transition-transform disabled:opacity-60 disabled:active:scale-100"
          >
            تدور الآن
          </button>
          <span className="text-slate-400 text-xs">
            باقيلك {Math.max(remainingSpins, 0)} من {MAX_DAILY_SPINS} محاولات النهارده
          </span>
        </div>
      </div>

      {/* <BottomNav /> */}

      {wonValue !== null && <RewardModal points={wonValue} onClaim={claimReward} />}
    </div>
  );
}