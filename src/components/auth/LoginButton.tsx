import React from 'react';

const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

const LoginButton: React.FC = () => {
  const handleLogin = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
    window.location.href = kakaoAuthUrl;
  };

  return (
    <button
      onClick={handleLogin}
      className="
        flex items-center justify-center gap-4 
        w-full py-5 px-10 
        text-2xl font-black rounded-[30px] 
        bg-gradient-to-br from-[#FFDE59] to-[#FFB72B] 
        shadow-[rgba(0,0,0,0.15)_8px_8px_24px] 
        transition-all duration-300"
      type="button"
    >
      <img 
        src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png" 
        alt="Kakao" 
        className="w-10 h-10" 
      />
      카카오로 로그인
    </button>
  );
};

export default LoginButton;
