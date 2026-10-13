import React from 'react';

export const DoubleHappinessIcon = ({ className = "w-10 h-10", color = "currentColor" }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fontSize="85"
        fontWeight="bold"
        fontFamily="'EB Garamond', 'Playfair Display', serif"
      >
        囍
      </text>
    </svg>
  );
};

export const SunburstBg = ({ className = "w-full h-full", color = "#1F3A25", opacity = 0.08 }) => {
  // A circular ray sunburst pattern matching the vintage Chinese-Vietnamese wedding theme
  const rays = 36;
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      <g transform="translate(200, 200)">
        {Array.from({ length: rays }).map((_, i) => {
          const angle = (i * 360) / rays;
          return (
            <path
              key={i}
              d="M 0 0 L -8 200 L 8 200 Z"
              fill={color}
              transform={`rotate(${angle})`}
            />
          );
        })}
      </g>
    </svg>
  );
};
