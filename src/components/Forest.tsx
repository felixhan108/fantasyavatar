'use client';

import { auth } from '@/config/firebase';
import { useUserStore } from '@/store/userStore';
import { signInWithGoogle } from '@/utils/login';
import { signOut } from 'firebase/auth';
import * as Phaser from 'phaser';
import { useEffect, useRef } from 'react';

export default function Forest() {
  const phaserRef = useRef<HTMLDivElement>(null);
  const userName = useUserStore((state) => state.userName);
  const setUserName = useUserStore((state) => state.setUserName);

  useEffect(() => {
    const saveName = localStorage.getItem('displayName');
    if (saveName) {
      setUserName(saveName);
    }
  }, [setUserName]);

  useEffect(() => {
    class ForestScene extends Phaser.Scene {
      constructor() {
        super('ForestScene');
      }

      preload() {
        this.load.image('BACKGROUND', '/assets/bg/forest.png');
      }

      create() {
        this.add.tileSprite(0, 0, 480, 160, 'BACKGROUND').setOrigin(0, 0);
        this.add.image(0, 0, 'BACKGROUND').setOrigin(0, 0);
      }
    } // class ForestScene

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.WEBGL,
      width: 16 * 10,
      height: 16 * 10,
      parent: phaserRef.current,
      scene: ForestScene,
      pixelArt: true,
      zoom: 2,
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex justify-center items-center">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">여행하기</button>
      </div>
      <div ref={phaserRef} />
      {userName ? (
        <>
          <p>환영합니다, {userName}님!</p>
          <button
            onClick={() =>
              signOut(auth).then(() => {
                useUserStore.getState().setUserName('');
                useUserStore.getState().setUserId('');
                localStorage.removeItem('uid');
                localStorage.removeItem('displayName');
              })
            }
          >
            로그아웃
          </button>
        </>
      ) : (
        <button
          onClick={async () => {
            try {
              const user = await signInWithGoogle();
              useUserStore.getState().setUserId(user.uid);
              useUserStore.getState().setUserName(user.displayName || '');
              localStorage.setItem('uid', user.uid);
              localStorage.setItem('displayName', user.displayName || '');
            } catch (error) {
              console.error('❌ 로그인 실패:', error);
            }
          }}
        >
          Google 로그인
        </button>
      )}
    </div>
  );
}
