import { useState, useRef, useEffect } from 'react';
import { FaTelegramPlane, FaPlusCircle, FaUser, FaCog, FaComments } from 'react-icons/fa';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [view, setView] = useState('chat');
  const bottomRef = useRef(null);

  const handleSend = () => {
  if (!input.trim()) return;

  const newMessage = { role: 'user', text: input.trim() };
  const reply = {
    role: 'bot',
    text: `This is Afri-GAi’s response to: "${input.trim()}"`,
  };

  setMessages((prev) => [...prev, newMessage, reply]);
  setInput('');
};
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white px-4 py-4 flex justify-center">
      <div className="w-full max-w-6xl flex flex-col rounded-xl shadow-lg overflow-hidden bg-white dark:bg-gray-800 min-h-[95vh] relative">

        {/* Top Bar */}
        <div className="flex justify-between items-center bg-pink-500 p-4">
          <div className="text-white font-bold text-lg">Menu</div>
          <div className="flex gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {view === 'chat' ? (
            messages.length === 0 ? (
              <div className="text-center text-xl font-semibold text-gray-400 mt-10">Results will appear here...</div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`max-w-xl px-4 py-2 rounded-lg text-sm shadow-md ${
                    msg.role === 'user'
                      ? 'ml-auto bg-indigo-700 text-white'
                      : 'mr-auto bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
                  }`}
                >
                  {msg.text}
                </div>
              ))
            )
          ) : view === 'profile' ? (
            <div className="text-center text-xl mt-10">Profile screen (Coming soon)</div>
          ) : (
            <div className="text-center text-xl mt-10">Settings screen (Coming soon)</div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Bottom Input */}
        {view === 'chat' && (
          <div className="bg-pink-500 p-4 flex items-center gap-3">
            <button className="text-white">
              <FaPlusCircle size={20} />
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 rounded-lg bg-white text-black outline-none"
            />
            <button onClick={handleSend} className="text-white">
              <FaTelegramPlane size={20} />
            </button>
          </div>
        )}

        {/* Floating Navigation */}
        <div className="absolute bottom-4 left-4 flex flex-col gap-3 z-50">
          <button
            onClick={() => setView('chat')}
            className={`p-3 rounded-full ${
              view === 'chat' ? 'bg-indigo-700 text-white' : 'bg-gray-200 dark:bg-gray-700'
            }`}
            title="Chat"
          >
            <FaComments size={18} />
          </button>
          <button
            onClick={() => setView('profile')}
            className={`p-3 rounded-full ${
              view === 'profile' ? 'bg-indigo-700 text-white' : 'bg-gray-200 dark:bg-gray-700'
            }`}
            title="Profile"
          >
            <FaUser size={18} />
          </button>
          <button
            onClick={() => setView('settings')}
            className={`p-3 rounded-full ${
              view === 'settings' ? 'bg-indigo-700 text-white' : 'bg-gray-200 dark:bg-gray-700'
            }`}
            title="Settings"
          >
            <FaCog size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;