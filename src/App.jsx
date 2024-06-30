import { useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Logout from './components/Logout';
import User from './components/User';
const App = () => {
  const navigate = useNavigate();
  return (
    <div className='bg-[#c2e7da] h-[100vh] flex flex-col items-center justify-center gap-10 pt-20'>
      <img src='./pic.png' alt=' ' className='h-[250px]' />
      <div className='flex flex-col items-center justify-center bg-white rounded-xl p-10 m-10 gap-5'>
        <h1 className='font-bold text-center text-xl'>Your Dream Job Is Waiting For You.</h1>
        <p className='text-center text-sm text-gray-500'>
          Find intresting Vacancies From Trusted Companies.
        </p>
        <div className='flex gap-2'>
          <p
            onClick={() => {
              navigate('/login');
            }}
            className=' text-center border-2 border-black  text-black px-4 py-1 cursor-pointer rounded-xl w-[100px] '
          >
            Sign Up
          </p>
          <p
            onClick={() => {
              navigate('/sign');
            }}
            className=' text-center bg-black text-white px-4 py-1 cursor-pointer rounded-xl w-[100px] '
          >
            Log In
          </p>
        </div>
      </div>

      {/* <Login /> */}
    </div>
  );
};
export default App;
