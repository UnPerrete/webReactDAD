import React from 'react'
import { NavLink } from 'react-router'
import { useContext } from 'react';
import { LoginContext } from '../context';
import { Searchbar} from '../algolia/Searchbar';

export const Navbar = () => {
  const { toggleTheme } = useContext(LoginContext)

  const handleTheme = (event) =>{
    event.preventDefault();
    toggleTheme()
}
  return (
    <nav className="navbar fixed-top navbar-expand-lg" >
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <NavLink to='/' className="nav-link active">Inicio</NavLink>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to='/perrito' className="nav-link active">Perro</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/carrito" className="nav-link active">Carrito</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/form" className="nav-link active">Formulario</NavLink>
            </li>
          </ul>
          <div className='container text-end '>
            <div className='row justify-content-end row-cols-auto'>
              <div className='col'>
              <NavLink to="/login" className="nav-link active">
              <img src="src\images\slime.png" alt="Bootstrap" width="30" height="24" />
            </NavLink>
              </div>
              <div className='col'>
                <button onClick={handleTheme} className='btn btn-danger btn-sm'> ☀ </button>
              </div>
              <div className='col' style={{position: 'relative'}}>
                <Searchbar></Searchbar>
              </div>
            </div>
            
            
          </div>
        </div>

      </div>
    </nav>

  )
}

