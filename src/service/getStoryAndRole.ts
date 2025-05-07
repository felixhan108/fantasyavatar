import { useUserStore } from '@/store/userStore';

export const getStoryAndRole = async () => {
  try {
    const res = await fetch('/api/gameStart');
    const data = await res.json();

    const { setRoleData, setStoryData } = useUserStore.getState();

    if (data.role) {
      setRoleData(data.role);
      localStorage.setItem('role', data.role);
    }
    if (data.text) {
      setStoryData(data.text);
      localStorage.setItem('story', data.text);
    }
  } catch (err) {
    console.error('Failed to fetch story and role:', err);
  }
};
