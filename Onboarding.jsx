function Onboarding({ onFinish }) {
  const handleContinue = () => {
    localStorage.setItem('afrigai_onboarded', 'true');
    onFinish();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to Afri-GAi</h1>
      <p className="text-gray-700 mb-4 max-w-md">
        Afri-GAi is your culturally aware assistant — built for leaders, youth, farmers, and students in Africa. 
        You can chat, ask for proverbs, health tips, Bible verses, and more — even offline.
      </p>
      <p className="text-gray-600 italic mb-6">“Wisdom is like fire. People take it from others.” — African Proverb</p>
      <button
        onClick={handleContinue}
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
      >
        Get Started
      </button>
    </div>
  );
}

export default Onboarding;