import { Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import FeedPage from './pages/FeedPage'
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser } from './api/auth.api'
import { setAuthLoad, setUser } from './store/slice/authSLice'
import { useEffect } from 'react'
import ProfilePage from './pages/ProfilePage';
import type { RootState } from './store/store';

function App() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await getCurrentUser(); // see the issue
        dispatch(setUser(response.data));
      } catch (error) {
        console.log("ERROR: ", error);

      } finally {
        dispatch(setAuthLoad());
      }
    }

    loadUser()
  }, [dispatch])


  return (
    <div className='min-h-screen bg-[#000000] w-full overflow-x-hidden'>
      <Routes>
        <Route path='/profile/:username' element={<ProfilePage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/' element={<FeedPage />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
