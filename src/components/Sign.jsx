import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { masterContext } from '../Context.jsx/Context';
import { CiHome } from 'react-icons/ci';
import { auth } from '../config/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import User from './User';

const Sign = () => {
  const { isAuth, setIsAuth, syncInfo, setuserId } = useContext(masterContext);
  const [userlogin, setUserlogin] = useState({
    email: '',
    password: '',
  });
  const [newalert, setAlert] = useState('');
  const navigate = useNavigate();

  // Check if already authenticated and redirect
  useEffect(() => {
    if (isAuth) {
      navigate('/login');
    }
  }, [isAuth, navigate]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserlogin({ ...userlogin, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (userlogin.email !== '' && userlogin.password !== '') {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          userlogin.email,
          userlogin.password
        );

        const user = userCredential.user;
        setIsAuth(true);
        setuserId(user.uid);
        syncInfo(user.uid);
        localStorage.setItem('isAuth', true);
        navigate('/login');
      } else {
        setAlert('Please enter valid email and password');
      }
    } catch (error) {
      console.log(error.message);
      setAlert(error.message);
    }
  };

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
        setuserId(user.uid);
        syncInfo(user.uid);
        navigate('/login');
      } else {
        setIsAuth(false);
      }
    });

    return () => unsubscribe();
  }, [setIsAuth, setuserId, syncInfo, navigate]);

  if (isAuth) {
    return <User />;
  }

  return (
    <div className='h-screen bg-black text-white flex flex-col  pt-20 items-center'>
      <div className='text-3xl mb-4 cursor-pointer' onClick={() => navigate('/')}>
        <CiHome />
      </div>
      <h2 className='text-xl mb-4'>Login Here</h2>
      <form onSubmit={handleSubmit} className='flex flex-col gap-2 text-black w-80'>
        <input
          type='email'
          placeholder='Enter your email'
          className='border border-gray-400 p-2'
          name='email'
          value={userlogin.email}
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Enter your password'
          className='border border-gray-400 p-2'
          name='password'
          value={userlogin.password}
          onChange={handleChange}
        />
        <button type='submit' className='bg-purple-600 text-white p-2 rounded-md'>
          Log In
        </button>
      </form>
      {newalert && <p className='text-red-500'>{newalert}</p>}
    </div>
  );
};

export default Sign;
