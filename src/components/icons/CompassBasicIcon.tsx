import React from "react";

interface CompassBasicIconProps {
  className?: string;
  size?: number;
}

export default function CompassBasicIcon({ className = "", size = 20 }: CompassBasicIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 20 20" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="10" cy="10" r="9.5" stroke="#333333"/>
      <path d="M10.2563 15.5144L9.66315 10.7711L9.61482 10.3858L9.22881 10.3367L4.48691 9.74357L14.1026 5.8966L10.2563 15.5144Z" stroke="#333333"/>
    </svg>
  );
}

