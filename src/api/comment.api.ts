import api from "../lib/axios"

export const getCommentByPostId = async(postId: string) => {
    const response = await api.get(`/comment/get-comment-post/${postId}`)
    return response.data.data;
}

export const createComment = async(postId: string, comment: string) => {
    const response = await api.post(`/comment/create-comment/${postId}`, {
        comment,
    })
     return response.data.data;
}

export const deleteComment = async(postId: string, commentId: string) => {
    const response = await api.delete(`/comment/delete-comment/post/${postId}/comment/${commentId}`,);
    return response.data;
}