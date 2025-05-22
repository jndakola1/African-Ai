function Settings({ darkMode, setDarkMode, selectedLanguage, setSelectedLanguage }) {
  const toggleDark = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('afrigai_dark', newMode);
    document.documentElement.classList.toggle('dark', newMode);
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Settings</h2>

      <div className="flex justify-between items-center">
        <p className="text-gray-700 dark:text-gray-300">Dark Mode</p>
        <button
         onClick={() => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem('afrigai_dark', newMode);
  }}
         className={`px-4 py-2 rounded text-white ${darkMode ? 'bg-green-600' : 'bg-gray-500'}`}
>
        {darkMode ? 'On' : 'Off'}
        </button>
      </div>

      <div>
        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
          Preferred Language:
        </label>
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="border px-4 py-2 rounded w-full bg-white dark:bg-gray-800 dark:text-white"
        >
          <option value="English">English</option>
          <option value="Swahili">Swahili</option>
          <option value="French">French</option>
        </select>
      </div>

      <div className="text-gray-500 text-sm mt-8 dark:text-gray-400">
        More features coming soon: notifications, privacy, and account settings.
      </div>
    </div>
  );
}

export default Settings;