import { Progress } from '../ui/progress';

export default function ExpBar() {
  return (
    <>
      <Progress value={50} className="w-full [&>div]:bg-yellow-500" />
    </>
  );
}
