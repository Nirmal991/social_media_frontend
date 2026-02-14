import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store/store'
import type { Conversation} from '../../types/chat'
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';

const ChatBar = () => {
    const loggedInUser = useSelector((state: RootState)=>state.auth.user);
    const [conversations, setConversations] = useState<Conversation[]>([])
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

  return (
    <div className='w-[300px] shrink-0 h-full border-l border-white/10 text-white flex flex-col'>
      <h2 className='px-4 pb-3 text-lg font-semibold border-b border-white/10 my-4'> Chats</h2>

      {loading ? (
        <div className='flex-1 flex items-center justify-center'>
            <Spinner />
        </div>
      ) : conversations.length === 0 ? (
        <p className='text-sm text-white/60 text-center mt-6'>  No conversations yet</p>
      ) : (
        <div className='flex-1 overflow-y-auto'>
           
        </div>
      )

      }
    </div>
  )
}

export default ChatBar
