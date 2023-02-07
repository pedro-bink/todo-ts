import { useContext, createContext, useState, useEffect } from 'react';
import { requestAPI } from '../services/Axios';
import useSWR, { Fetcher } from 'swr';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

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
  data: ITodo[] | undefined;
  authentication: boolean;
  userTasks: ITodo[] | undefined;
  setAuthentication: React.Dispatch<React.SetStateAction<boolean>>;
  setUserTasks: React.Dispatch<React.SetStateAction<ITodo[] | undefined>>;
  createTask: (todo: ITodo) => void;
  updateTask: (task: ITodo, id: string) => void;
  deleteTask: (id: string) => void;
  createUser: (user: IUser) => Promise<void>;
  Login: (user: ILogin) => Promise<void>;
};

type Props = {
  children: React.ReactNode;
};

export const TodoContext = createContext<TodoContextType | null>(null);

export function TodoProvider({ children }: Props) {
  const navigate = useNavigate();
  const [authentication, setAuthentication] = useState<boolean>(false);
  const [userTasks, setUserTasks] = useState<ITodo[]>();

  const api = 'http://localhost:3000';
  const fetcher: Fetcher<ITodo[] | undefined> = () =>
    requestAPI.get('/tasks').then((response) => {
      return response.data;
    });

  const { data, error, isLoading, mutate } = useSWR(`${api}/tasks`, fetcher);

  useEffect(() => {
    const authenticated = Cookies.get('authentication');
    if (authenticated) {
      setAuthentication(true);
    }
  }, []);

  const createTask = async (todo: ITodo) => {
    const newTodo: ITodo = {
      title: todo.title,
      description: todo.description,
      status: false,
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
    const response = await requestAPI.post('/users', newUser);
    if (response.status === 201) {
      navigate('/login');
    }
  };

  const Login = async (user: ILogin) => {
    const loginRequest: ILogin = {
      email: user.email,
      password: user.password,
    };
    const response = await requestAPI.post('/login', loginRequest);

    if (response.data.jwtFake) {
      Cookies.set('userId', response.data.userId);
      Cookies.set('jwtFake', response.data.jwtFake);
      Cookies.set('authentication', 'true');
      setAuthentication(true);
      navigate('/todo');
    }
  };

  return (
    <TodoContext.Provider
      value={{
        data,
        authentication,
        userTasks,
        setAuthentication,
        setUserTasks,
        createTask,
        updateTask,
        deleteTask,
        createUser,
        Login,
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
