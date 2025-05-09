'use client';
import { useUserStore } from '@/store/userStore';
import { signInWithGoogle } from '@/utils/login';
import IconGoogle from './icons/IconGoogle';
import { Button } from './ui/button';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';

export default function GoogleLoginButton() {
  const setUserId = useUserStore((state) => state.setUserId);
  const setUserName = useUserStore((state) => state.setUserName);

  return (
    <Button
      onClick={async () => {
        try {
          const user = await signInWithGoogle();
          
          // Firestore에 저장
          const userDoc = doc(db, 'users', user.uid); // Replace 'userId' with the actual user ID
          await setDoc(userDoc, { displayName: user.displayName }, { merge: true });
          // Zustand 업데이트
          setUserId(user.uid);
          setUserName(user.displayName || '');
          
        } catch (error) {
          console.error('❌ 로그인 실패:', error);
        }
      }}
    >
      <div className="flex items-center space-x-2">
        <IconGoogle />
        <span>Login</span>
      </div>
    </Button>
  );
}
