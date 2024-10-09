import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const token = useSelector((state: any) => state.user.token);
  return token ? <>{children}</> : <Navigate to="/login" />;
};

export default AuthRoute;
