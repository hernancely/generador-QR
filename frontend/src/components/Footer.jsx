import React from 'react';
import { Footer as FlowbiteFooter } from 'flowbite-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FlowbiteFooter container className="bg-wedding-dark text-white rounded-none">
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between px-4">
          <FlowbiteFooter.Brand
            href="/"
            name="Galería de Boda"
            className="text-wedding-primary font-serif text-2xl"
          />
          <FlowbiteFooter.LinkGroup className="mt-3 flex-wrap items-center text-sm sm:mt-0">
            <FlowbiteFooter.Link href="#upload" className="mr-4 hover:text-wedding-primary">
              Subir Fotos
            </FlowbiteFooter.Link>
            <FlowbiteFooter.Link href="#gallery" className="mr-4 hover:text-wedding-primary">
              Galería
            </FlowbiteFooter.Link>
          </FlowbiteFooter.LinkGroup>
        </div>
        <FlowbiteFooter.Divider className="my-6 border-gray-700" />
        <FlowbiteFooter.Copyright
          by="Todos los derechos reservados"
          year={currentYear}
          className="text-gray-400"
        />
        <p className="mt-2 text-sm text-gray-400">
          Comparte tus mejores momentos con nosotros
        </p>
      </div>
    </FlowbiteFooter>
  );
};

export default Footer;
