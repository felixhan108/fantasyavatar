'use client';

import Interface from '@/components/modules/Interface';
import Intro from '@/components/template/Intro';
import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useUserStore } from '@/store/userStore';

export default function Home() {
  const setUserName = useUserStore((state) => state.setUserName);
  const setStoryData = useUserStore((state) => state.setStoryData);
  const setRoleData = useUserStore((state) => state.setRoleData);
  const setUserStatus = useUserStore((state) => state.setUserStatus);

  useEffect(() => {
    const fetchUserData = async (uid: string, displayName: string | null) => {
      try {
        const db = getFirestore();
        const userDocRef = doc(db, 'users', uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserName(displayName || 'Anonymous');
          setStoryData(userDoc.data().story || '');
          setRoleData(userDoc.data().role || '');
          setUserStatus(userDoc.data().status || null);
        } else {
          console.error('No such document!');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is signed in:', user);
        fetchUserData(user.uid, user.displayName);
      } 
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [setUserName, setStoryData, setRoleData, setUserStatus]);

  return (
    <>
      <Interface />
      <Intro />
    </>
  );
}
