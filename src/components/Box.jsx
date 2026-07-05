import React from 'react'
import { Link } from 'react-router-dom'

const Box = ({ color, img, title, to, noLink = false }) => {
  const content = (
    <>
      <img src={`/images/${img}.png`} className="w-22 h-22 object-cover" alt={title} />
      <span className="text-black font-bold text-sm text-center">{title}</span>
    </>
  );

  const className = `${color} rounded-2xl aspect-square flex flex-col items-center justify-center gap-3 p-4 shadow-md active:scale-95 transition-transform`;

  if (noLink) {
    return (
      <button className={className}>
        {content}
      </button>
    );
  }

  return (
    <Link to={to} className={className}>
      {content}
    </Link>
  );
};

export default Box