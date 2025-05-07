import { provider, auth } from '@/config/firebase';
import { signInWithPopup } from 'firebase/auth';

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log('✅ 로그인 성공:', user.displayName);
    return user;
  } catch (error) {
    console.error('❌ 로그인 실패:', error);
    throw error;
  }
};
