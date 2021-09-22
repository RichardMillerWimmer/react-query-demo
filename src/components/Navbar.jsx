import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav>
            <Link to='/'>Home</Link>
            <Link to='/currencies'>Currencies</Link>
            <Link to='/portfolio'>Portfolio</Link>
        </nav>
    )
}

export default Navbar
