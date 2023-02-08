import Cookies from 'js-cookie';
import { SignOut } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';
import { useContextTodo } from '../../context/context';

type Props = {};

const Header = (props: Props) => {
  const { setAuthentication, authentication, logout } = useContextTodo();
  const handleLogout = () => {
    logout();
  };

  const navigate = useNavigate();

  return (
    <div className="h-20 flex justify-around items-center bg-custom-bg-blue text-custom-text-blue ">
      {authentication && (
        <div className=" w-[10%] flex justify-center items-center">
          <p>Welcome, {Cookies.get('name')}!</p>
        </div>
      )}

      <div className="flex justify-center items-center ">
        <h1
          className="cursor-pointer text-base md:text-2xl"
          onClick={() => navigate('/')}
        >
          React + TS Todo List
        </h1>
      </div>

      {authentication && (
        <div className="w-[10%] flex justify-center items-center ">
          <SignOut
            className="cursor-pointer"
            size={32}
            onClick={handleLogout}
          />
        </div>
      )}
    </div>
  );
};

export default Header;
