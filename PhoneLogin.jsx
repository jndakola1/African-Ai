import { useState } from 'react';
import { auth, db } from './firebaseConfig';
import {
  RecaptchaVerifier,
  signInWithPhoneNumber
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

function PhoneLogin({ onAuthSuccess }) {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => handleSendOTP(),
      });
    }
  };

  const handleSendOTP = async () => {
    setError('');
    setLoading(true);
    try {
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(result);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleVerifyOTP = async () => {
    setError('');
    setLoading(true);
    try {
      const userCredential = await confirmationResult.confirm(otp);
      const user = userCredential.user;

      // Check if user profile already exists
      const ref = doc(db, 'users', user.uid);
      const profile = await getDoc(ref);

      if (!profile.exists()) {
        // Save new user
        await setDoc(ref, {
          uid: user.uid,
          name: user.phoneNumber,
          role: 'Guest',
          phone: user.phoneNumber,
          email: '',
        });
      }

      // Get final profile and pass it up
      const finalDoc = await getDoc(ref);
      onAuthSuccess(finalDoc.data());
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold text-center mb-2">Login with Phone</h2>

      {!confirmationResult ? (
        <>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+256700000000"
            className="border px-4 py-2 w-full rounded"
          />
          <button
            onClick={handleSendOTP}
            className="bg-black text-white px-4 py-2 w-full rounded hover:bg-gray-800"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send OTP'}
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="border px-4 py-2 w-full rounded"
          />
          <button
            onClick={handleVerifyOTP}
            className="bg-black text-white px-4 py-2 w-full rounded hover:bg-gray-800"
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify & Login'}
          </button>
        </>
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div id="recaptcha-container"></div>
    </div>
  );
}

export default PhoneLogin;