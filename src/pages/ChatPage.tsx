
import Navbar from '../components/General/Navbar'
import Sidebar from '../components/General/Sidebar'
import ChatContainer from '../components/ChatPageComponents/ChatContainer'
import ChatBar from '../components/General/ChatBar'

const ChatPage = () => {
  return (
    <div className='h-screen overflow-hidden bg-black'>
      <Navbar />
      <div className='flex h-[calc(100vh-10vh)] overflow-hidden'>

        <Sidebar />
        <div className='flex-1 overflow-y-auto'>
          <ChatContainer />
        </div>
        <ChatBar />
      </div>
    </div>
  )
}

export default ChatPage
