'use client';

import { useTypeWriter } from '@/hooks/useTypeWriter';
import { useUserStore } from '@/store/userStore';

import { useState, useEffect, useRef } from 'react';
import GoogleLoginButton from '@/components/actions/GoogleLoginButton';
import StartGameButton from '../actions/StartGameButton';

//ui
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { getAuth } from 'firebase/auth';
import { useUIStore } from '@/store/uiStore';

export default function Intro() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isTypingDone, setIsTypingDone] = useState(false);

  const userName = useUserStore((state) => state.userName);
  const fullStory = useUserStore((state) => state.storyData);
  const isGaming = useUserStore((state) => state.isGaming); // 추가: 로그인 후 상태 확인용
  const isUserStoryLoading = useUserStore((state) => state.isUserStoryLoading);
  const setIsGaiming = useUIStore((state) => state.setIsGaming);

  // ✅ 이미 다 가공된 데이터들을 가지고 인터랙션을 주는 영역이라 const 로 변수 지정 해서 사용
  const [displayText, isEnd] = useTypeWriter(fullStory);

  // ✅ 글자가 전부 출력된 시점을 감지
  useEffect(() => {
    console.log('displayText', displayText);
    console.log('isEnd', isEnd);
    if (displayText && isEnd) {
      console.log('타이핑 완료');
      setIsTypingDone(true);
    }
  }, [displayText, fullStory, isEnd]);

  useEffect(() => {
    if (userName && isGaming) {
      setIsGaiming(true);
    }
  }, [userName, isGaming, setIsGaiming]);

  // 글씨 출력 양에 따른 스크롤 움직이기
  useEffect(() => {
    if (scrollRef.current) {
      // scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [displayText, isEnd]);

  const handleStartGame = async () => {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;

    if (!userId) {
      console.error('User ID is undefined. Cannot proceed with starting the game.');
      return;
    }

    const userDoc = doc(db, 'users', userId);

    if (isGaming) {
      setIsGaiming(true);
      return;
    }

    await setDoc(userDoc, { isGaming: true }, { merge: true });
    setIsGaiming(true);
  };

  return (
    <div className="flex flex-col gap-4">
      {(() => {
        if (!userName) {
          return <GoogleLoginButton />;
        }

        if (!fullStory && !isUserStoryLoading) {
          return (
            <div className="flex flex-col items-center justify-center h-full">
              <StartGameButton />
            </div>
          );
        }

        if (isUserStoryLoading) {
          return (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="">로딩중...</p>
            </div>
          );
        }

        return (
          <div>
            <div className="w-full flex justify-center items-center">
              <Card ref={scrollRef} className="w-[320px] h-[320px] px-6 overflow-y-auto box-border">
                <p className="whitespace-pre-line italic">{displayText}</p>
              </Card>
            </div>
            <div className="flex justify-center items-center mt-4">
              {isTypingDone ? <Button onClick={handleStartGame}>게임시작</Button> : null}
            </div>
          </div>
        );
      })()}
    </div>
  );
}
