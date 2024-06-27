import React, { useReducer, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';

const initialUserForm = {
  email: '',
  password: '',
  rol: '',
  formValid: false,
};

const userFormReducer = (state, action) => {
  switch (action.type) {
    case 'EMAIL_UPDATED':
      return {
        ...state,
        email: action.value,
        formValid: action.value && state.password && state.rol,
      };
    case 'PASSWORD_UPDATED':
      return {
        ...state,
        password: action.value,
        formValid: state.email && action.value && state.rol,
      };
    case 'ROL_UPDATED':
      return {
        ...state,
        rol: action.value,
        formValid: state.email && state.password && action.value,
      };
    case 'SET_FORM':
      return {
        ...action.payload,
        formValid: action.payload.email && action.payload.password && action.payload.rol,
      };
    case 'RESET_FORM':
      return initialUserForm;
    default:
      return state;
  }
};

const NewUser = ({ onUserDataSaved, selectedUser }) => {
  const [userForm, dispatch] = useReducer(userFormReducer, initialUserForm);
  const formRef = useRef(null);

  useEffect(() => {
    if (selectedUser) {
      dispatch({ type: 'SET_FORM', payload: selectedUser });
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      dispatch({ type: 'RESET_FORM' });
    }
  }, [selectedUser]);

  const changeHandler = (event, type) => {
    dispatch({
      type,
      value: event.target.value,
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const userDto = {
      email: userForm.email,
      password: userForm.password,
      rol: userForm.rol,
    };

    try {
      if (selectedUser) {
        const userRef = doc(db, 'users', selectedUser.id);
        await updateDoc(userRef, userDto);
      } else {
        await addDoc(collection(db, 'users'), userDto);
      }
      onUserDataSaved(userDto);
      dispatch({ type: 'RESET_FORM' });
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  return (
    <div ref={formRef} className="min-h-screen flex justify-center items-center dark:bg-dark">
      <div className="w-full max-w-md mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-white hover:text-primary">
          {selectedUser ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
        </h1>
        <form onSubmit={submitHandler} className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label htmlFor="email" className="block text-white hover:text-primary text-sm font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Ingrese el email del usuario"
              value={userForm.email}
              onChange={(e) => changeHandler(e, 'EMAIL_UPDATED')}
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
              placeholder="Ingrese la contraseña"
              value={userForm.password}
              onChange={(e) => changeHandler(e, 'PASSWORD_UPDATED')}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="rol" className="block text-white hover:text-primary text-sm font-bold mb-2">
              Rol:
            </label>
            <input
              type="text"
              id="rol"
              name="rol"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Ingrese el rol"
              value={userForm.rol}
              onChange={(e) => changeHandler(e, 'ROL_UPDATED')}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={!userForm.formValid}
              className="bg-green-600 text-white hover:text-primary px-4 py-2 rounded-md hover:bg-green-700"
            >
              {selectedUser ? 'Guardar Cambios' : 'Crear Usuario'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

NewUser.propTypes = {
  onUserDataSaved: PropTypes.func.isRequired,
  selectedUser: PropTypes.object,
};

export default NewUser;
