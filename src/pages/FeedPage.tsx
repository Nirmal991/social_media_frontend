import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import type { FeedPostType } from '../types/feed'
import Spinner from '../components/General/Spinner'
import Navbar from '../components/General/Navbar'
import Sidebar from '../components/General/Sidebar'
import { getFeedPost } from '../api/feed.api'
import { toast } from 'react-toastify'
import FeedPost from '../components/FeedPageComponent/FeedPost'
import ChatBar from '../components/General/ChatBar'

const FeedPage = () => {
    const { loading } = useSelector((state: RootState) => state.auth)
    const [serverError, setServerError] = useState<string | null>(null);
    const [loadingPost, setLoadingPost] = useState(true);
    const [feedPost, setFeedPost] = useState<FeedPostType[]>([]);

    useEffect(() => {
        const getPost = async () => {
            try {
                const post = await getFeedPost();
                setFeedPost(post);
                console.log({ feedPost });
            } catch (error: any) {
                setServerError(error.message);
                toast.error(error.message);
            } finally {
                setLoadingPost(false);
            }
        }

        getPost();
    }, [])

    if (loading) {
        return <Spinner />
    }

    return (
        <div className='h-screen overflow-hidden flex flex-col'>
            <Navbar />
            <div className='flex flex-1 overflow-hidden'>
                <Sidebar />
                <div className='flex-1 overflow-y-auto px-4'>
                    {loadingPost ? (
                        <Spinner />
                    ) : feedPost.length === 0 ? (
                        <p className='text-white'>No post Found</p>
                    ) : (
                        feedPost.map((feedPost) => (
                            <FeedPost key={feedPost._id} post={feedPost}/>
                        ))
                    )
                    }
                </div>
                <ChatBar />

            </div>
        </div>
    )
}

export default FeedPage
