import React from 'react'
import Navbar from '../components/General/Navbar'
import Sidebar from '../components/General/Sidebar'
import UploadPostContainer from '../components/UploadPostPageComponents/UploadPostContainer'
import ChatBar from '../components/General/ChatBar'

const UploadPostPage = () => {
  return (
    <div className='h-screen overflow-hidden bg-black'>
      <Navbar />
      <div className='flex h-[calc(100vh-10vh)] overflow-hidden'>
        <Sidebar />

        <div className='flex-1 overflow-y-auto'>
            <UploadPostContainer />
        </div>
        <ChatBar />
      </div>
    </div>
  )
}

export default UploadPostPage
