// 카카오 로그인 후 redirect 페이지 url에서 code추출
// -> 백엔드에 요청 보내 jwt 받아서 저장
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { authState } from '../recoil/authAtom';

const LoginRedirect: React.FC = () => {
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authState);

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');

    const getTokens = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/auth/kakao/callback?code=${code}`, {
          withCredentials: true,
        });

        const { accessToken, refreshToken, nickname } = res.data;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        setAuth({ isLoggedIn: true, nickname });

        navigate('/'); // 로그인 후 홈으로 이동
      } catch (err) {
        if (axios.isAxiosError(err)) {
            console.error('Axios Error:', err.message);
            console.error('Status:', err.response?.status);
            console.error('Response:', err.response?.data);
        } else {
            console.error('기타 에러:', err);
        }
        navigate('/login-failed'); // 실패 시 경로
      }
    };

    if (code) getTokens();
  }, [navigate, setAuth]);

  return (
    <div className="p-4 text-center">
      로그인 중입니다...
    </div>
  );
};

export default LoginRedirect;
