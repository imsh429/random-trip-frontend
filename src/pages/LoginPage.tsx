import React from 'react';
import LoginButton from '../components/auth/LoginButton';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] flex justify-center items-center font-['Nunito']">

      <div className="bg-white rounded-[40px] shadow-[rgba(0,0,0,0.15)_8px_8px_32px] p-20 flex flex-col justify-center items-center w-[90%] max-w-[1000px] border border-white/40">

        <div className="text-9xl mb-16 animate-fade-in-down delay-100">🌍</div>

        <h1 className="text-6xl font-extrabold mb-10 text-gray-800 drop-shadow-sm animate-fade-in-down delay-300">
          P를 위한 랜덤 여행 생성기
        </h1>

        <p className="text-2xl text-gray-600 mb-20 text-center leading-relaxed animate-fade-in-down delay-500">
          여행은 가고싶은데.. 어디로 가지? <br /> 고민중독에 빠진 당신을 위한 여행맞춤 플래너!
        </p>

        <div className="w-full max-w-[500px] animate-fade-in-down delay-700">
          <LoginButton />
        </div>

        <p className="mt-20 text-sm text-gray-400">© 2025 Random Trip Generator</p>
      </div>

    </div>
  );
};

export default LoginPage;
