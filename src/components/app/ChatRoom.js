import { getFirestore, collection, query, orderBy, limit, addDoc, serverTimestamp } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useRef, useState } from 'react';
import { app } from '../backend/firebase';
import { auth } from './Auth';


const firestore = getFirestore(app);

export function ChatRoom({chatID, receiverImg, receiverName}) {
    const dummy = useRef();
    const messagesRef = collection(firestore, `messages/${chatID}/messages`);
    const q = query(messagesRef, orderBy('createdAt'), limit(25));
  
    const [messages] = useCollectionData(q, { idField: 'id' });
  
    const [formValue, setFormValue] = useState('');
  
    const sendMessage = async (e) => {
      e.preventDefault();
  
      const { uid, photoURL } = auth.currentUser;
  
      await addDoc(messagesRef, {
        text: formValue,
        createdAt: serverTimestamp(),
        uid,
        photoURL,
      });
  
      setFormValue('');
      dummy.current.scrollIntoView({ behavior: 'smooth' });
    };
  
    return (
      <section className='l-sec l-sec--chat'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <header className='message-receiver'>
                <img src={receiverImg} alt={receiverName}/>
                <h3>{receiverName}</h3>
              </header>
              <div className='messages'>
                {messages && messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        
                <span ref={dummy}></span>
              </div>
              <form className='sender' onSubmit={sendMessage}>
                <input className="btn btn--search" value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />
                <button className="btn btn--submit" type="submit" disabled={!formValue}>
                  Send
                </button>
              </form>

            </div>
          </div>
        </div>
      </section>
    );
  }
  
  function ChatMessage(props) {
    const { text, uid, photoURL } = props.message;
  
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  
    return (
      <>
          <div className={`message ${messageClass}`}>
            <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} alt="avatar" />
            <p>{text}</p>
          </div>
      </>
    );
  }