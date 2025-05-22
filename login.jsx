import { useState } from 'react';

function Login({ onLogin }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  const handleLogin = () => {
    if (!name.trim() || !role) return;

    const userData = { name, role };
    localStorage.setItem('afrigai_user', JSON.stringify(userData));
    onLogin(userData);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-white">
      <h2 className="text-2xl font-bold mb-4">Welcome to Afri-GAi</h2>
      <input
        className="border px-4 py-2 rounded mb-4 text-center"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border px-4 py-2 rounded mb-4 text-center"
      >
        <option value="">Select your role</option>
        <option value="Leader">Leader</option>
        <option value="Youth">Youth</option>
        <option value="Farmer">Farmer</option>
        <option value="Student">Student</option>
      </select>
      <button
        onClick={handleLogin}
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
      >
        Continue
      </button>
    </div>
  );
}

export default Login;