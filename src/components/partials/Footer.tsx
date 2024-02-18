import React from 'react';
import logo from '../../assets/images/dice.png'

export const Footer = () => {
    
    const year = new Date().getFullYear();

    return (
        <footer className='l-sec l-sec--small l-sec--header'>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col col--logo logo">
                        <img className='logo-icon' src={logo} alt='dice' />
                        <h2 className='h1'><span>RPG-FINDER</span></h2>
                    </div>
                    <div className="col col--copy">Copyright © {year}</div>
                </div>
            </div>
        </footer>
    )

}