import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

function Profile({ user, setUser }) {
  const [displayName, setDisplayName] = useState(user.name);
  const [status, setStatus] = useState('');

  const handleUpdate = async () => {
    try {
      const ref = doc(db, 'users', user.uid);
      await updateDoc(ref, { name: displayName });
      setStatus('Name updated!');
    } catch (err) {
      setStatus('Error updating name.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('afrigai_user');
    setUser(null);
  };

  useEffect(() => {
    const fetch = async () => {
      const ref = doc(db, 'users', user.uid);
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        setDisplayName(docSnap.data().name);
      }
    };
    fetch();
  }, [user.uid]);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col min-h-[60vh] justify-between">
      <div>
        <h2 className="text-xl font-bold mb-4">Your Profile</h2>
        <input
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        />
        <button
          onClick={handleUpdate}
          className="bg-indigo-700 text-white px-4 py-2 rounded shadow hover:bg-indigo-800"
        >
          Save
        </button>
        {status && <p className="text-green-500 mt-2">{status}</p>}
      </div>

      <button
        onClick={handleLogout}
        className="text-sm mt-8 text-red-500 hover:underline self-start"
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;