import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav>
            <Link>Home</Link>
            <Link>Currencies</Link>
            <Link>Portfolio</Link>
        </nav>
    )
}

export default Navbar
