import { useContext, createContext } from 'react';
import { requestAPI } from '../lib/Axios';
import useSWR, { Fetcher } from 'swr';

export interface ITodo {
  id: string;
  title: string;
  status: boolean;
  description: string;
  date: Date;
}

type TodoContextType = {
  data: ITodo[] | undefined;
  createTask: (todo: ITodo) => void;
  updateTask: (task: ITodo, id: string) => void;
  deleteTask: (id: string) => void;
};

type Props = {
  children: React.ReactNode;
};

export const TodoContext = createContext<TodoContextType | null>(null);

export function TodoProvider({ children }: Props) {
  const api = 'http://localhost:5000';
  const fetcher: Fetcher<ITodo[] | undefined> = (url: string) =>
    fetch(url).then((res) => res.json());

  // const fetcher: Fetcher<ITodo, ITodo> = (id) => getUserById(id);
  const { data, error, isLoading, mutate } = useSWR(`${api}/tasks`, fetcher);

  const createTask = async (todo: ITodo) => {
    const newTodo: ITodo = {
      date: new Date(),
      title: todo.title,
      description: todo.description,
      id: '',
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

  return (
    <TodoContext.Provider value={{ data, createTask, updateTask, deleteTask }}>
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
