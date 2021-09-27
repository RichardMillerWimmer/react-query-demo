import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className='navbar'>
            <Link className='nav-link' to='/'>Home</Link>
            <Link className='nav-link' to='/currencies'>Currencies</Link>
            <Link className='nav-link' to='/portfolio'>Portfolio</Link>
        </nav>
    )
}

export default Navbar
