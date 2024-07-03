import React, { useContext, useEffect, useState } from 'react';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { AuthenticationContext } from '../../services/authenticationContext/AuthenticationContext';

const Cart = () => {
  const { user } = useContext(AuthenticationContext);
  const [enrolledActivities, setEnrolledActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'activities'));
        const activitiesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        const userEnrolledActivities = activitiesData.filter(activity =>
          activity.enrolledUsers && activity.enrolledUsers.includes(user.email)
        );
        setEnrolledActivities(userEnrolledActivities);
      } catch (error) {
        console.error('Error fetching activities:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, [user]);

  const handleUnenroll = async activityId => {
    if (window.confirm('¿Estás seguro de que deseas darte de baja de esta actividad?')) {
      try {
        const activityDoc = doc(db, 'activities', activityId);
        const updatedEnrolledUsers = enrolledActivities
          .find(activity => activity.id === activityId)
          .enrolledUsers.filter(email => email !== user.email);
        await updateDoc(activityDoc, { enrolledUsers: updatedEnrolledUsers });
        setEnrolledActivities(prevState =>
          prevState.filter(activity => activity.id !== activityId)
        );
      } catch (error) {
        console.error('Error unenrolling from activity:', error);
      }
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className=" hover:text-primary text-white text-2xl font-bold mb-4">Mis Actividades</h2>
      {enrolledActivities.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {enrolledActivities.map(activity => (
            <div
              key={activity.id}
              className="card text-center space-y-3 sm:space-y-6 p-4 sm:py-16 bg-gray-200 dark:bg-dark hover:bg-primary/20 dark:hover:bg-primary/50 duration-300 text-black dark:text-white rounded-lg group"
            >
              <h1 className="text-3xl font-bold">{activity.name}</h1>
              <p>{activity.description}</p>
              <button
                className="bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-800 duration-300"
                onClick={() => handleUnenroll(activity.id)}
              >
                Darse de baja
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p className=" text-white text-lg font-semibold mt-2" >Aún no te anotaste a ninguna actividad. <a href="/" className="text-blue-500">Mira las actividades disponibles aquí</a>.</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
