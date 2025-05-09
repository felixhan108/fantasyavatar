import { logoutUser } from '@/utils/logoutUser';
export default function Logout() {
  return (
    <button onClick={logoutUser}>로그아웃</button>
  )
}
