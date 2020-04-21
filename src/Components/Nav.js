import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => (
    <nav className="main-nav">
        <ul>
            <li><NavLink to="/dogs">Dogs</NavLink></li>
            <li><NavLink to="/games">Games</NavLink></li>
            <li><NavLink to="/sports">Sports</NavLink></li>
        </ul>
    </nav>
)

export default Nav;
