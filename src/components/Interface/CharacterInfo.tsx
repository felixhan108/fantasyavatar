import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Progress } from '../ui/progress';

const CharacterInfo: React.FC = () => {
  return (
    <div className="w-full flex flex-col border">
      <div className="flex">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="w-full">
          <Progress value={50} className="w-full [&>div]:bg-red-500" />
          <Progress value={50} className="w-full [&>div]:bg-blue-500" />
          <p>500,000 G</p>
        </div>
      </div>
    </div>
  );
};

export default CharacterInfo;
