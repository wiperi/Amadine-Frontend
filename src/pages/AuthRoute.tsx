import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AuthRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = useSelector((state: any) => state.user.token);
  return token ? <>{children}</> : <Navigate to="/login" />;
};

export default AuthRoute;
