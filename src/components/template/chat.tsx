'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store/uiStore';
import { sendMessage } from '@/lib/sendMessage';
import { useChatMessage } from '@/hooks/useChatMessage';
import { useState } from 'react';

export default function Chat() {
  const isChatOpen = useUIStore((state) => state.isChatOpen);
  const closeChat = useUIStore((state) => state.closeChat);
  const messages = useChatMessage('global');
  const [text, setText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('handleSubmit');
    if (!text.trim()) return;
    await sendMessage('global', text.trim());
    setText('');
  };

  return (
    <AnimatePresence>
      {isChatOpen && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
          className="fixed top-0 left-0 h-full w-80 bg-zinc-900 shadow-xl z-50 p-4"
        >
          <button onClick={closeChat} className="mb-4 text-right w-full">
            ❌ 닫기
          </button>
          <div>
            <h2 className="text-lg font-bold mb-2">💬 Chat</h2>
          </div>
          <div
            className="flex-1 overflow-y-auto text-white space-y-1 mb-2"
            style={{ maxHeight: 'calc(100vh - 150px)' }}
          >
            {messages.map((msg) => (
              <div key={msg.id}>
                <strong>{msg.userName}</strong>: {msg.text}
              </div>
            ))}
            <div ref={(el) => el?.scrollIntoView({ behavior: 'smooth' })} />
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              className="flex-1 p-1 rounded text-white"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="메시지 입력"
            />
            <button type="submit" className="text-white">
              전송
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
