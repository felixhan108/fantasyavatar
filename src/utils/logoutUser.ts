import { auth } from '@/config/firebase';
import { signOut } from 'firebase/auth';
import { useUserStore } from '@/store/userStore';

export async function logoutUser() {
  await signOut(auth);
  const store = useUserStore.getState();
  store.setUserName('');
  store.setUserId('');
  store.setRoleData('');
  store.setStoryData('');
  localStorage.removeItem('uid');
  localStorage.removeItem('displayName');
  localStorage.removeItem('role');
  localStorage.removeItem('story');
}
