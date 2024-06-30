import React, { useContext } from 'react';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { CiHome } from 'react-icons/ci';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { masterContext } from '../Context.jsx/Context';
import { RiMessage2Line } from 'react-icons/ri';

const View = () => {
  const { job, fetchJobs } = useContext(masterContext);
  const navigate = useNavigate();
  const colors = ['green', 'red', 'yellow', 'blue', 'purple', 'orange'];
  const random = Math.floor(Math.random() * 6);

  const deleteHandle = async (id) => {
    try {
      const jobDoc = doc(db, 'jobs', id);
      await deleteDoc(jobDoc);
      fetchJobs();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <div className='flex flex-col items-center cursor-pointer pt-6'>
        <div
          onClick={() => {
            navigate('/');
          }}
        >
          <CiHome className='text-3xl text-purple-500' />
        </div>
        <h1 className='mt-2'>These are the newest Jobs that you can apply for.</h1>
      </div>
      <div className='flex gap-6 flex-col md:flex-row flex-wrap mt-5 pb-4 items-center md:justify-start justify-center'>
        {job &&
          job.map((item) => (
            <div
              key={item.id}
              className={`  rounded-t-xl border-${colors[random]}-400 h-auto flex-wrap md:min-w-[350px] min-h-[320px] w-[400px] md:w-[240px] p-2 flex flex-col mx-4`}
            >
              <div
                className={`bg-${colors[random]}-600 p-2 flex flex-col gap-5 rounded-t-xl text-white`}
              >
                <div className='flex items-center justify-between '>
                  <img src='' alt='' />
                  <p className='bg-white rounded-xl w-20 text-center text-black '>{item.Month}</p>
                  {/* <div
                  className='cursor-pointer text-xl'
                  onClick={() => {
                    deleteHandle(item.id);
                  }}
                >
                  <MdOutlineDeleteOutline />
                </div> */}
                </div>
                <p className=''>{item.CompanyName}</p>
                <h1 className='text-4xl'>{item.JobProfile}</h1>
                <p className=' border border-white px-2 p-1 rounded-xl  text-center flex items-center justify-start mt-2'>
                  {item.WorkHour}
                </p>
              </div>
              <div className='flex items-center justify-between bg-white text-black h-[80px] px-3 rounded-b-xl'>
                <div>
                  <p className='font-bold'>{item.Salary}</p>
                  <p>{item.Location}</p>
                </div>
                <div className='flex items-center bg-black rounded p-2  text-purple-200 gap-2'>
                  <a href={`mailto:${item.Email}`} className='text-white'>
                    contact
                  </a>
                  <RiMessage2Line />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default View;
