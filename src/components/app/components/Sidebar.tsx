import { Link } from 'react-router-dom';
import { SignOut } from '../Auth';
import logo from '../../../assets/images/dice.png'
import { useAuthentication } from '../Auth';
interface SidebarProps {
  activePage: string;
}

export const Sidebar = ({activePage} : SidebarProps) => {
  const [user] = useAuthentication();

    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark sidebar">
          <div className="logo">
           <img className='logo-icon' src={logo} alt='dice' />
           <h1><span>RPG FINDER</span></h1>
          </div>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
          {user && (
            <>
            <li className="nav-item">
              <Link to="/app" className={`nav-link ${activePage === 'Dashboard' ? "active" : 'text-white'}`} aria-current="page">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/app/players" className={`nav-link ${activePage === 'Players' ? "active" : 'text-white'}`}>
                Players
              </Link>
            </li>
            <li>
              <Link to="/app/events" className={`nav-link ${activePage === 'Events' ? "active" : 'text-white'}`}>
                Events
              </Link>
            </li>
            <li>
              <Link to="/app/event-create" className={`nav-link ${activePage === 'Create' ? "active" : 'text-white'}`}>
                Create Event
              </Link>
            </li>
            <hr />
          </>
            )
          }
          <li>
            <Link to="/" className="nav-link text-white">
              Home
            </Link>
          </li>
          <hr />
            <li>
              <SignOut />
            </li>
          </ul>
          <hr />
        </div>
      );
    };