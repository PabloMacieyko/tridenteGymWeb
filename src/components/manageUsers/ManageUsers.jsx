import React, { useState, useEffect } from "react";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import NewUser from "../newUser/NewUser";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

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

  const saveUserDataHandler = async (enteredUserData) => {
    try {
      if (selectedUser) {
        const userRef = doc(db, "users", selectedUser.id);
        await updateDoc(userRef, enteredUserData);
        setSelectedUser(null);
      }
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
    } catch (error) {
      console.error("Error saving user data", error);
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteDoc(doc(db, "users", userToDelete));
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
      setShowDeleteConfirmation(false);
      setUserToDelete(null);
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  const handleDelete = (id) => {
    setUserToDelete(id);
    setShowDeleteConfirmation(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setUserToDelete(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-white hover:text-primary">
        Gestionar Usuarios
      </h1>
      <NewUser 
        onUserDataSaved={saveUserDataHandler}
        selectedUser={selectedUser}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {users?.length > 0 ? (
          users.map((user) => (
            <div
              key={user.id}
              className="card text-center space-y-3 sm:space-y-6 p-4 sm:py-16 bg-gray-200 dark:bg-dark hover:bg-primary/20 dark:hover:bg-primary/50 duration-300 text-black dark:text-white rounded-lg group"
            >
              <div className="item-center justify-center flex"></div>
              <h1 className="text-3xl font-bold">{user.email}</h1>
              <p>Rol: {user.rol}</p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
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
