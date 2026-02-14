import api from "../lib/axios"


export const createPost = async(formData: FormData) => {
    const response = await api.post('/post/create-post', formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
    return response.data.data;
}

export const deletePost = async( postId: string) => {
    const response = await api.delete(`/post/delete-post/${postId}`)
    return response.data;
}

export const getUserPostById = async(postId: string) => {
    const response = await api.get(`/post/${postId}`)
    return response.data.data;
}

export const updatePostContent = async(postId: string, content: string) => {
    const response = await api.patch(`/post/update-post/${postId}`, {
        content,
    })
    return response.data.data;
}