import React from "react";

const Login = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    // Lógica para iniciar sesión
  }
  return (
    <div className="min-h-screen flex justify-center items-center dark:bg-dark">
      <div className="w-full max-w-md mx-auto px-4">
        {/* Añade clases para controlar el espacio alrededor del formulario */}
        <h1 className="text-3xl font-bold text-center mb-8 text-white hover:text-primary">Iniciar Sesión</h1>
        <form className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label htmlFor="username" className="block text-white hover:text-primary text-sm font-bold mb-2">
              Usuario:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Ingrese su usuario"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-white hover:text-primary text-sm font-bold mb-2">
              Contraseña:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Ingrese su contraseña"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-green-600 text-white hover:text-primary px-4 py-2 rounded-md hover:bg-green-700"
            >
              Iniciar Sesión
            </button>
            <a href="#" className="text-blue-600 hover:text-primary hover:underline">
              ¿Olvidó su contraseña?
            </a>
          </div>
          <div className=" mt-4 flex items-center justify-between">
            <a
                href="/register"
                className="bg-green-600 text-white hover:text-primary px-3 py-2 rounded-md hover:bg-green-700"
              >
                Crea tu cuenta
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
