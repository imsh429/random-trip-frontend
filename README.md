# 🗺️ 랜덤여행생성기 Frontend

**"기분과 지역만 정하면, GPT가 랜덤으로 여행지를 추천하고, 지도에서 최적 경로까지 그려주는 여행 서비스"**

---

## 🚀 기술 스택

- **React** + **TypeScript**  
- **Tailwind CSS** – 유틸리티 기반 스타일링  
- **Axios** – 백엔드 API 연동 및 JWT 인증 처리  
- **Kakao Maps JavaScript API** – 지도 시각화, 마커/경로 표시  
- **Vite** – 빠른 개발 환경 구성


---

## 📂 폴더 구조
src/
├── api/            # 백엔드 API 요청 함수
├── assets/         # 이미지, 아이콘 등 정적 파일
├── components/     # 재사용 UI 컴포넌트
├── pages/          # 주요 페이지 컴포넌트
├── recoil/         # 전역 상태 관리
├── types/          # 공통 타입 정의
├── App.tsx         # 라우터 및 전역 설정
├── main.tsx        # React 진입점
├── index.css       # 전역 스타일
├── App.css         # App 전용 스타일
└── vite-env.d.ts   # Vite 환경 변수 타입 선언


---


## 🧭 주요 기능

| 기능 | 설명 |
|------|------|
| ✅ 랜덤 여행지역 추천 | 백엔드 `/trip/random` API로 여행지 랜덤 추천 |
| ✅ 기분 + 지역 선택 | GPT에 전달할 프롬프트 기반으로 사용자 입력 수집 |
| ✅ 여행지 추천 | 백엔드 `/trip/plan` API로 GPT 추천 여행지 받아오기 |
| ✅ 출발지 선택 | 사용자가 지도에서 시작 지점 지정 |
| ✅ 경로 최적화 | Kakao Mobility API 기반 최적 경로 지도에 시각화 |
| ✅ 여행 확정 | `/trip/confirm` API 호출로 DB 저장 |
| ✅ 최근여행경로 가져오기 | `/trip/my` API 호출로 최근 여행지 가져옴 |


---

---

## 📦 설치 및 실행 방법

```bash
# 1. 프로젝트 클론
git clone https://github.com/imsh429/random-trip-frontend.git
cd random-trip-frontend

# 2. 패키지 설치
npm install

# 3. 환경 변수 설정
# .env 파일을 열어 생성하세요:
# VITE_KAKAO_MAP_API_KEY=
# VITE_KAKAO_CLIENT_ID=
# VITE_REDIRECT_URI =
# VITE_OPENWEATHER_API_KEY=

# 4. 개발 서버 실행
npm run dev

