import { useState, useEffect, useRef } from 'react';

function ChatBox({ language }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      role: 'user',
      text: input.trim(),
      id: Date.now()
    };

    const botReply = {
      role: 'bot',
      text: `("${input.trim()}" interpreted in ${language})`,
      id: Date.now() + 1
    };

    setMessages([...messages, userMessage, botReply]);
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="flex flex-col h-[70vh] sm:h-[75vh] rounded-xl overflow-hidden border border-gray-300 dark:border-gray-700 shadow bg-white dark:bg-gray-800">
      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-[75%] px-4 py-2 rounded-lg shadow-sm text-sm ${
              msg.role === 'user'
                ? 'ml-auto bg-indigo-700 text-white'
                : 'mr-auto bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-3 bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={`Ask something in ${language}...`}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400"
          />
          <button
            onClick={sendMessage}
            className="bg-amber-500 hover:bg-amber-600 text-black px-4 py-2 rounded-lg shadow"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;