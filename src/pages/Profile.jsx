import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/ButtonNav";
import { ImagePlaceholder } from "../components/Icons";
import Human from "../components/Human";

const IconChevronLeft = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className={className}>
    <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconPencil = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M12 20h9" strokeLinecap="round" />
    <path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconCake = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M4 21v-6a2 2 0 012-2h12a2 2 0 012 2v6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 17h16" strokeLinecap="round" />
    <path d="M8 13V9M12 13V9M16 13V9" strokeLinecap="round" />
    <path d="M12 6V4M9 4a1.5 1.5 0 013 0M12 4a1.5 1.5 0 013 0" strokeLinecap="round" />
  </svg>
);

const IconGender = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <circle cx="8" cy="7" r="3" />
    <circle cx="17" cy="8" r="3" />
    <path d="M8 21v-6a3 3 0 013-3M17 21v-6a3 3 0 00-2-2.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconGlobe = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a15 15 0 010 18M12 3a15 15 0 000 18" strokeLinecap="round" />
  </svg>
);

function DropdownRow({ icon, value, options, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-slate-100 pb-4">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          className={`w-5 h-5 text-slate-500 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="flex items-center gap-3 text-lg text-slate-800">
          {value}
          <span className="text-blue-500">{icon}</span>
        </span>
      </button>

      {open && (
        <div className="mt-3 flex flex-col gap-2">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`text-right px-3 py-2 rounded-lg text-sm ${
                opt === value ? "bg-blue-50 text-blue-600 font-semibold" : "text-slate-600"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Profile() {
  const navigate = useNavigate();
  const [name, setName] = useState("اسم المستخدم");
  const [editingName, setEditingName] = useState(false);
  const [gender, setGender] = useState("ذكر");
  const [language, setLanguage] = useState("العربيه");

  return (
    <div className="relative w-full min-h-screen bg-slate-100 overflow-hidden flex flex-col">
      {/* الهيدر */}
      <div className="flex items-start justify-between px-5 pt-6 pb-2 shrink-0">
        <button onClick={() => navigate(-1)} className="text-slate-700 active:scale-90 transition-transform">
          <IconChevronLeft />
        </button>
      </div>

      <div className="flex items-center justify-between px-5 pb-6">
        <div className="flex items-center gap-2">
          <button onClick={() => setEditingName((v) => !v)} className="text-blue-400 active:scale-90 transition-transform">
            <IconPencil />
          </button>
          <div>
            {editingName ? (
              <input
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setEditingName(false)}
                className="text-xl font-bold text-slate-800 bg-transparent border-b border-blue-300 outline-none text-right"
              />
            ) : (
              <h1 className="text-xl font-bold text-slate-800">{name}</h1>
            )}
            <p className="text-slate-400 text-sm">ID:22369874</p>
          </div>
        </div>
        <Human />

      </div>

      {/* البيانات */}
      <div className="flex-1 overflow-y-auto px-5 space-y-6 pb-24">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <span className="text-blue-500"><IconCake /></span>
          <span className="text-lg text-slate-800">20/5/2020</span>
        </div>

        <DropdownRow
          icon={<IconGender />}
          value={gender}
          options={["ذكر", "أنثى"]}
          onChange={setGender}
        />

        <DropdownRow
          icon={<IconGlobe />}
          value={language}
          options={["العربيه", "English"]}
          onChange={setLanguage}
        />
      </div>

      <BottomNav />
    </div>
  );
}