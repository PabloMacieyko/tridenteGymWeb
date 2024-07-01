import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../../firebase/config';



const Register = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Crear el usuario
      const docRef = await addDoc(collection(db, 'users'), {
        email,
        password
      });
      console.log('Usuario creado con ID:', docRef.id);

      //Mostrar un mensaje de confirmación
      alert('Usuario creado exitosamente');

      // Limpiar los campos
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      alert('Error al crear el usuario');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center dark:bg-dark">
      <div className="w-full max-w-md mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-white hover:text-primary">Crea tu cuenta</h1>
        <form onSubmit={handleRegister} className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label htmlFor="email" className="block text-white hover:text-primary text-sm font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Ingrese su email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-green-600 text-white hover:text-primary px-10 py-2 rounded-md hover:bg-green-700"
            >
              Registrar
            </button>
            <a href="/login" className="px-10 py-2 text-blue-600 hover:text-primary hover:underline">
              ¿Ya tienes una cuenta? 
              Entonces ingresa aqui!
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
