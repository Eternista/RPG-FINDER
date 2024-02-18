import { getFirestore, collection, doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { useEffect } from "react";

const firestore = getFirestore();

export const EventPush = (rpg) => {
  const generateId = (length = 8) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  
  const randomId = generateId();


    const rpgRef = collection(firestore, 'events');
    const rpgDocRef = doc(rpgRef, randomId);
  
    const checkGameExistence = async () => {
      const rpgDoc = await getDoc(rpgDocRef);

      

      if (!rpgDoc.exists()) {
        await setDoc(rpgDocRef, {
          name: rpg.title,
          desc: rpg.desc,
          dm: rpg.id,
          image: rpg.photoURL,
          gameSystem: rpg.system,
          id: rpg.gameId,
          chatId: randomId,
          players: [],
          limit: rpg.limit,
          createdAt: Timestamp.fromDate(new Date()),
          when: rpg.when
        });
      }
    };
    useEffect(() => {
  
        checkGameExistence();
    }, []);
  };


  export const EventShow = async (eventId) => {
    try {
      const eventRef = collection(firestore, 'events');
      const eventDocRef = doc(eventRef, eventId);
  
      const eventDoc = await getDoc(eventDocRef);
  
      if (eventDoc.exists()) {
  
        return eventDoc.data();
      } else {
  
        return null;
      }
    } catch (error) {
  
      console.error("Error fetching user data:", error);
      return null;
    }
  };