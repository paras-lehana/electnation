'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { AshokaChakra } from '@/components/motifs/AshokaChakra';
import { streamChatResponse } from '@/lib/apiClient';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    {
      role: 'model',
      text: 'Namaste! Main Chunav Saathi hoon. Aapko election ke baare mein kuch poochna hai?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const appendModelDelta = (delta: string) => {
    setMessages((prev) =>
      prev.map((message, index) =>
        index === prev.length - 1 && message.role === 'model'
          ? { ...message, text: `${message.text}${delta}` }
          : message,
      ),
    );
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    // Add a placeholder message for the model
    setMessages((prev) => [...prev, { role: 'model', text: '' }]);

    try {
      await streamChatResponse(
        {
          locale: 'en',
          literacyComfort: 'standard',
          message: userMsg,
        },
        appendModelDelta,
      );
    } catch (error) {
      console.error(error);
      setMessages((prev) =>
        prev.map((message, index) =>
          index === prev.length - 1 && message.role === 'model'
            ? { ...message, text: 'Maaf karna, abhi main thoda busy hoon. Kripya baad mein try karein.' }
            : message,
        ),
      );
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="mb-4 flex w-[350px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl border border-khadi-200"
            >
              {/* Header */}
              <div className="flex items-center justify-between bg-saffron-500 p-4 text-white">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-saffron-500">
                    <AshokaChakra size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold">Chunav Saathi</h3>
                    <p className="text-xs text-saffron-100">AI Election Guide</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close Chunav Saathi chat"
                  className="rounded-full p-2 hover:bg-white/20 transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Chat Area */}
              <div className="flex h-[400px] flex-col gap-3 overflow-y-auto bg-khadi-50 p-4">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      msg.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3 text-sm shadow-sm ${
                        msg.role === 'user'
                          ? 'rounded-br-sm bg-leaf-500 text-white'
                          : 'rounded-bl-sm bg-white text-ink-900 border border-khadi-200'
                      }`}
                    >
                      {msg.text || (msg.role === 'model' && isTyping && (
                        <span className="flex gap-1">
                          <span className="animate-bounce">.</span>
                          <span className="animate-bounce delay-100">.</span>
                          <span className="animate-bounce delay-200">.</span>
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2 border-t border-khadi-200 bg-white p-3"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 rounded-full border border-khadi-300 bg-khadi-50 px-4 py-2 text-sm focus:border-saffron-500 focus:outline-none text-ink-900"
                  disabled={isTyping}
                />
                <Button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="h-10 w-10 rounded-full p-0 flex items-center justify-center bg-saffron-500 hover:bg-saffron-600 shadow-md flex-shrink-0"
                >
                  <span className="text-white text-xl">↑</span>
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close Chunav Saathi chat' : 'Open Chunav Saathi chat'}
          className="h-16 w-16 rounded-full bg-saffron-500 shadow-xl shadow-saffron-500/40 hover:bg-saffron-600 transition-transform hover:scale-105 p-0 flex items-center justify-center"
        >
          {isOpen ? (
            <span className="text-2xl text-white">✕</span>
          ) : (
            <AshokaChakra size={36} className="text-white animate-[spin_10s_linear_infinite]" />
          )}
        </Button>
      </div>
    </>
  );
}
