import { doc, getDoc } from 'firebase/firestore';
import React, { createContext, useEffect, useState } from 'react';
import { auth, db } from '../config/firebase';
import { getDocs } from 'firebase/firestore';
import { collection } from 'firebase/firestore';

export const masterContext = createContext(null);

const MasterProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));
  const [userData, setuserData] = useState();
  const [userId, setuserId] = useState();
  const [job, setJob] = useState();

  const jobs = collection(db, 'jobs');

  const fetchJobs = async () => {
    try {
      const newJobs = await getDocs(jobs);
      const filtereddata = newJobs.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setJob(filtereddata);
    } catch (err) {
      console.log(err.message);
    }
  };

  // console.log(userData);
  useEffect(() => {
    if (isAuth) {
      console.log('User is authenticated');
      fetchJobs();
    } else {
      console.log('User is not authenticated');
    }
  }, [isAuth]);

  const syncInfo = async (userId) => {
    try {
      const userDocRef = doc(db, 'userInfo', userId);
      const snapshot = await getDoc(userDocRef);

      if (snapshot.exists()) {
        const data = snapshot.data();
        setuserData(data);
        // console.log(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <masterContext.Provider
      value={{
        setIsAuth,
        isAuth,
        userData,
        setuserData,
        fetchJobs,
        syncInfo,
        setuserId,
        userId,
        job,
      }}
    >
      {children}
    </masterContext.Provider>
  );
};

export default MasterProvider;
