import api from "../lib/axios"

export const getUserProfileInfo = async(username: string) => {
    const response = await api.get(`/auth/get-user-profile-data/${username}`);
    return response.data.data;
}

export const getUserProfilePost = async(username: string) => {
    const response = await api.get(`/post/get-post/${username}`);
    return response.data.data
}

export const followUser = async(username: string) => {
    const response = await api.post(`/auth/follow/${username}`);
    return response.data;
}

export const UnfollowUser = async(username: string) => {
    const response = await api.post(`/auth/unfollow/${username}`);
    return response.data
}

export const updateProfileImage = async(formData: FormData)=>{
    const response = await api.patch(`/auth/update-profile-image`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
    return response.data;
}

export const addBio = async(bio: string) => {
    const response = await api.post('/auth/addBio', {bio})
    return response.data
}

export const updateBio = async(updatedBio: string) => {
    const response =  await api.patch('/auth/updateBio', {updatedBio});
    return response.data;
}
