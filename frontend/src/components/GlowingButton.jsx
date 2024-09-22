import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Button.css'; // Assuming you have custom styles for any additional glow effects

export const GlowingButton = ({ label, to }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center">
      {/* <button
        onClick={to}
        className="btn relative z-0 w-56 bg-black text-white py-3 px-8 mx-4 rounded-xl font-bold transition-colors glowing-btn flex w-full shadow-sm justify-center mt-3 hover:border-black duration-300 ease-in-out transform hover:scale-105 active:scale-95"
      >
        {label}
      </button> */}

      <button className="c-btn relative z-0 w-56 bg-black text-white py-3 px-8 rounded-xl font-bold m-3 duration-300 ease-in-out transform hover:scale-105 active:scale-95" onClick={to}>
      <span className="c-btn__label">{label}</span>
    </button>
    </div>

  );
};

