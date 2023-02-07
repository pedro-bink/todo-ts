import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import TaskForm from '../components/TaskForm/TaskForm';
import TaskList from '../components/TaskList/TaskList';

type Props = {};

const Todo = (props: Props) => {
  return (
    <div className="flex flex-col justify-between ">
      <Header />
      <div className="min-h-[calc(100vh-10rem)] flex flex-col flex-shrink flex-grow bg-">
        <div>
          <TaskForm />
        </div>
        <TaskList />
      </div>
      <Footer />
    </div>
  );
};

export default Todo;
