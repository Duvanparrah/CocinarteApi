import React from 'react';
import logoVerde from '/images/logo-verde.png'; // Asegúrate de tener el logo
import avatarIcon from '/images/avatar.png'; // Ícono de perfil (de ejemplo)

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center">
        <img src={logoVerde} alt="Logo cocinArte" className="h-10" />
      </div>

      {/* Menú */}
      <ul className="hidden md:flex space-x-6 font-semibold text-sm">
        <li className="hover:underline cursor-pointer">Inicio</li>
        <li className="hover:underline cursor-pointer">Banquetes</li>
        <li className="hover:underline cursor-pointer">Plan Nutricional</li>
        <li className="text-green-600 underline cursor-pointer">Comunidad</li>
        <li className="relative cursor-pointer">
          Categorías
          <span className="ml-1">▼</span>
        </li>
      </ul>

      {/* Avatar o ícono de usuario */}
      <div>
        <img
          src={avatarIcon}
          alt="Perfil"
          className="h-10 w-10 rounded-full border"
        />
      </div>
    </nav>
  );
};

export default Navbar;
