import { Home, User, Settings as Cog } from 'lucide-react';

function BottomNav({ currentTab, setCurrentTab }) {
  const tabs = [
    { id: 'chat', label: 'Chat', icon: Home },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Cog }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t dark:bg-gray-800 dark:border-gray-700 flex justify-around py-2 shadow sm:hidden">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setCurrentTab(id)}
          className={`flex flex-col items-center text-sm ${
            currentTab === id ? 'text-blue-600 font-bold' : 'text-gray-500'
          }`}
        >
          <Icon size={20} className="mb-1" />
          {label}
        </button>
      ))}
    </div>
  );
}

export default BottomNav;