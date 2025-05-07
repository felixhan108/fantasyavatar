'use client';
import { useUserStore } from '@/store/userStore';
import { signInWithGoogle } from '@/utils/login';
import IconGoogle from './icons/IconGoogle';
import { Button } from './ui/button';

export default function GoogleLoginButton() {
  const setUserId = useUserStore((state) => state.setUserId);
  const setUserName = useUserStore((state) => state.setUserName);

  return (
    <Button
      onClick={async () => {
        try {
          const user = await signInWithGoogle();
          setUserId(user.uid);
          setUserName(user.displayName || '');
          localStorage.setItem('uid', user.uid);
          localStorage.setItem('displayName', user.displayName || '');
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
