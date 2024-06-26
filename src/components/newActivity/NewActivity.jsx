import React, { useReducer, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const initialActivityForm = {
  name: '',
  price: '',
  description: '',
  formValid: false,
};

const activityFormReducer = (state, action) => {
  switch (action.type) {
    case 'NAME_UPDATED':
      return {
        ...state,
        name: action.value,
        formValid: action.value && state.price && state.description,
      };
    case 'PRICE_UPDATED':
      return {
        ...state,
        price: action.value,
        formValid: action.value && state.name && state.description,
      };
    case 'DESCRIPTION_UPDATED':
      return {
        ...state,
        description: action.value,
        formValid: action.value && state.name && state.price,
      };
    case 'SET_FORM':
      return {
        ...action.payload,
        formValid: action.payload.name && action.payload.price && action.payload.description,
      };
    case 'RESET_FORM':
      return initialActivityForm;
    default:
      return state;
  }
};

const NewActivity = ({ onActivityDataSaved, selectedActivity }) => {
  const [activityForm, dispatch] = useReducer(activityFormReducer, initialActivityForm);
  const formRef = useRef(null);

  useEffect(() => {
    if (selectedActivity) {
      dispatch({ type: 'SET_FORM', payload: selectedActivity });
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      dispatch({ type: 'RESET_FORM' });
    }
  }, [selectedActivity]);

  const changeHandler = (event, type) => {
    dispatch({
      type,
      value: event.target.value,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const activityDto = {
      name: activityForm.name,
      price: parseInt(activityForm.price, 10),
      description: activityForm.description,
    };
    onActivityDataSaved(activityDto);
    dispatch({ type: 'RESET_FORM' });
  };

  return (
    <div ref={formRef} className="min-h-screen flex justify-center items-center dark:bg-dark">
      <div className="w-full max-w-md mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-white hover:text-primary">
          {selectedActivity ? 'Editar Actividad' : 'Crear Nueva Actividad'}
        </h1>
        <form onSubmit={submitHandler} className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label htmlFor="name" className="block text-white hover:text-primary text-sm font-bold mb-2">
              Nombre:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Ingrese el nombre de la actividad"
              value={activityForm.name}
              onChange={(e) => changeHandler(e, 'NAME_UPDATED')}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-white hover:text-primary text-sm font-bold mb-2">
              Precio:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Ingrese el precio"
              value={activityForm.price}
              onChange={(e) => changeHandler(e, 'PRICE_UPDATED')}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-white hover:text-primary text-sm font-bold mb-2">
              Descripción/horario:
            </label>
            <input
              type="text"
              id="description"
              name="description"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Ingrese la descripción"
              value={activityForm.description}
              onChange={(e) => changeHandler(e, 'DESCRIPTION_UPDATED')}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={!activityForm.formValid}
              className="bg-green-600 text-white hover:text-primary px-4 py-2 rounded-md hover:bg-green-700"
            >
              {selectedActivity ? 'Guardar Cambios' : 'Crear Actividad'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

NewActivity.propTypes = {
  onActivityDataSaved: PropTypes.func.isRequired,
  selectedActivity: PropTypes.object,
};

export default NewActivity;
