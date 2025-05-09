'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store/uiStore';
import { sendMessage } from '@/lib/sendMessage';
import { useChatMessage } from '@/hooks/useChatMessage';
import { useEffect, useRef, useState, useLayoutEffect } from 'react';

export default function Chat() {
  const isChatOpen = useUIStore((state) => state.isChatOpen);
  const closeChat = useUIStore((state) => state.closeChat);
  const toggleChat = useUIStore((state) => state.toggleChat);
  const messages = useChatMessage('global');
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEnterToFocus = (event: KeyboardEvent) => {
      if (isChatOpen && event.key === 'Enter' && document.activeElement !== inputRef.current) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleEnterToFocus);
    return () => {
      document.removeEventListener('keydown', handleEnterToFocus);
    };
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
      if ((event.key === 'C' || event.key === 'c' || event.key === 'ㅊ') && event.shiftKey) {
        toggleChat();
      }
    };

    document.addEventListener('keydown', handleShortcut);
    return () => {
      document.removeEventListener('keydown', handleShortcut);
    };
  }, [toggleChat, isChatOpen]);

  useLayoutEffect(() => {
    if (isChatOpen) {
      setTimeout(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'auto' });
      }, 0);
    }
  }, [isChatOpen, messages]);

  return (
    <AnimatePresence>
      {isChatOpen && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
          className="fixed top-0 left-0 h-full w-80 bg-zinc-900 shadow-xl z-50 flex flex-col"
          ref={drawerRef}
        >
          <div className="py-2 px-4">
            <h2 className="text-lg font-bold">💬 Chat</h2>
          </div>
          <div className="h-full overflow-y-auto text-white space-y-1 pb-1 px-4">
            {messages.map((msg) => (
              <div key={msg.id}>
                <strong>{msg.userName}</strong>: {msg.text}
              </div>
            ))}
            <div ref={scrollRef} />
          </div>
          <form onSubmit={handleSubmit} className="flex justify-between gap-2 bg-zinc-800 p-2 px-4">
            <input
              ref={inputRef}
              className="rounded w-full text-white bg-zinc-700 p-2"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="메시지 입력"
            />
            <button type="submit" className="text-white bg-zinc-700 p-2 flex-shrink-0 rounded">
              전송
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
