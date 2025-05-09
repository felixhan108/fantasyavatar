import { rtdb } from '@/config/firebase';
import { useState, useEffect } from 'react';
import { onValue, ref } from 'firebase/database';

// 3. chat message subscribe
export function useChatMessage(roomId: string) {
  const [messages, setMessages] = useState<
    { id: string; userName: string; text: string; createAt: Date }[]
  >([]);
  useEffect(() => {
    // const postQuery = query(collection(db, `chat/${roomId}/messages`), orderBy('createAt')); // 'createAt', 'asc'
    const messageRef = ref(rtdb, `chats/${roomId}/messages`);
    const unSubscribe = onValue(messageRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setMessages([]);
        return;
      }
      const parsed = Object.entries(data as Record<string, { userName: string; text: string; createAt: string }>).map(
        ([key, value]) => ({
          id: key,
          ...value,
        })
      );
      console.log('useChatMessage -> parsed', parsed);
      setMessages(parsed);
    });

    return () => unSubscribe();
  }, [roomId]);
  return messages;
}
