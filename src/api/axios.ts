import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',  // Spring Boot 서버 주소
  withCredentials: true,  // 쿠키/인증정보 전송 허용
});

export default api;
