import { useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Logout from './components/Logout';
import User from './components/User';

import { motion } from 'framer-motion';
import { useRef } from 'react';

const App = () => {
  const navigate = useNavigate();
  const constraintsRef = useRef(null);
  return (
    <div
      className='bg-black h-[100vh] flex flex-col items-center justify-center gap-10 pt-10'
      ref={constraintsRef}
    >
      <motion.div
        drag
        dragConstraints={constraintsRef}
        initial={{ scale: 0 }}
        animate={{ rotate: 360, scale: 1 }}
        transition={{
          duration: 5,
          type: 'spring',
          stiffness: 360,
          damping: 20,
        }}
      >
        <img src='./cp.png' alt=' ' className='h-[250px]' />
      </motion.div>
      <motion.div
        initial={{ x: 10, scale: 0 }}
        animate={{ x: 0, scale: 1 }}
        transition={{
          delay: 1,
          type: 'spring',
          stiffness: 360,
          damping: 20,
        }}
        className='flex flex-col items-center justify-center text-white rounded-xl p-10 m-10 gap-5'
      >
        <div>
          <h1 className='font-bold text-center text-4xl'>Your Dream Job Is Waiting For You.</h1>
        </div>

        <p className='text-center text-sm text-gray-500'>
          Find intresting Vacancies From Trusted Companies.
        </p>
        <div className='flex gap-2'>
          <p
            onClick={() => {
              navigate('/login');
            }}
            className=' text-center border-2 border-purple-600  text-white px-4 py-1 cursor-pointer rounded-xl w-[150px] '
          >
            Sign Up
          </p>
          <p
            onClick={() => {
              navigate('/sign');
            }}
            className=' text-center bg-purple-600 text-white px-4 py-1 cursor-pointer rounded-xl w-[150px] '
          >
            Log In
          </p>
        </div>
      </motion.div>

      {/* <Login /> */}
    </div>
  );
};
export default App;
