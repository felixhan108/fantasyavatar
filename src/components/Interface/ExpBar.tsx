'use client';

import { useUserStore } from '@/store/userStore';
import { Progress } from '../ui/progress';

export default function ExpBar() {
  const userStatus = useUserStore((state) => state.userStatus);

  const userExp = userStatus?.exp ?? 0;

  return (
    <>
      <Progress
        value={(userExp / 100) * 100}
        className="w-full [&>div]:bg-yellow-500 rounded-none"
      />
    </>
  );
}
