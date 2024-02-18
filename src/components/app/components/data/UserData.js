import { useEffect, useState } from "react";
import { UserPush, UserShow } from "../../functions/Users";
import { ChatRoom } from "../../ChatRoom";
import  {EventShow } from "../../functions/Events";

export const UserData = (user) => {
  const GoogleUser = user.user;
  const userId = GoogleUser.uid;
  const [userData, setUserData] = useState();

  const [activeChatID, setChatID] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [receiverImg, setReceiverImg] = useState('');

  const [friendsDataList, setFriendDataList] = useState([]);
  const [eventDataList, setEventDataList]  = useState([]);

  UserPush(GoogleUser);

  const fetchData = async () => {
    const userFireData = await UserShow(userId);
    setUserData(userFireData);
  };

  const friendsData = async () => {
    if (userData && userData.friends) {
      const newFriendsList = [];
      for (const friend of userData.friends) {
        const friendDatas = await UserShow(friend.userId);
        newFriendsList.push(friendDatas);
      }
      setFriendDataList(newFriendsList);
    }
  }

  const eventsData = async () => {
    if (userData && userData.events) {
      const newEventsList = [];
      for (const event of userData.events) {
        const eventDatas = await EventShow(event);
        newEventsList.push(eventDatas);
      }
      setEventDataList(newEventsList);
    }
  }
  useEffect(() => {

    fetchData();
  }, [userId]);

  useEffect(() => {
    const fetchFriendsAndEvents = async () => {
      if (userData) {
        await friendsData();
        await eventsData();
      }
    };

    fetchFriendsAndEvents();
  }, [userData]);


  return (
    <>
      {userData ? (
        <>
          <section className='l-sec l-sec--dashboard'>
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="col col--userInfo">
                    <img src={userData.image} alt="Users Profiles" />
                    <h2>
                      Hi, <span className="special">{userData.name}!</span>
                    </h2>
                    <h3>
                      Your Email: <span className="special">{userData.email}</span>
                    </h3>
                    <h3>
                      Your Id: <span className="special">{userData.id}</span>
                    </h3>
                  </div>
                </div>
                <div className="col-lg-7 col-12">
                  <div className="col col--events">
                    {userData.events !== 0 ? (
                      <>
                        <h3>Events:</h3>
                        <hr/>
                        {eventDataList.map((event) => 
                        <>
                          <div className="event" key={event.id}>
                            <div className="event_image">
                              <img src={event.image} alt={event.name}/>
                            </div>
                            <div className="event_text">
                              <h3>{event.name}</h3>
                              <h4>{event.city} - {event.when.toDate().toLocaleString()}</h4>
                            </div>
                              {event.players && event.players.length > 0 && (
                                  <button
                                  onClick={() => {
                                    const eventData = event.players.find(e => e === userData.id);
                                    if (eventData) {
                                      setChatID(event.chatID);
                                      setReceiverName(event.name);
                                        setReceiverImg(event.image);
                                      } else {
                                        console.error("Chat data not found for the friend.");
                                      }
                                    }}
                                    className="btn btn-primary btn-short"
                                    >
                                    ✈️
                                  </button>
                                )}
                            </div>
                            <hr />
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <h3>
                          Sorry, but you are not in any
                          <span className="special"> event :c</span>
                        </h3>
                      </>
                    )}
                  </div>
                </div>
                <div className="col-lg-5 col-12">
                  <div className="col col--friends">
                    {friendsDataList.length > 0 ? (
                      <>
                        <h3>Friends:</h3>
                        <hr/>
                        {friendsDataList.map((friend) => 
                        <>
                          <div className="user" key={friend.id}>
                            <div className="user_image">
                              <img src={friend.image} alt={friend.name}/>
                            </div>
                            <div className="user_text">
                              <h3>{friend.name}</h3>
                              <h4>{friend.email}</h4>
                            </div>
                              {friend.friends && friend.friends.length > 0 && (
                                  <button
                                  onClick={() => {
                                    const friendData = friend.friends.find(f => f.userId === userData.id);
                                    if (friendData) {
                                      setChatID(friendData.chatId);
                                      setReceiverName(friend.name);
                                        setReceiverImg(friend.image);
                                      } else {
                                        console.error("Chat data not found for the friend.");
                                      }
                                    }}
                                    className="btn btn-primary btn-short"
                                    >
                                    ✈️
                                  </button>
                                )}
                            </div>
                            <hr />
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <h3>
                          Sorry, but you do not have any
                          <span className="special"> Friend :c</span>
                        </h3>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
          {activeChatID !== '' ? <ChatRoom chatID={activeChatID} receiverName={receiverName} receiverImg={receiverImg} /> : <></>}
        </>
      ) : (
        ""
      )}
    </>
  );
};
