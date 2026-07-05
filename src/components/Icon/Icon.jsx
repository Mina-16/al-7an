export default function Icon({
  name,
  alt = '',
  size = 'responsive', // 'sm', 'md', 'lg', or 'responsive'
  className = '',
  color, // optional: color string from JS like colors.gold
  // style = {},
  ...props
}) {
  const src = `/icons/${name}.svg`;

  const sizeClass =
    size === 'sm'
      ? 'w-4 h-4'
      : size === 'md'
        ? 'w-6 h-6'
        : size === 'lg'
          ? 'w-8 h-8'
          : 'w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8';

  return (
    <img
      src={src}
      alt={alt}
      className={`${sizeClass} ${className}`}
      style={color ? { color } : {}}
      {...props}
    />
  );
}
