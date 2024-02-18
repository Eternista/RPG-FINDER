import React, {useState, useEffect} from 'react';
import { BrowserRouter , Route, Routes, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/scss/style.scss';

import Home from './components/pages/home';
import Games from './components/pages/games';
import Contact from './components/pages/contact';
import { Header } from './components/partials/Header';
import { Footer } from './components/partials/Footer';
import { Loading } from './components/pages/Loading';
import GameDetails from './components/pages/GameDetalis';
import News from './components/pages/News';
import NewsDetalis from './components/pages/NewsDetalis';
import { NoPage } from './components/pages/NoPage';

import { GameApp } from './components/app/GameApp';
import { Players } from './components/app/pages/Players';
import { EventCreate } from './components/app/pages/EventCreate';
import { Events } from './components/app/pages/Event';

function App() {

  const [loadingValue, setLoading] = useState<boolean>(true);

  
  const location = useLocation();
  const [hideHeaderFooter, setHideHeaderFooter] = useState<boolean>(false);
  useEffect(() => {
    
    setTimeout(() => {
      setLoading(false);
    }, 3000)
    console.clear();
  }, [])

  useEffect(() => {
    setHideHeaderFooter(location.pathname.startsWith('/app'));
  }, [location.pathname])

  return (
    <>

          {loadingValue ? (<Loading/> ) : (
            <>

            {!hideHeaderFooter && <Header />}
              <main>
                  <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/games/:category?" element={<Games />} />
                      <Route path="/games/post/:id" element={<GameDetails />} /> 
                      <Route path="/news/" element={<News />} />
                      <Route path="/news/post/:id" element={<NewsDetalis />} /> 
                      <Route path="/contact" element={<Contact />} />
                      <Route path='/app' element={<GameApp />} />
                      <Route path='/app/players' element={<Players />} />
                      <Route path='/app/event-create' element={<EventCreate />} />
                      <Route path='/app/events' element={<Events />} />
                      <Route path="*" element={<NoPage />} />
                  </Routes>
                </main>
                {!hideHeaderFooter && <Footer />}
            </>
          )}
    </>
  );
}

export default App;
