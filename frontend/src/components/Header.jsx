import React from 'react';
import { Navbar } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <Navbar fluid className="bg-wedding-secondary shadow-md">
      <Navbar.Brand as={Link} to="/">
        <span className="self-center whitespace-nowrap text-3xl font-bold font-serif">
          Nuestra Boda
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link
          as={Link}
          to="/"
          className={`text-lg hover:text-wedding-primary ${location.pathname === '/' ? 'text-wedding-primary font-semibold' : ''}`}
        >
          Galería
        </Navbar.Link>
        <Navbar.Link
          as={Link}
          to="/upload"
          className={`text-lg hover:text-wedding-primary ${location.pathname === '/upload' ? 'text-wedding-primary font-semibold' : ''}`}
        >
          Subir Fotos
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
