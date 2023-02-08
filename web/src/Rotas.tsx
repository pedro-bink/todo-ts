import { Routes, Route } from 'react-router-dom';
import Todo from './pages/Todo';
import Register from './pages/Register';
import ProtectedRoute from './utils/ProtectedRoute';
import Login from './pages/Login';

const Rotas = () => {
  return (
    <Routes>
      <Route path="/login" index element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute route="/login" />}>
        <Route path="/" element={<Todo />} />
      </Route>
    </Routes>
  );
};

export default Rotas;
