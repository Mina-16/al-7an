export function ImagePlaceholder({ className = "", label = "صورة" }) {
  return (
    <div
      className={`flex items-center justify-center bg-slate-200 text-slate-500 ${className}`}
      aria-label={label}
    >
      <span className="text-sm font-semibold">{label}</span>
    </div>
  );
}
