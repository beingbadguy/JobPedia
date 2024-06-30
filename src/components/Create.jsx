import React, { useContext, useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../config/firebase';
import { IoAddCircleOutline } from 'react-icons/io5';
import { FaCaretRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { masterContext } from '../Context.jsx/Context';

const Create = () => {
  const { fetchJobs } = useContext(masterContext);
  const [error, setError] = useState();

  const [add, setAdd] = useState(false);
  const navigate = useNavigate();

  const [createJob, setCreateJob] = useState({
    CompanyName: '',
    Email: '',
    JobProfile: '',
    Location: '',
    Month: '',
    Salary: '',
    WorkHour: '',
  });
  const jobData = collection(db, 'jobs');

  const inputHandle = (e) => {
    const { name, value } = e.target;
    setCreateJob({ ...createJob, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      createJob.CompanyName != '' &&
      createJob.Email != '' &&
      createJob.JobProfile != '' &&
      createJob.Location != '' &&
      createJob.Month != '' &&
      createJob.Salary != '' &&
      createJob.WorkHour != ''
    ) {
      try {
        await addDoc(jobData, {
          CompanyName: createJob.CompanyName,
          Email: createJob.Email,
          JobProfile: createJob.JobProfile,
          Location: createJob.Location,
          Month: createJob.Month,
          Salary: createJob.Salary,
          WorkHour: createJob.WorkHour,
        });
        fetchJobs();
        setCreateJob({
          CompanyName: '',
          Email: '',
          JobProfile: '',
          Location: '',
          Month: '',
          Salary: '',
          WorkHour: '',
        });
        setAdd(false);
        setError(
          'Thankyou for posting job, you can check out this job by signing up as a Job Seeker'
        );
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }
    } else {
      setError('All Fields are required');
    }
  };
  return (
    <div>
      {/* <div
        className='flex items-center justify-between p-4 bg-green-200 text-black mx-3 cursor-pointer mb-2 mt-5'
        onClick={() => {
          navigate('/jobs');
        }}
      >
        <p className=''>Go to Job Section</p>
        <div>
          <FaCaretRight />
        </div>
      </div> */}

      <div
        className={` ${
          add ? 'h-[500px]' : 'h-16'
        } overflow-hidden transition-all duration-500 mt-10`}
      >
        <div
          className='flex justify-between items-center p-4 bg-purple-200 text-black mx-3 cursor-pointer mb-2'
          onClick={() => {
            setAdd(!add);
          }}
        >
          <h1 className=''>Click here to post jobs</h1>
          <div>
            <IoAddCircleOutline />
          </div>
        </div>

        <form onSubmit={handleSubmit} className='flex flex-col gap-2 px-3 mb-5'>
          <input
            type='text'
            name='CompanyName'
            value={createJob.CompanyName}
            placeholder='CompanyName'
            onChange={inputHandle}
            className='p-2 border-2'
          />
          <input
            type='text'
            name='Email'
            value={createJob.Email}
            placeholder='Email'
            onChange={inputHandle}
            className='p-2 border-2'
          />
          <input
            type='text'
            name='JobProfile'
            value={createJob.JobProfile}
            placeholder='JobProfile'
            onChange={inputHandle}
            className='p-2 border-2'
          />
          <input
            type='text'
            name='Location'
            value={createJob.Location}
            placeholder='Location'
            onChange={inputHandle}
            className='p-2 border-2'
          />
          <input
            type='text'
            name='Month'
            value={createJob.Month}
            placeholder='Month'
            onChange={inputHandle}
            className='p-2 border-2'
          />
          <input
            type='text'
            name='Salary'
            value={createJob.Salary}
            placeholder='Salary'
            onChange={inputHandle}
            className='p-2 border-2'
          />
          <input
            type='text'
            name='WorkHour'
            value={createJob.WorkHour}
            placeholder='WorkHour'
            onChange={inputHandle}
            className='p-2 border-2'
          />

          <button className='bg-black text-white p-2'>Create Job</button>
        </form>
      </div>
      <p className='text-red-500 text-center'>{error}</p>
    </div>
  );
};
export default Create;
