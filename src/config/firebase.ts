// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

console.log('🔑 firebaseConfig', firebaseConfig);

const app = initializeApp(firebaseConfig);
// 👉 auth: Firebase 인증 객체를 생성함. 이후 로그인, 로그아웃, 사용자 상태 확인 등에 사용됨
const auth = getAuth(app);
// 👉 provider: Google 로그인용 인증 제공자 객체. signInWithPopup 등에서 사용됨
const provider = new GoogleAuthProvider();
// db연결
const db = getFirestore(app);

export { auth, provider, db };
