import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Progress } from '../ui/progress';
import { useUserStore } from '@/store/userStore'; // Adjust the import path as necessary

const CharacterInfo: React.FC = () => {
  const userName = useUserStore((state) => state.userName); // Replace with actual user name from your state management or props
  const userStatus = useUserStore((state) => state.userStatus); // Replace with actual user name from your state management or props
  const userRole = useUserStore((state) => state.roleData); // Replace with actual user job from your state management or props

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span>🎖️ {userStatus?.level}</span>
          <span>🔖 {userRole}</span>
          <span>{userName}</span>
        </div>
        <div className="flex items-center gap-1">
          {/* <Image src="/assets/items/coin.gif" width={32} height={32} alt="coin" /> */}
          <span>💰</span>
          <span className="text-stone-300 text-sm">{userStatus?.gold}</span>
        </div>
      </div>
      <div className="flex items-center">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback></AvatarFallback>
        </Avatar>
        <div className="w-full flex flex-col gap-2 pl-4">
          <Progress
            value={((userStatus?.hp ?? 0) / (userStatus?.maxHp ?? 1)) * 100}
            className="w-full [&>div]:bg-red-500"
          />
          <Progress value={((userStatus?.mp ?? 0) / (userStatus?.maxMp ?? 1)) * 100} className="w-full [&>div]:bg-blue-500" />
        </div>
      </div>
    </div>
  );
};

export default CharacterInfo;
