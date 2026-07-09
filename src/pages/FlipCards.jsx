import { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import BottomNav from "../components/ButtonNav";
import RewardModal from "../components/RewardModal";
import { useCoins } from "../context/CoinsContext";

const PAIRS_COUNT = 10; // 10 أزواج = 20 كارت (5 أعمدة × 4 صفوف)
const WIN_POINTS = 50;

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildDeck() {
  const values = Array.from({ length: PAIRS_COUNT }, (_, i) => i + 1);
  const deck = shuffle([...values, ...values]).map((value, index) => ({
    id: index,
    value,
  }));
  return deck;
}

export default function FlipCards() {
  const { addCoins } = useCoins();
  const [deck, setDeck] = useState(buildDeck);
  const [flipped, setFlipped] = useState([]); // indices currently flipped (max 2)
  const [matched, setMatched] = useState(new Set());
  const [locked, setLocked] = useState(false);
  const [showReward, setShowReward] = useState(false);

  useEffect(() => {
    if (flipped.length === 2) {
      setLocked(true);
      const [a, b] = flipped;
      const isMatch = deck[a].value === deck[b].value;

      const timer = setTimeout(() => {
        if (isMatch) {
          setMatched((prev) => new Set(prev).add(deck[a].value));
        }
        setFlipped([]);
        setLocked(false);
      }, isMatch ? 400 : 800);

      return () => clearTimeout(timer);
    }
  }, [flipped, deck]);

  useEffect(() => {
    if (matched.size === PAIRS_COUNT) {
      setShowReward(true);
    }
  }, [matched]);

  const handleCardClick = (index) => {
    if (locked) return;
    if (flipped.includes(index)) return;
    if (matched.has(deck[index].value)) return;
    if (flipped.length === 2) return;

    setFlipped((prev) => [...prev, index]);
  };

  const claimReward = () => {
    addCoins(WIN_POINTS);
    setShowReward(false);
    setDeck(buildDeck());
    setMatched(new Set());
    setFlipped([]);
  };

  return (
    <div className="relative w-full min-h-screen bg-slate-100 overflow-hidden flex flex-col">
      <TopBar />

      <div className="px-4 pt-2">
        <div className="bg-blue-500 text-white text-center rounded-2xl py-3 font-bold text-sm">
          اختر الصوره المتشابها
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-16 pb-24">
        <div className="bg-white rounded-2xl p-3 grid grid-cols-4 gap-2 shadow-sm">
          {deck.map((card, index) => {
            const isFlipped = flipped.includes(index) || matched.has(card.value);
            return (
              <button
                key={card.id}
                onClick={() => handleCardClick(index)}
                className="aspect-square perspective-[600px]"
              >
                <div
                  className="relative w-full h-full transition-transform duration-300 transform-3d]"
                  style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
                >
                  {/* ظهر الكارت (مغلق) */}
                  <div className="absolute inset-0 backface-hidden rounded-lg overflow-hidden bg-orange-50 flex items-center justify-center">
                    <img src="/images/gift.png" alt="مغلق" className="w-full h-full object-cover" />
                  </div>
                  {/* وش الكارت (مفتوح) */}
                  <div
                    className="absolute inset-0 backface-hidden rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center"
                    style={{ transform: "rotateY(180deg)" }}
                  >
                    <img
                      src={`/images/card-${card.value}.png`}
                      alt={`صورة ${card.value}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <BottomNav />

      {showReward && <RewardModal points={WIN_POINTS} onClaim={claimReward} />}
    </div>
  );
}