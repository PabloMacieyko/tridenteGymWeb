import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { AuthenticationContext } from '../../services/authenticationContext/AuthenticationContext';

const ActivityItem = ({ id, name, price, description, enrolledUsers }) => {
  const { user } = useContext(AuthenticationContext);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (enrolledUsers && user) {
      setIsEnrolled(enrolledUsers.includes(user.email));
    }
  }, [enrolledUsers, user]);

  const handleEnroll = async () => {
    if (isEnrolled) {
      setMessage('Ya estás anotado en esta actividad.');
      return;
    }

    try {
      const activityDoc = doc(db, 'activities', id);
      await updateDoc(activityDoc, { enrolledUsers: arrayUnion(user.email) });
      setIsEnrolled(true);
      setMessage('Te has anotado con éxito.');
    } catch (error) {
      console.error('Error enrolling in activity:', error);
      setMessage('PRIMERO DEBES LOGUEARTE');
    }
  };

  return (
    <div className="card text-center space-y-3 sm:space-y-6 p-4 sm:py-16 bg-gray-200 dark:bg-dark hover:bg-primary/20 dark:hover:bg-primary/50 duration-300 text-black dark:text-white rounded-lg group">
      <h1 className="text-3xl font-bold">{name}</h1>
      <h1 className="text-center text-4xl font-semibold text-primary">${price}</h1>
      <p>{description}</p>
      <button
        className={`${
          isEnrolled ? 'bg-gray-600' : 'bg-green-600'
        } hover:text-primary text-white font-bold py-2 px-4 rounded`}
        onClick={handleEnroll}
        disabled={isEnrolled}
      >
        {isEnrolled ? 'Ya inscrito' : 'ANOTARSE'}
      </button>
      {message && <p className="mt-2 text-red-500">{message}</p>}
    </div>
  );
};

ActivityItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  enrolledUsers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ActivityItem;
