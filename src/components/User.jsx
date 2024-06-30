import { useContext, useEffect } from 'react';
import { masterContext } from '../Context.jsx/Context';
import Logout from './Logout';
import { useNavigate } from 'react-router-dom';
// import { collection } from 'firebase/firestore';
import Create from './Create';
import View from './View';

const User = () => {
  const navigate = useNavigate();
  const { isAuth, setuserData, userData } = useContext(masterContext);
  // console.log(userData);

  useEffect(() => {
    if (isAuth) {
    }
  }, []);

  return (
    <div className='bg-black text-white'>
      <div className='flex justify-between p-5 bg-purple-600'>
        {isAuth ? (
          <div className='text-white'>
            <div>
              <div>
                {/* image will be here according to the gender asked during the login process  */}
              </div>
              <h1 className='font-bold italic flex items-center gap-2'>
                Hello, {userData?.name}!{' '}
                <span>
                  <img src='./hi.svg' alt='' className='h-4' />
                </span>{' '}
              </h1>{' '}
              <p className=''>{userData?.email}</p>
            </div>
            <div></div>
          </div>
        ) : (
          navigate('/')
        )}
        <div className='bg-red-600 text-white rounded-3xl text-center flex items-center px-3'>
          <Logout />
        </div>
      </div>
      <div>
        {
          isAuth && userData?.role === 'Employer' ? (
            <div>
              <Create />
            </div>
          ) : (
            <View />
          )

          // if user is a job seeker, display the job seeker dashboard here

          // if user is neither an employer nor a job seeker, redirect to the home page

          // if user is an employer and has not filled out the basic information yet, redirect to the basic information page

          // if user is a job seeker and has not filled out the basic information yet, redirect to the basic information page

          // if user is a job seeker and has filled out the basic information but has not applied for any jobs, redirect to the job application page

          // if user is a job seeker and has filled out the basic information and has applied for a job, redirect to the job details page

          // if user is a job seeker and has filled out the basic information and has applied
        }
      </div>
    </div>
  );
};
export default User;
