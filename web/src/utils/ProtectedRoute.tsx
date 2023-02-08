import { Navigate, Outlet } from 'react-router-dom';
import { useContextTodo } from '../context/context';

type Props = {
  route?: string;
  inverse?: boolean;
};

const ProtectedRoute = ({ route = '/' }: Props) => {
  const { authentication } = useContextTodo();
  console.log(authentication);
  if (!authentication) {
    return <Navigate to={route} />;
  } else {
    return <Outlet />;
  }
};

export default ProtectedRoute;
