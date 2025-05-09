import { getStoryAndRole } from '@/service/getStoryAndRole';
import { useUserStore } from '@/store/userStore';

export default function StartGameButton() {
  const setIsUserStoryLoading = useUserStore((state) => state.setIsUserStoryLoading);
  // 버튼 클릭시 작동되는 methods
  const handleStartJourney = async () => {
    setIsUserStoryLoading(true); // 로딩 시작
    await getStoryAndRole(); // 내부적으로 zustand에 저장됨
    setIsUserStoryLoading(false); // 로딩 종료
  };
  return (
    <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleStartJourney}>
      여정의 시작
    </button>
  );
}
