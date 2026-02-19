import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/General/Navbar';
import Sidebar from '../components/General/Sidebar';
import EditPostContainer from '../components/EditPostPageComponents/EditPostContainer';
import { toast } from 'react-toastify';
import { getUserPostById } from '../api/post.api';
import ChatBar from '../components/General/ChatBar';

const EditPostPage = () => {

    const [content, setContent] = useState<string | null>(null)
    const { postId } = useParams();

    useEffect(() => {
      if(!postId){
        toast.error('Post id not found');
        return;
      }
      const getPostData = async() => {
        const response = await getUserPostById(postId);
        console.log('POST RES: ', response);
        setContent(response.content);
      };

      getPostData();
    }, [postId])

  return (
    <div className='h-screen overflow-hidden bg-black'>
      <Navbar />

      <div className='flex h-[calc(100vh-10vh)] overflow-hidden'>
        <Sidebar />

        <div className='flex-1 overflow-y-auto'>
            <EditPostContainer content={content}/>
        </div>
        <ChatBar />
      </div>
    </div>
  )
}

export default EditPostPage
