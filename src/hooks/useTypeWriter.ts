import { useEffect, useState } from "react"

export function useTypeWriter(text: string) {
  const [displayText, setDisplayText] = useState<string>('');
  
  useEffect(() => {
    if(!text) return;

    let i = 0;
    setDisplayText('');

    const interval = setInterval(()=>{
      const char = text.charAt(i);
      if (char) {
        setDisplayText((prev) => {
          if (char === '.') {
            return prev + char + '\n\n';
          } else {
            return prev + char;
          }
        });
        i++;
      } else {
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);



  }, [text]);

  return displayText;
}