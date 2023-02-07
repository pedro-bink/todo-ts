import { Navigate, Outlet } from 'react-router-dom';
import { useContextTodo } from '../context/context';

type Props = {
  route?: string;
};

const ProtectedRoute = ({ route = '/' }: Props) => {
  const { authentication } = useContextTodo();
  if (!authentication) {
    return <Navigate to={route} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
