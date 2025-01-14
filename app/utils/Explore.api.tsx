import axios from "axios";

const API_URL = 'http://localhost:3000/explore'


export const getExplore= async(filters: { image: string; location: string; price: string; type: string; description: string; }) =>{
    try {

        // construct the query string from filters
        const queryString =new URLSearchParams(filters).toString();
        const url = `${API_URL}?${queryString}`;

        //make the GET request with filters
        const response =await axios.get(url);
        return response.data;
        
        
    } catch (error) {
        console.error('error fetching properties:', error)
        throw error
    }
}