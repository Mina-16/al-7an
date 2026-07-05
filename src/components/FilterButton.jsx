// components/FilterButton.jsx
const FilterButton = ({ label, active = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1 rounded-full text-xs font-semibold border-2 border-black shadow-lg transition-colors ${
        active
          ? "bg-slate-600 text-white"
          : "bg-slate-100 text-black"
      }`}
    >
      {label}
    </button>
  );
};

export default FilterButton;