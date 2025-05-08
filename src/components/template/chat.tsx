'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store/uiStore';
import { sendMessage } from '@/lib/sendMessage';
import { useChatMessage } from '@/hooks/useChatMessage';
import { useEffect, useRef, useState } from 'react';

export default function Chat() {
  const isChatOpen = useUIStore((state) => state.isChatOpen);
  const closeChat = useUIStore((state) => state.closeChat);
  const toggleChat = useUIStore((state) => state.toggleChat);
  const messages = useChatMessage('global');
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isChatOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isChatOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('handleSubmit');
    if (!text.trim()) return;
    await sendMessage('global', text.trim());
    setText('');
  };

  // body scroll control
  useEffect(() => {
    if (isChatOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isChatOpen]);

  // drawer outside close
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        closeChat();
      }
    };

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeChat();
      }
    };

    if (isChatOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [closeChat, isChatOpen]);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if (event.key === 'c' || event.key === 'ㅊ') {
        toggleChat();
        console.log('openchat!!!');
      }
    };

    document.addEventListener('keydown', handleShortcut);
    return () => {
      document.removeEventListener('keydown', handleShortcut);
    };
  }, [toggleChat, isChatOpen]);

  return (
    <AnimatePresence>
      {isChatOpen && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
          className="fixed top-0 left-0 h-full w-80 bg-zinc-900 shadow-xl z-50 p-4"
          ref={drawerRef}
        >
          <div>
            <h2 className="text-lg font-bold mb-2">💬 Chat</h2>
          </div>
          <div
            className="flex-1 overflow-y-auto text-white space-y-1 mb-2"
            style={{ maxHeight: 'calc(100vh - 100px)' }}
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
              ref={inputRef}
              className="flex-1 p-1 rounded text-white"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="메시지 입력"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
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
