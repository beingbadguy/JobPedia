import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useContext } from 'react';
import { masterContext } from '../Context.jsx/Context';
import { useNavigation } from 'react-router-dom';
const Logout = () => {
  const { isAuth, setuserData, setIsAuth } = useContext(masterContext);
  const navigate = useNavigation();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
      navigate('/');
      localStorage.removeItem('isAuth');
      setIsAuth(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  return (
    <div>
      <button className='' onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};
export default Logout;
