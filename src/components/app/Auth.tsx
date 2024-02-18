// Auth.js

import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { app } from '../backend/firebase';

export const auth = getAuth(app);

export const SignIn = () => {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <>
      <section className='login'>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <button className="btn btn-primary my-5 mx-auto d-block" onClick={signInWithGoogle}>
                Sign in with Google
              </button>
            </div>
          </div>
        </div>

      </section>
    </>
  );
};

export const SignOut = () => {
  return auth.currentUser && <button className="btn btn-primary mx-2 my-3 d-block" onClick={() => signOut(auth)}>Sign Out</button>;
};

export const useAuthentication = () => {
  return useAuthState(auth);
};
