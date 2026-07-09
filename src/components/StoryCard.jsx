import { Link } from "react-router-dom";

const StoryCard = ({ id, title, description, img, reverse = false }) => {
  return (
    <div
      className={`bg-white w-full min-h-[180px]  rounded-2xl shadow-sm p-4 space-y-3 flex gap-5 ${reverse ? "flex-row-reverse" : "flex-row"}`}
    >
        <div className="w-[130px] h-[130px] flex-shrink-0">
              <img
        src={`/images/${img}.png`}
        alt={title}
        className="w-full h-full rounded-xl object-cover flex-shrink-0"
      />
      </div>

      <div className="flex flex-col items-end gap-2">
      <h2 className="text-[20px] font-bold text-black">{title}</h2>


      <p className="text-[10px] text-slate-600 leading-relaxed text-center">
        {description}
      </p>

      <Link
        to={`/story/${id}`}
        className="inline-block bg-blue-900 text-white text-sm font-semibold px-2 py-1 rounded-[12px] active:scale-95 transition-transform"
      >
        ابدا القصه
      </Link>
      </div>
    </div>
  );
};

export default StoryCard;
