import { Link } from 'react-router-dom';
import logo from '../../assets/images/dice.png'


export const Header = () => {
    
    return (
        <header className='l-sec l-sec--small l-sec--header'>
            <div className="container">
                <div className="row">
                    <div className="col col--logo logo navbar-brand">
                        <img className='logo-icon' src={logo} alt='dice' />
                        <h1><span>RPG-FINDER</span></h1>
                    </div>
                    <nav className="navbar-links col col--nav">
                        <ul className='navbar-nav'>
                            <li className='nav-item'><Link to="/" className='nav-link'>Home</Link></li>
                            <li className='nav-item'><Link to="/games" className="nav-link">Games</Link></li>
                            <li className='nav-item'><Link to="/news" className="nav-link">News</Link></li>
                            <li className='nav-item'><Link to="/contact" className="nav-link">Contact</Link></li>
                            <li className='nav-item'><Link to="/app" className="nav-link">App</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )

}