import api from "../lib/axios"

export const getFeedPost = async() => {
    const response = await api.get('/post/get-all-post')
    return response.data.data;
}