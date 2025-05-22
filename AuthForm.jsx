import { useState } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth, db } from './firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { FcGoogle } from 'react-icons/fc';

function AuthForm({ onAuthSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = isSignUp
        ? await createUserWithEmailAndPassword(auth, email, password)
        : await signInWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;
      const ref = doc(db, 'users', user.uid);
      const profile = await getDoc(ref);

      if (!profile.exists()) {
        await setDoc(ref, {
          uid: user.uid,
          name: user.email,
          email: user.email,
          role: 'Guest',
        });
      }

      const finalDoc = await getDoc(ref);
      onAuthSuccess(finalDoc.data());
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const ref = doc(db, 'users', user.uid);
      const profile = await getDoc(ref);

      if (!profile.exists()) {
        await setDoc(ref, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          role: 'Guest',
        });
      }

      const finalDoc = await getDoc(ref);
      onAuthSuccess(finalDoc.data());
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') {
        setError(err.message);
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6 w-full max-w-md text-center">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        {isSignUp ? 'Create an Account' : 'Login to Afri-GAi'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-indigo-700 hover:bg-indigo-800 text-white px-4 py-2 rounded-lg shadow"
        >
          {isSignUp ? 'Sign Up' : 'Login'}
        </button>
      </form>

      <div className="mt-4">
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 bg-white dark:bg-gray-200 text-gray-700 hover:bg-gray-100 border border-gray-300 rounded-lg py-2 mt-2 shadow-sm"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>
      </div>

      <p
        className="text-sm text-gray-600 dark:text-gray-400 mt-4 cursor-pointer hover:underline"
        onClick={() => setIsSignUp(!isSignUp)}
      >
        {isSignUp ? 'Already have an account? Login' : 'Don’t have an account? Sign up'}
      </p>
    </div>
  );
}

export default AuthForm;