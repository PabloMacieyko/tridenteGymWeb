import React from "react";
import PropTypes from "prop-types";
import ActivityItem from "../activityItem/ActivityItem";

const Activities = ({ activities }) => {
  
  console.log('Activities:', activities);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {activities?.length > 0 ? (
        activities.map((activity) => (
          <ActivityItem
            key={activity.id}
            id={activity.id}
            icon={activity.icon}
            name={activity.name}
            price={activity.price}
            description={activity.description}
          />
        ))
      ) : (
        <div className="py-10 my-10 bg-gray-100 dark:bg-dark container mx-auto">
          <h1 className="text-3xl font-bold text-white hover:text-primary text-center">
            NO HAY ACTIVIDADES PARA MOSTRAR
          </h1>
        </div>
      )}
    </div>
  );
};

Activities.propTypes = {
  activities: PropTypes.array,
};

export default Activities;
