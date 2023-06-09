import axios from 'axios';
import { getAccountPath } from 'ethers';
//require('dotenv').config();
import Cookies from 'universal-cookie';
 
const cookies = new Cookies();

const API_URL = "http://localhost:3001";


const postService = {
    create: async (description: string) => {
        const token = cookies.get('token')

        const create = await axios.post(`${API_URL}/v1/post/create`, {
            description: description
        }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        return create
    },

    getAll: async () => {
        const token = cookies.get('token')

        const data = await axios.get(`${API_URL}/v1/post/getAll`,{
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        return data.data
    },
    
    getPost: async (postID: string) => {
        const token = cookies.get('token')

        const data = await axios.get(`${API_URL}/v1/post/getById/${postID}`,{
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        return data
    },

    likePost: async (postID: string) => {
        const token = cookies.get('token')

        const data = await axios.get(`${API_URL}/v1/post/like/${postID}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        return data
    },

    dislikePost: async (postID: string) => {
        const token = cookies.get('token')

        const data = await axios.get(`${API_URL}/v1/post/dislike/${postID}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        return data
    },
}

export default postService;