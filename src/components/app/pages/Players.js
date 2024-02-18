import { useState, useEffect } from "react";
import { useAuthentication } from "../Auth";
import { getFirestore, collection, getDocs, updateDoc, doc, arrayUnion, addDoc, getDoc } from "firebase/firestore";
import { Sidebar } from "../components/Sidebar";
import { ChatRoom } from "../ChatRoom";

export const Players = () => {
  const [activeUser] = useAuthentication();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeChatID, setChatID] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [receiverImg, setReceiverImg] = useState('');

  const fetchUsers = async () => {
    try {
      const firestore = getFirestore();
      const usersCollection = collection(firestore, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      const usersData = usersSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const createChat = async (user1, user2) => {
    try {
      const firestore = getFirestore();
      const chatRef = collection(firestore, 'messages');
      const chatDocRef = await addDoc(chatRef, {
        users: [user1, user2]
      });
      return chatDocRef.id;
    } catch (error) {
      console.error("Error creating chat:", error);
      return null;
    }
  };

  const addFriend = async (friendId) => {
    try {
      const firestore = getFirestore();
      const userDocRef = doc(firestore, 'users', activeUser.uid);

      // Dodaj friendId do listy znajomych przy użyciu arrayUnion
      await updateDoc(userDocRef, {
        friends: arrayUnion({
          userId: friendId,
          chatId: null  // Zainicjalizuj chatId na null, bo jeszcze go nie znamy
        })
      });

      // Dodaj również aktywnego użytkownika do listy znajomych nowo dodawanego użytkownika
      const friendDocRef = doc(firestore, 'users', friendId);
      const friendDocSnapshot = await getDoc(friendDocRef);

      // Sprawdź, czy użytkownicy mają już chatID
      const activeUserChatID = activeUser.chatID || null;
      const friendChatID = friendDocSnapshot.data().chatID || null;

      // Jeśli obaj użytkownicy mają już chatID, to nie twórz nowego chatu
      if (!activeUserChatID && !friendChatID) {
        // Jeśli żaden z użytkowników nie ma jeszcze chatID, stwórz nowy chat
        const newChatID = await createChat(activeUser.uid, friendId);

        // Zaktualizuj friendId w obu listach znajomych
        await updateDoc(userDocRef, {
          friends: arrayUnion({
            userId: friendId,
            chatId: newChatID
          })
        });

        await updateDoc(friendDocRef, {
          friends: arrayUnion({
            userId: activeUser.uid,
            chatId: newChatID
          })
        });
      }
      fetchUsers();
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  const filteredUsers = users.filter(user =>
    user.id !== activeUser.uid &&
    (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <main className='app-content d-flex'>
        <Sidebar activePage='Players' />
        <section className="l-sec l-sec--players">
            <div className="container">
                <div className="row">
                  <div className="col-12 mb-3">
                    <input
                      type="text"
                      placeholder="Search by name or email"
                      value={searchTerm}
                      className="btn btn--search d-block mx-auto mb-4"
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => (
                      <div key={user.id} className="col-lg-4 col-12">
                        <div className="user">
                          <div className="user_image">
                            <img src={user.image} alt={user.name}/>
                          </div>
                          <div className="user_text">
                            <h3>{user.name}</h3>
                            <h3>{user.email}</h3>
                            {user.friends && user.friends.some(friend => friend.userId === activeUser.uid) ? (
                              <button onClick={() => {
                                  setChatID(user.friends.find(friend => friend.userId === activeUser.uid).chatId);
                                  setReceiverName(user.name);
                                  setReceiverImg(user.image);
                              }} className="btn btn-primary" >Send Message</button>
                            ) : (
                              <button className="btn btn-primary" onClick={() => addFriend(user.id)}>Add</button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-12">No matching users found</div>
                  )}
                </div>
            </div>
        </section>
        {activeChatID !== '' ? <ChatRoom chatID={activeChatID} receiverName={receiverName} receiverImg={receiverImg} /> : <></>}
      </main>
    </>
  );
};
