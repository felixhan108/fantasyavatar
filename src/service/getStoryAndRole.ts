import { auth, db } from '@/config/firebase';
import { useUserStore } from '@/store/userStore';
import { doc, setDoc } from 'firebase/firestore';
import { Characters } from '@/assets/Characters'; // Adjust the import path as necessary

export const getStoryAndRole = async () => {
  try {
    const res = await fetch('/api/gameStart');
    const data = await res.json();

    const { setRoleData, setStoryData } = useUserStore.getState();
    const userId = auth.currentUser?.uid; // Get the current user's ID

    if (data.role) {
      setRoleData(data.role);
      localStorage.setItem('role', data.role);
      // Save to Firestore
      if (!userId) throw new Error('User not authenticated');
      const userDoc = doc(db, 'users', userId); // Replace 'userId' with the actual user ID
      await setDoc(userDoc, { role: data.role }, { merge: true });

      const SWORD = Characters['SWORD']?.status;
      const MAGIC = Characters['MAGIC']?.status;
      const ARCHER = Characters['ARCHER']?.status;

      if (data.role === '검사') {
        if (SWORD) {
          await setDoc(userDoc, { status: SWORD }, { merge: true });
          useUserStore.setState({ userStatus: SWORD });
        }
      }
      if (data.role === '마법사') {
        if (MAGIC) {
          await setDoc(userDoc, { status: MAGIC }, { merge: true });
          useUserStore.setState({ userStatus: MAGIC });
        }
      }
      if (data.role === '궁수') {
        if (ARCHER) {
          await setDoc(userDoc, { status: ARCHER }, { merge: true });
          useUserStore.setState({ userStatus: ARCHER });
        }
      }
    }
    if (data.text) {
      setStoryData(data.text);
      localStorage.setItem('story', data.text);
      // Save story to Firestore
      if (!userId) throw new Error('User not authenticated');
      const userDoc = doc(db, 'users', userId); // Replace 'userId' with the actual user ID
      await setDoc(userDoc, { story: data.text }, { merge: true });
    }
  } catch (err) {
    console.error('Failed to fetch story and role:', err);
  }
};
