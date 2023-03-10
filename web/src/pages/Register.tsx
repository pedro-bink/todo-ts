import React from 'react';
import { useForm } from 'react-hook-form';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import { useContextTodo } from '../context/context';

type Props = {};

const Register = (props: Props) => {
  const { createUser } = useContextTodo();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data: any) => {
    createUser(data);
    reset();
  };

  return (
    <div>
      <div className="flex flex-col justify-between">
        <Header />

        <div className="bg-stone-300 w-full h-[80vh] flex flex-col justify-center items-center">
          <form
            className="flex flex-col gap-5 p-10 max-w-[600px] w-[100%]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-3xl relative top-[-20px] font-bold text-sky-900">
              Register here
            </h1>
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-bold text-xl">
                Name
              </label>
              <input
                {...register('name', { required: true })}
                id="name"
                type="text"
                placeholder="Please type your name"
                className="border border-sky-500 rounded text-center w-full h-10"
              />
              {errors.name && <span>This field is required</span>}
            </div>

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
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Register;
