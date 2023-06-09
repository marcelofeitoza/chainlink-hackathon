import axios from 'axios';
import { StringLiteralLike } from 'typescript';
//require('dotenv').config();
import Cookies from 'universal-cookie';
 
const cookies = new Cookies();

const API_URL = "http://localhost:3001";


const userService = {
    auth: async (address: string, pass: string) => {

        const auth = await axios.post(`${API_URL}/v1/user/auth`, {
            address: address,
            password: pass
        })

        return auth
    },

    verify: async (address: string) => {
        const verify = await axios.get(`${API_URL}/v1/user/verify/${address}`)

        return verify
    },

    register: async (address: string, pass: string, name: string, email: string, userName: string, userContract: StringLiteralLike) => {
        const register = await axios.post(`${API_URL}/v1/user/register`, {
            address: address,
            password: pass,
            name: name,
            email: email,
            username: userName,
            imgAdress: userContract
        })

        return register
    },

    getUser: async () => {

        const token = cookies.get('token')

        const user = await axios.get(`${API_URL}/v1/user`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )

        return user
    },

    getUserById: async (id: string) => {
        const token = cookies.get('token')

        const user = await axios.get(`${API_URL}/v1/user/getById/${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )

        return user
    },


}

export default userService;