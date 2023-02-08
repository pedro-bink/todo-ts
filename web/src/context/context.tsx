import { useContext, createContext, useState, useEffect } from 'react';
import { requestAPI } from '../services/Axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import useFetchTasks from '../services/useFetchTasks';

export interface ITodo {
  id?: string;
  title: string;
  status?: boolean;
  description: string;
  userId?: string;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

type TodoContextType = {
  authentication: boolean;
  userTasks: ITodo[] | undefined;
  userId: String;
  setAuthentication: React.Dispatch<React.SetStateAction<boolean>>;
  setUserTasks: React.Dispatch<React.SetStateAction<ITodo[] | undefined>>;
  createTask: (todo: ITodo) => void;
  updateTask: (task: ITodo, id: string) => void;
  deleteTask: (id: string) => void;
  createUser: (user: IUser) => Promise<void>;
  login: (user: ILogin) => Promise<void>;
  logout: () => void;
};

type Props = {
  children: React.ReactNode;
};

export const TodoContext = createContext<TodoContextType | null>(null);
export function TodoProvider({ children }: Props) {
  const navigate = useNavigate();
  const [authentication, setAuthentication] = useState<boolean>(false);
  const [userTasks, setUserTasks] = useState<ITodo[]>();
  const [userId, setUserId] = useState<String>('');
  const { mutate } = useFetchTasks();

  useEffect(() => {
    if (Cookies.get('authentication')) {
      setAuthentication(true);
      navigate('/');
      console.log('caiu n');
    } else {
      console.log('caiu');
      setAuthentication(false);
      navigate('/login');
    }
  }, [Cookies.get('authentication'), authentication]);

  const createTask = async (todo: ITodo) => {
    const newTodo: ITodo = {
      userId: Cookies.get('userId'),
      title: todo.title,
      description: todo.description,
    };
    await requestAPI.post('/tasks', newTodo);
    mutate();
  };

  const deleteTask = async (id: string) => {
    await requestAPI.delete(`/tasks/${id}`);
    mutate();
  };

  const updateTask = async (task: ITodo, id: string) => {
    await requestAPI.put(`/tasks/${id}`, task);
    mutate();
  };

  const createUser = async (user: IUser) => {
    const newUser: IUser = {
      name: user.name,
      email: user.email,
      password: user.password,
    };
    const response = await requestAPI.post('/register', newUser);
    if (response.status === 201) {
      navigate('/');
    }
  };

  const login = async (user: ILogin) => {
    const loginRequest: ILogin = {
      email: user.email,
      password: user.password,
    };
    const response = await requestAPI.post('/login', loginRequest);

    if (response.data) {
      setUserId(response.data.userId);
      var expirationTime = new Date(new Date().getTime() + 60 * (60 * 1000));
      Cookies.set('userId', response.data.userId, {
        expires: expirationTime,
      });
      Cookies.set('jwtFake', response.data.jwtFake, {
        expires: expirationTime,
      });
      Cookies.set('name', response.data.name, {
        expires: expirationTime,
      });
      Cookies.set('authentication', 'true', {
        expires: expirationTime,
      });
      setAuthentication(true);
      navigate('/');
    }
  };

  const logout = () => {
    Cookies.remove('authentication');
    Cookies.remove('userId');
    Cookies.remove('name');
    Cookies.remove('jwtFake');
    setAuthentication(false);
    navigate('/');
  };

  return (
    <TodoContext.Provider
      value={{
        authentication,
        userTasks,
        userId,
        setAuthentication,
        setUserTasks,
        createTask,
        updateTask,
        deleteTask,
        createUser,
        login,
        logout,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useContextTodo() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('Erro ao consumir contexto');
  }
  return context;
}

export default TodoContext;
