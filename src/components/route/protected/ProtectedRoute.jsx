import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthenticationContext } from '../../../services/authenticationContext/AuthenticationContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user, loading } = useContext(AuthenticationContext);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Component {...rest} />;
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default ProtectedRoute;
