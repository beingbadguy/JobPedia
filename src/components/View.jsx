import React, { useContext } from 'react';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { CiHome } from 'react-icons/ci';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { masterContext } from '../Context.jsx/Context';

const View = () => {
  const { job, fetchJobs } = useContext(masterContext);
  // console.log(job);
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
    <div className='flex gap-6 flex-wrap mt-5 mb-20 items-center justify-center'>
      <div className='flex flex-col items-center cursor-pointer'>
        <div
          onClick={() => {
            navigate('/');
          }}
        >
          <CiHome className='text-3xl text-purple-500' />
        </div>
        <h1 className='mt-2'>These are the newest Jobs that you can apply for.</h1>
      </div>

      {job &&
        job.map((item) => (
          <div
            key={item.id}
            className='border h-auto w-[400px] md:w-[240px] p-2 flex flex-col gap-4 mx-4'
          >
            <div className={`bg-${colors[random]}-200 p-2 flex flex-col gap-5`}>
              <div className='flex items-center justify-between '>
                <img src='' alt='' />
                <p className='bg-white rounded-xl w-20 text-center '>{item.Month}</p>
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
              <p className=' border border-black px-2 p-1 rounded-xl  text-center flex items-center justify-start mt-2'>
                {item.WorkHour}
              </p>
            </div>
            <div className='flex items-center justify-between'>
              <div>
                <p className='font-bold'>{item.Salary}</p>
                <p>{item.Location}</p>
              </div>
              <div>
                <a href={`mailto:${item.Email}`} className='bg-black rounded p-2 text-white'>
                  contact
                </a>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
export default View;
