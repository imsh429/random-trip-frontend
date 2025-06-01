import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRandom, faRoute, faUser, faPlane } from '@fortawesome/free-solid-svg-icons';

const DashboardHeader: React.FC = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const iconButtonClass = `
    text-2xl cursor-pointer bg-transparent 
    border-none focus:outline-none transition-transform 
    duration-200 ease-in-out hover:scale-125
  `;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-10 py-3 backdrop-blur-lg transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-[rgba(0,0,0,0.15)_0px_4px_16px]'
          : 'bg-white/50 shadow-none'
      }`}
    >
      <div>
        <button
          onClick={() => navigate("/dashboard")}
          aria-label="Home"
          title="메인으로 돌아가기"
          className={iconButtonClass + " text-blue-600 hover:text-blue-800"}
        >
          <FontAwesomeIcon icon={faPlane} />
        </button>
      </div>

      <div className="flex gap-6">
        <button
          onClick={() => navigate("/trip/random")}
          className={iconButtonClass + " text-yellow-500 hover:text-yellow-600"}
        >
          <FontAwesomeIcon icon={faRandom} />
        </button>

        <button
          onClick={() => navigate("/trip/plan")}
          className={iconButtonClass + " text-purple-500 hover:text-purple-600"}
        >
          <FontAwesomeIcon icon={faRoute} />
        </button>

        <button
          onClick={() => navigate("/mypage")}
          className={iconButtonClass + " text-green-500 hover:text-green-600"}
        >
          <FontAwesomeIcon icon={faUser} />
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
