import { useEffect, useState } from 'react';

export function useTypeWriter(text: string) {
  const [displayText, setDisplayText] = useState<string>('');
  const [isEnd, setIsEnd] = useState<boolean>(false);

  useEffect(() => {
    if (!text) return;

    let i = 0;
    setDisplayText('');
    setIsEnd(false);

    const interval = setInterval(() => {
      const char = text.charAt(i);
      const isLastChar = i >= text.length - 1;

      if (char) {
        setDisplayText((prev) => {
          if (char === '.') {
            return prev + char + '\n\n';
          } else {
            return prev + char;
          }
        });
        i++;
        if (isLastChar) {
          clearInterval(interval);
          setIsEnd(true);
        }
      }
    }, 40);

    return () => {
      clearInterval(interval);
      setIsEnd(true);
    };
  }, [text]);

  return [displayText, isEnd];
}
