import { useForm } from 'react-hook-form';
import { useContextTodo } from '../../context/context';

type Props = {};

const TaskForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { createTask } = useContextTodo();
  const onSubmit = (data: any) => {
    reset();
    console.log(data);
    createTask(data);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-6 gap-2">
      <h2 className="text-3xl font-bold text-sky-900">
        Create your tasks here
      </h2>
      <form
        className="flex flex-col gap-5 p-10 w-[600px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="task" className="font-bold text-xl">
            Title
          </label>
          <input
            {...register('title', { required: true })}
            id="task"
            type="text"
            placeholder="enter your task here"
            className="border border-sky-500 rounded text-center w-full h-10"
          />
          {errors.title && <span>This field is required</span>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="font-bold text-xl">
            Description
          </label>
          <input
            {...register('description', { required: true })}
            id="description"
            type="text"
            placeholder="enter the task's description"
            className="border rounded border-sky-500 text-center w-full h-10"
          />
          {errors.description && <span>This field is required</span>}
        </div>
        <div>
          <input
            type="submit"
            value="Submit"
            className="w-full cursor-pointer   text-center border font-semibold text-black bg-custom-bg-lightBlue rounded h-10"
          />
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
