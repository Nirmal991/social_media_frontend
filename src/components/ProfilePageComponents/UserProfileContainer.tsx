import React, { useState } from 'react'
import UserInfo from './UserInfo'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import type { userProfileInfoType } from '../../types/userProfile';
import type { UserPostType } from '../../types/userPost';
import Spinner from '../General/Spinner';
import { UploadIcon } from 'lucide-react';
import UserPosts from './UserPosts';

const UserProfileContainer = () => {
    const { username } = useParams<{username: string}>();
    const loggedInUser = useSelector((state : RootState) => state.auth.user);

    const [userProfileInfo, setUserProfileInfo] =  useState<userProfileInfoType | null>(null);
    const [loading, setLoading] = useState(true);
    const [postLoading, setPostLoading] = useState(true);
    const [userPosts, setUserPosts] = useState<UserPostType[]>([]);

    const refetchProfile = async() => {

    }

    const getUserProfileData = async() => {

    }

    const handleDeletePostFromUI  = async() => {

    };

    if (loading) return <Spinner />;

    if(!userProfileInfo){
        return <div className='text-white p-6'>User not Found</div>
    }


  return (
    <div className='max-w-225 mx-auto w-full flex flex-col'>
        <UserInfo user={userProfileInfo} refetchProfile={refetchProfile}/>
        {loggedInUser?.username === username && (
            <div className='flex justify-end px-8'>
                <Link
                to='/upload-post'
                className='px-4 py-2 rounded-xl text-sm font-semibold transition disabled:opacity-50 cursor-pointer hover:scale-[1.02] bg-[#9929EA] text-white flex justify-center items-center gap-1'
                >
                    <UploadIcon size={18} />
                    Upload
                </Link>
            </div>
        )}
        {postLoading ? (
            <Spinner />
        ) : (
            <UserPosts />
        )}
    </div>
  )
}

export default UserProfileContainer
