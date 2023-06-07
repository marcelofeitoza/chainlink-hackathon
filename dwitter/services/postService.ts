import axios from 'axios';
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
    }


}

export default postService;