import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../Authorization/Auth'

const Navbar = () => {
    const auth = useAuth()
    const handleLogOut = () => {
        auth.logout()
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to='/'>Flipkart</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" href="#">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='about'>About</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to='' tabIndex="-1" aria-disabled="true">Cart</Link>
                        </li>
                    </ul>
                    {
                        auth.user && (
                            <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        )
                    }

                    <li className="nav-item">
                        {
                            auth.user ? (
                                <Link className='btn btn-success mx-1' type="button" onClick={handleLogOut}>Logout</Link>
                            ) : (<>
                                <Link className="btn btn-success mx-1" to='login' type="button">Login</Link>
                                <Link className="btn btn-success mx-1" to='register' type="button">Register</Link>
                            </>)
                        }
                    </li>
                    <div className="btn-group">
                        {
                            auth.user && (
                                <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">{auth.user.user_name}</button>
                            )
                        }
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li><Link className="dropdown-item" to=''>Profile</Link></li>
                            <li><Link className="dropdown-item" to='my_product'>My products</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar