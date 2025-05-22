function LanguageSelector({ selectedLanguage, setSelectedLanguage }) {
  const languages = ['English', 'Swahili', 'French'];

  return (
    <div className="flex justify-center mb-6">
      <select
        className="border px-4 py-2 rounded text-sm"
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
      >
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LanguageSelector;