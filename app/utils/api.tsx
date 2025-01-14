import axios from 'axios'

const API_URL = 'http://localhost:3000/listing-property'

export const getProperties =async ()=>{
    try {

        const response = await axios.get(API_URL)
        return response.data
    } catch (error) {
        console.error('error fetching properties:', error)
        throw error
    }
}