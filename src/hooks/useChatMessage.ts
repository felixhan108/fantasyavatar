import { query, collection, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { useState, useEffect } from 'react';

export function useChatMessage(roomId: string) {
  const [messages, setMessages] = useState<{ id: string; text: string; createAt: Date }[]>([]);
  useEffect(() => {
    const postQuery = query(collection(db, `chat/${roomId}/messages`), orderBy('createAt'));
    const unSubscribe = onSnapshot(postQuery, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            text: data.text || '',
            createAt: data.createAt ? new Date(data.createAt) : new Date(),
          };
        })
      );
    });
    return () => unSubscribe();
  }, [roomId]);

  return messages;
}
