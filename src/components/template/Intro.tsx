'use client';

import { useLoadFormLocalStorage } from '@/hooks/useLoadFormLocalStorage';
import { useTypeWriter } from '@/hooks/useTypeWriter';
import { useUserStore } from '@/store/userStore';

import { useState, useEffect, useRef } from 'react';
import GoogleLoginButton from '../GoogleLoginButton';
import StartGameButton from '../StartGameButton';

//ui
import { Card } from '../ui/card';

export default function Intro() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isTypingDone, setIsTypingDone] = useState(false);

  const userName = useUserStore((state) => state.userName);
  const setUserName = useUserStore((state) => state.setUserName);
  const fullStory = useUserStore((state) => state.storyData);
  const setFullStroy = useUserStore((state) => state.setStoryData);
  const isUserStoryLoading = useUserStore((state) => state.isUserStoryLoading);
  const setRoleData = useUserStore((state) => state.setRoleData);

  // ✅ 기존 스토리, 유저 확인
  useLoadFormLocalStorage('displayName', setUserName);
  useLoadFormLocalStorage('story', setFullStroy);
  useLoadFormLocalStorage('role', setRoleData);

  // ✅ 이미 다 가공된 데이터들을 가지고 인터랙션을 주는 영역이라 const 로 변수 지정 해서 사용
  const displayText = useTypeWriter(fullStory);

  // ✅ 글자가 전부 출력된 시점을 감지
  useEffect(() => {
    if (displayText === fullStory && fullStory !== '') {
      setIsTypingDone(true);
    }
  }, [displayText, fullStory]);

  // 글씨 출력 양에 따른 스크롤 움직이기
  useEffect(() => {
    if (scrollRef.current) {
      // scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [displayText]);

  return (
    <div className="flex flex-col gap-4">
      {userName ? (
        <div>
          <div className="w-full flex justify-center items-center">
            <Card ref={scrollRef} className="w-[320] h-[320] px-6 overflow-y-auto box-border">
              {(() => {
                if (!fullStory && !isUserStoryLoading) {
                  return (
                    <div className="flex flex-col items-center justify-center h-full">
                      <StartGameButton />
                    </div>
                  );
                } else if (isUserStoryLoading) {
                  return (
                    <div className="flex flex-col items-center justify-center h-full">
                      <p className="">로딩중...</p>
                    </div>
                  );
                } else {
                  return (
                    <div>
                      <p className="whitespace-pre-line italic ">{displayText}</p>
                    </div>
                  );
                }
              })()}
            </Card>
          </div>
          {isTypingDone ? <button>여행 시작</button> : null}
        </div>
      ) : (
        <GoogleLoginButton />
      )}
    </div>
  );
}
