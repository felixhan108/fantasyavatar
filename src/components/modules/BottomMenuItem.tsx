export default function BottomMenuItem({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <>
      <li
        onClick={onClick}
        className="w-full flex flex-col items-center justify-center bg-zinc-900 p-5"
      >
        {children}
      </li>
    </>
  );
}
