import React from 'react';

interface RandomTripButtonProps {
  loading: boolean;
  onClick: () => void;
}

const RandomTripButton: React.FC<RandomTripButtonProps> = ({ loading, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-yellow-300 hover:bg-yellow-400 text-black rounded-3xl px-10 py-5 text-2xl font-extrabold shadow-lg transition-all duration-300"
      disabled={loading}  
    >
      {loading ? "추천 중..." : "여행지 추천 받기"}
    </button>
  );
};

export default RandomTripButton;
