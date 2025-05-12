// 카카오 로그인 버튼 ui, 리디렉션
import React from 'react';

const KAKAO_CLIENT_ID = 'ee981479b8571072d73c73fc2ca435b9'; // 👉 반드시 실제 키로 교체
const REDIRECT_URI = 'http://localhost:5173/login-redirect'; // 프론트엔드 redirect 경로

const LoginButton: React.FC = () => {
  const handleLogin = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
    window.location.href = kakaoAuthUrl;
  };

  return (
    <button
      onClick={handleLogin}
      className="px-4 py-2 bg-yellow-300 hover:bg-yellow-400 rounded font-bold"
    >
      카카오로 로그인
    </button>
  );
};

export default LoginButton;
