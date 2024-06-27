import React, { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };
    fetchUsers();
  }, []);

  const handleUpdateUser = async (userId, updatedUser) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, updatedUser);
      const updatedUsers = users.map((user) => {
        if (user.id === userId) {
          return { ...user, ...updatedUser };
        }
        return user;
      });
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const userRef = doc(db, "users", userId);
      await deleteDoc(userRef);
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-white hover:text-primary">
        Gestionar Usuarios
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {users?.length > 0 ? (
          users.map(user => (
            <div
              key={user.id}
              className="card text-center space-y-3 sm:space-y-6 p-4 sm:py-16 bg-gray-200 dark:bg-dark hover:bg-primary/20 dark:hover:bg-primary/50 duration-300 text-black dark:text-white rounded-lg group"
            >
              <h1 className="text-3xl font-bold">{user.email}</h1>
              <p>Rol: {user.rol}</p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => handleUpdateUser(user.id, { email: 'nuevoemail@example.com', password: 'nuevapassword', rol: 'nuevorol' })}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => {
                    setSelectedUserId(user.id);
                    setShowDeleteConfirmation(true);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-10 my-10 bg-gray-100 dark:bg-dark container mx-auto">
            <h1 className="text-3xl font-bold text-white hover:text-primary text-center">
              NO HAY USUARIOS PARA MOSTRAR
            </h1>
          </div>
        )}
      </div>
      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg text-center space-y-4">
            <h2 className="text-xl font-bold">Confirmar Eliminación</h2>
            <p>¿Estás seguro de que deseas eliminar este usuario?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Confirmar
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
