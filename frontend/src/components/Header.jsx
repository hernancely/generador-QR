import React from 'react';
import { Navbar } from 'flowbite-react';

const Header = () => {
  return (
    <Navbar fluid className="bg-wedding-secondary shadow-md">
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-3xl font-bold text-wedding-primary font-serif">
          Nuestra Boda
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="#upload" className="text-lg hover:text-wedding-primary">
          Subir Fotos
        </Navbar.Link>
        <Navbar.Link href="#gallery" className="text-lg hover:text-wedding-primary">
          Galería
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
