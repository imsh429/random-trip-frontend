// 로그인 상태 저장용 recoil
import { atom } from 'recoil';

export interface AuthState {
  isLoggedIn: boolean;
  nickname: string | null;
}

export const authState = atom<AuthState>({
  key: 'authState',
  default: {
    isLoggedIn: false,
    nickname: null,
  },
});
