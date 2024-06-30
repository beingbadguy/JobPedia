import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { masterContext } from '../Context.jsx/Context';
import User from './User';
import Logout from './Logout';
import { db } from '../config/firebase';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { CiHome } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import App from '../App';

const Login = () => {
  const { isAuth, userData, setuserData, setIsAuth, setuserId, userId, syncInfo } =
    useContext(masterContext);

  // console.log(isAuth);
  const [alert, setAlert] = useState();

  const [user, setUser] = useState({
    name: '',
    role: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    if (user.name != '' && user.role != '' && user.email != '' && user.password != '') {
      try {
        const response = await createUserWithEmailAndPassword(auth, user.email, user.password);

        await setDoc(doc(db, 'userInfo', response.user.uid), {
          name: user.name,
          email: user.email,
          role: user.role,
        });

        setuserId(response.user.uid);

        syncInfo(userId);

        localStorage.setItem('isAuth', true);

        setIsAuth(true);

        setUser({
          name: '',
          role: '',
          email: '',
          password: '',
        });
      } catch (error) {
        console.log(error.message);
        setAlert(error.message);
      }
    } else {
      setAlert('Enter all details carefully');
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setuserId(user.uid);
        setIsAuth(true);
        syncInfo(user.uid);
      } else {
        setIsAuth(false);
      }
    });

    return () => unsubscribe();
  }, [setIsAuth, setuserId, setuserData]);
  const navigate = useNavigate();
  useEffect(() => {}, [syncInfo]);

  if (isAuth) {
    return <User />;
  }

  return (
    <div className='bg-black text-white h-[100vh]'>
      {!isAuth ? (
        <div className='flex flex-col items-center pt-10'>
          <div
            className='text-3xl'
            onClick={() => {
              navigate('/');
            }}
          >
            <CiHome />
          </div>
          <h1 className='mt-10 text-center'>Sign Up From here</h1>
          <form onSubmit={submitHandle} className='flex flex-col gap-4 p-4 w-[100%]  text-black'>
            <input
              type='text'
              value={user.name}
              name='name'
              onChange={handleChange}
              className='border-2 border-black p-2'
              placeholder='Enter your name'
            />
            <select
              name='role'
              id=''
              value={user.role}
              onChange={handleChange}
              className='border-2 border-black text-black p-2'
            >
              <option value=''>--Select Role --</option>
              <option value='Employer' name='role'>
                Employer
              </option>
              <option value='Job Seeker' name='role'>
                Job Seeker
              </option>
            </select>
            <input
              type='email'
              value={user.email}
              name='email'
              onChange={handleChange}
              className='border-2 border-black  p-2'
              placeholder='Enter your Email'
            />
            <input
              type='password'
              value={user.password}
              name='password'
              onChange={handleChange}
              className='border-2 border-black  p-2'
              placeholder='Enter your Password'
            />
            <button className='p-2 bg-purple-600 text-white'>Log in</button>
          </form>
          <p className='font-bold text-red-500'>{alert}</p>
        </div>
      ) : null}
    </div>
  );
};
export default Login;
