//import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, rtdb } from '@/config/firebase';
import { push, ref } from 'firebase/database';

// 4. function send Message
export async function sendMessage(roomId: string, text: string) {
  const user = auth.currentUser;

  if (!user) return;
  console.log('sendMessage');
  const messageRef = ref(rtdb, `chats/${roomId}/messages`);
  await push(messageRef, {
    uid: user.uid,
    userName: user.displayName,
    text,
    createdAt: Date.now(),
  });
}
