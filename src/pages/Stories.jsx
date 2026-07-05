import { useNavigate } from "react-router-dom";
import StoryCard from "../components/StoryCard";
import { stories } from "../data/stories";
import BottomNav from "../components/ButtonNav";
import Human from "../components/Human";
import Icon from "../components/Icon/Icon";

export default function Stories() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-full bg-slate-100 overflow-hidden flex flex-col">
      {/* الهيدر */}
      <div className="flex items-center justify-between px-5 pt-6 pb-3 flex-shrink-0">

        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-[#D9D9D9] flex items-center justify-center -translate-y-1/3 active:scale-90 transition-transform">
            <Icon name="arrowLeft"/>
        </button>
        <h1 className="text-[32px] font-bold text-right text-slate-800 "> القصص</h1>
        <Human/>
      </div>

      {/* القائمة */}
      <div className="flex-1 max-h-[83vh] overflow-y-auto px-4 space-y-4 pb-24">
        {stories.map((story, index) => (
          <StoryCard
            key={story.id}
            id={story.id}
            title={story.title}
            description={story.description}
            img={story.img}
            reverse={index % 2 === 1}
          />
        ))}
      </div>

      <BottomNav />
    </div>
  );
}