import { getFirestore, collection, doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { useEffect } from "react";
import { app } from '../../backend/firebase';

const firestore = getFirestore(app);

export const UserPush = (user) => {
  const usersRef = collection(firestore, 'users');
  const userDocRef = doc(usersRef, user.uid);

  useEffect(() => {
    const checkUserExistence = async () => {
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
          id: user.uid,
          friends: [],
          games: [],
          createdAt: Timestamp.fromDate(new Date()), // Używamy Timestamp dla spójnej obsługi dat
        });

        // window.location.reload(false);
      }
    };

    checkUserExistence();
  }, [user.uid, user.displayName, user.email, user.photoURL, userDocRef]);
};

export const UserShow = async (userId) => {
  try {
    const usersRef = collection(firestore, 'users');
    const userDocRef = doc(usersRef, userId);

    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {

      return userDoc.data();
    } else {

      return null;
    }
  } catch (error) {

    console.error("Error fetching user data:", error);
    return null;
  }
};

