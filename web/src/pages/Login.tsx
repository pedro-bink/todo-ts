import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import { useContextTodo } from '../context/context';

type Props = {};

const Login = (props: Props) => {
  const { Login } = useContextTodo();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data: any) => {
    Login(data);
    reset();
  };

  const navigate = useNavigate();

  return (
    <div>
      <div className="flex flex-col justify-between">
        <Header />

        <div className="bg-stone-300 w-full h-[80vh] flex flex-col justify-center items-center">
          <form
            className="flex flex-col gap-5 p-10 w-[600px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-3xl relative top-[-20px] font-bold text-sky-900">
              Log-in to use the todo list
            </h1>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-bold text-xl">
                E-mail
              </label>
              <input
                {...register('email', { required: true })}
                id="email"
                type="email"
                placeholder="Please type your email address"
                className="border border-sky-500 rounded text-center w-full h-10"
              />
              {errors.email && <span>This field is required</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="font-bold text-xl">
                Password
              </label>
              <input
                {...register('password', { required: true })}
                id="password"
                type="password"
                placeholder="Please type your password"
                className="border rounded border-sky-500 text-center w-full h-10"
              />
              {errors.password && <span>This field is required</span>}
            </div>
            <div>
              <input
                type="submit"
                value="Submit"
                className="w-full cursor-pointer   text-center border font-semibold text-black bg-custom-bg-lightBlue rounded h-10"
              />
            </div>
          </form>
          <p>
            Don't you already have an account?{' '}
            <span
              className="font-bold cursor-pointer"
              onClick={() => navigate('/register')}
            >
              {' '}
              register now!{' '}
            </span>
          </p>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Login;
