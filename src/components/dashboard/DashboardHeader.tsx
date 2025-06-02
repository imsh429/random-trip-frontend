import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRandom, faRoute, faUser, faPlane } from '@fortawesome/free-solid-svg-icons';

const DashboardHeader: React.FC = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const iconButtonClass = `
    text-2xl cursor-pointer bg-transparent 
    border-none focus:outline-none transition-transform 
    duration-200 ease-in-out hover:scale-125
  `;

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("nickname");
    navigate("/");
  };

  const nickname = localStorage.getItem("nickname") || "사용자";

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

      <div className="flex gap-6 items-center relative">
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

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={iconButtonClass + " text-green-500 hover:text-green-600"}
          >
            <FontAwesomeIcon icon={faUser} />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-2xl shadow-lg p-4 border border-gray-200">
              <div className="mb-2 text-center font-semibold text-gray-800">{nickname}</div>
              <button 
                onClick={() => navigate("/mypage")}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                마이페이지
              </button>
              <button 
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 rounded-lg text-red-500 hover:bg-red-100 transition"
              >
                로그아웃
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
