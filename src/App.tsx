import { Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import FeedPage from './pages/FeedPage'
import { ToastContainer } from "react-toastify";
import { useDispatch } from 'react-redux'
import { getCurrentUser } from './api/auth.api'
import { setAuthLoad, setUser } from './store/slice/authSLice'
import { useEffect } from 'react'
import ProfilePage from './pages/ProfilePage';

function App() {
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
  }, [])


  return (
    <div className='min-h-screen bg-[#000000]  w-full overflow-x-hidden'>
      <Routes>
        <Route path='/' element={<FeedPage />} />
        <Route path='/profile/:username' element={<ProfilePage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
