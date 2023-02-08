import { requestAPI } from './Axios';
import { ITodo } from '../context/context';
import useSWR, { Fetcher } from 'swr';
import Cookies from 'js-cookie';

const useFetchTasks = (): {
  tasks: ITodo[] | undefined;
  isLoading: boolean;
  error: any;
  mutate: any;
} => {
  const userId = Cookies.get('userId');
  const fetcher: Fetcher<ITodo[] | undefined> = () =>
    requestAPI.get(`/tasks/${userId}`).then((response) => response.data);

  const { data, error, isLoading, mutate } = useSWR(
    `/tasks/${userId}`,
    fetcher,
  );

  return {
    tasks: data || [],
    isLoading,
    error,
    mutate,
  };
};

export default useFetchTasks;
