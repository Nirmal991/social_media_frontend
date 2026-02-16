import React from 'react'
import Navbar from '../components/General/Navbar'
import Sidebar from '../components/General/Sidebar'
import UserProfileContainer from '../components/ProfilePageComponents/UserProfileContainer'

function ProfilePage() {
  return (
    <div className='h-screen overflow-hidden bg-black'>
      <Navbar />

      <div className='flex h-[calc(100vh-10vh)] overflow-hidden'>
        <Sidebar />

        <div className='flex-1 overflow-y-auto'>
          <UserProfileContainer />
        </div>
        {/* Chatbar */}
      </div>
    </div>
  )
}

export default ProfilePage
