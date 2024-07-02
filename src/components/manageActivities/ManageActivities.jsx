import React, { useState, useEffect, useContext } from "react";
import NewActivity from "../newActivity/NewActivity";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { AuthenticationContext } from "../../services/authenticationContext/AuthenticationContext";

const ManageActivities = () => {
  const { isAdmin, isProfe } = useContext(AuthenticationContext);
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [activityToDelete, setActivityToDelete] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "activities"));
        const activitiesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setActivities(activitiesData);
      } catch (error) {
        console.error("Error fetching activities", error);
      }
    };
    fetchActivities();
  }, []);

  const saveActivityDataHandler = async (enteredActivityData) => {
    try {
      if (selectedActivity) {
        const activityRef = doc(db, "activities", selectedActivity.id);
        await updateDoc(activityRef, enteredActivityData);
        setSelectedActivity(null);
      } else {
        await addDoc(collection(db, "activities"), enteredActivityData);
      }
      const querySnapshot = await getDocs(collection(db, "activities"));
      const activitiesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setActivities(activitiesData);
    } catch (error) {
      console.error("Error saving activity data", error);
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteDoc(doc(db, "activities", activityToDelete));
      const querySnapshot = await getDocs(collection(db, "activities"));
      const activitiesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setActivities(activitiesData);
      setShowDeleteConfirmation(false);
      setActivityToDelete(null);
    } catch (error) {
      console.error("Error deleting activity", error);
    }
  };

  const handleDelete = (id) => {
    setActivityToDelete(id);
    setShowDeleteConfirmation(true);
  };

  const handleEdit = (activity) => {
    setSelectedActivity(activity);
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setActivityToDelete(null);
  };

  if (!isAdmin && !isProfe) {
    return <div>No tienes permisos para acceder a esta página</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-white hover:text-primary">
        Gestionar Actividades
      </h1>
      <NewActivity
        onActivityDataSaved={saveActivityDataHandler}
        selectedActivity={selectedActivity}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {activities?.length > 0 ? (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="card text-center space-y-3 sm:space-y-6 p-4 sm:py-16 bg-gray-200 dark:bg-dark hover:bg-primary/20 dark:hover:bg-primary/50 duration-300 text-black dark:text-white rounded-lg group"
            >
              <div className="item-center justify-center flex"></div>
              <h1 className="text-3xl font-bold">{activity.name}</h1>
              <h1 className="text-center text-4xl font-semibold text-primary">
                ${activity.price}
              </h1>
              <p>{activity.description}</p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => handleEdit(activity)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(activity.id)}
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
              NO HAY ACTIVIDADES PARA MOSTRAR
            </h1>
          </div>
        )}
      </div>
      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg text-center space-y-4">
            <h2 className="text-xl font-bold">Confirmar Eliminación</h2>
            <p>¿Estás seguro de que deseas eliminar esta actividad?</p>
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

export default ManageActivities;
