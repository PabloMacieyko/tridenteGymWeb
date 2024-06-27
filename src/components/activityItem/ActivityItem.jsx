import React from "react";
import PropTypes from "prop-types";

const ActivityItem = ({ name, price, description }) => {

  return (
    <div className="card text-center space-y-3 sm:space-y-6 p-4 sm:py-16 bg-gray-200 dark:bg-dark hover:bg-primary/20 dark:hover:bg-primary/50 duration-300 text-black dark:text-white rounded-lg group">
      <h1 className="text-3xl font-bold">{name}</h1>
      <h1 className="text-center text-4xl font-semibold text-primary">
        ${price}
      </h1>
      <p>{description}</p>
      <button className="bg-green-600 hover:text-primary text-white font-bold py-2 px-4 rounded">
        <a href="#" className="group-hover:scale-105 duration-200">
          ANOTARSE
        </a>
      </button>
    </div>
  );
};

ActivityItem.propTypes = {
  icon: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  description: PropTypes.string,
};

export default ActivityItem;
