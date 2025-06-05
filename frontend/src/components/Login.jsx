import React from 'react';
import googleIcon from '/images/google.png';
import logoVerde from '/images/logo.png';
import avatarIcon from '/images/avatar.png'; 

const Login = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Barra de navegación */}
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
            Categorías <span className="ml-1">▼</span>
          </li>
        </ul>

        {/* Avatar */}
        <div>
          <img
            src={avatarIcon}
            alt="Perfil"
            className="h-10 w-10 rounded-full border"
          />
        </div>
      </nav>

      {/* Contenido del login */}
      <div className="flex flex-1 bg-gray-100">
        <div className="w-1/2 flex items-center justify-center bg-white">
          <div className="w-3/4 max-w-md">
            <img src={logoVerde} alt="cocinArte logo" className="w-40 mb-6" />

            <h2 className="text-2xl font-semibold mb-6">Inicia sesión</h2>

            <button className="flex items-center justify-center w-full border border-gray-300 py-2 rounded mb-6 hover:bg-gray-100">
              <img src={googleIcon} alt="Google icon" className="w-5 h-5 mr-2" />
              Iniciar sesión con Google
            </button>

            <form>
              <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="email@ejemplo.com"
              />

              <label className="block text-sm font-medium mb-1" htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                className="w-full p-2 border border-gray-300 rounded mb-2"
                placeholder="••••••••"
              />

              <div className="text-right mb-4">
                <a href="#" className="text-xs text-gray-500 hover:underline">
                  ¿Has olvidado tu contraseña?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
              >
                Iniciar sesión
              </button>
            </form>

            <p className="text-sm text-center mt-4">
              ¿Todavía no tienes una cuenta?{' '}
              <a href="#" className="text-green-600 hover:underline">Regístrate</a>
            </p>
          </div>
        </div>

        <div className="w-1/2 hidden md:block bg-[url(/images/comida.jpg)] bg-cover bg-fixed"></div>
      </div>
    </div>
  );
};

export default Login;
