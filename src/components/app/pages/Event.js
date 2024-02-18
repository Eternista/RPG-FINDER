import { useState, useEffect } from "react";
import { useAuthentication } from "../Auth";
import { getFirestore, collection, getDocs, updateDoc, doc, arrayUnion, getDoc } from "firebase/firestore";
import { Sidebar } from "../components/Sidebar";
import { ChatRoom } from "../ChatRoom";

export const Events = () => {
  const [activeUser] = useAuthentication();
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [nameSearch, setNameSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [categorySearch, setCategorySearch] = useState("all");
  const [activeChatID, setChatID] = useState('');
  const [activeImage, setChatImage] = useState('');
  const [activeTitle, setChatTitle] = useState('');
  const fetchEvents = async () => {
    try {
      const firestore = getFirestore();
      const eventsCollection = collection(firestore, 'events');
      const eventsSnapshot = await getDocs(eventsCollection);
      const eventsData = eventsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setEvents(eventsData);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const joinEvent = async (eventId) => {
    try {
      const firestore = getFirestore();
      const eventDocRef = doc(firestore, 'events', eventId);

      const eventDoc = await getDoc(eventDocRef);
      if (eventDoc.exists() && eventDoc.data().players.length < eventDoc.data().limit) {
        await updateDoc(eventDocRef, {
          players: arrayUnion(activeUser.uid)
        });
        const userDocRef = doc(firestore, 'users', activeUser.uid);
        await updateDoc(userDocRef, {
            events: arrayUnion({
              id: eventId,
            })
          });
        fetchEvents();
      }
    } catch (error) {
      console.error("Error joining event:", error);
    }
  };
  const filteredEvents = events.filter(event => {
    const eventDate = event.when.toDate();
    const start = startDate ? new Date(startDate) : new Date(-8640000000000000); // Very past date if start date is not set
    const end = endDate ? new Date(endDate) : new Date(8640000000000000); // Very future date if end date is not set

    return (
      event.name.toLowerCase().includes(nameSearch.toLowerCase()) &&
      event.city.toLowerCase().includes(citySearch.toLowerCase()) &&
      (categorySearch === "all" || event.gameSystem === categorySearch) &&
      eventDate >= start && eventDate <= end
    );
  });

  return (
    <>
      <main className='app-content d-flex'>
        <Sidebar activePage='Events' />
        <section className="l-sec l-sec--events">
            <div className="container">
                <div className="row">
                  <div className="col-12 mb-3">
                    <form className="event-form" >
                      <div className="wrapper">
                        <label className="wrapper_name" >
                          <p>Event Name:</p>
                          <input
                            type="text"
                            placeholder="Search by event name"
                            value={nameSearch}
                            className="btn btn--search d-block mx-auto mb-2"
                            onChange={(e) => setNameSearch(e.target.value)}
                            />
                        </label>
                        <label className="wrapper_date" >
                          <p>Search by Date:</p>
                          <div className="part">
                            <p><small>From:</small></p>
                            <input
                              type="date"
                              placeholder="Start date"
                              value={startDate}
                              className="btn btn--search d-block mx-auto mb-2"
                              onChange={(e) => setStartDate(e.target.value)}
                              />
                            </div>
                            <div className="part">
                              <p><small>To:</small></p>
                              <input
                                type="date"
                                placeholder="End date"
                                value={endDate}
                                className="btn btn--search d-block mx-auto mb-2"
                                onChange={(e) => setEndDate(e.target.value)}
                                />
                            </div>
                        </label>
                        <label className="wrapper_city">
                          <p>Event City:</p>
                          <input
                            type="text"
                            placeholder="Search by city"
                            value={citySearch}
                            className="btn btn--search d-block mx-auto mb-2"
                            onChange={(e) => setCitySearch(e.target.value)}
                            />
                        </label>
                        <label className="wrapper_category" >
                          <p>System: </p>
                          <select
                            className="btn btn--seg d-block mx-auto mb-2"
                            value={categorySearch}
                            onChange={(e) => setCategorySearch(e.target.value)}
                            >
                            <option value="all">All Categories</option>
                            <option value="dnd">Dungeons and Dragons</option>
                            <option value="coc">Call of Cthulhu</option>
                            <option value="lotr">One Ring</option>
                            <option value="war">Warhammer</option>
                            <option value="path">Pathfinder</option>
                            <option value="cus">Custom</option>
                          </select>
                        </label>
                      </div>
                    </form>
                  </div>
                  {filteredEvents.length > 0 ? (
                    filteredEvents.map(event => (
                      <div key={event.id} className="col-lg-4 col-md-6 col-12">
                        <div className="event">
                          <div className="event_image">
                            <img src={event.image} alt={event.name}/>
                          </div>
                          <div className="event_text">
                            <h3>{event.name} <br/> <small>Players: {event.players.length - 1} / {event.limit}</small></h3>
                            <h3>Game Master: {event.dm}</h3>
                            <h4>{event.city} - {event.when.toDate().toLocaleString()}</h4>
                            <p>{event.desc}</p>
                            {event.players.includes(activeUser.uid) ? (
                              <button onClick={() => { console.log(activeChatID)
                                setChatID(event.chatID);
                                setChatImage(event.image);
                                setChatTitle(event.name);
                                }} className="btn btn-primary">Join Chat</button>
                            ) : (
                              <>
                              {event.players.length -1 <= event.limit ? 
                              <button className="btn btn-primary" onClick={() => joinEvent(event.id)}>Join Event</button>
                              : 'Out of spots'}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-12">No matching events found</div>
                  )}
                </div>
            </div>
        </section>
        {activeChatID !== '' ? <ChatRoom receiverName={activeTitle} receiverImg={activeImage} chatID={activeChatID} /> : <></>}
      </main>
    </>
  );
};
