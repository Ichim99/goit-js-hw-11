
import axios from 'axios';

const URL = "https://pixabay.com/api/";
const KEY = process.env.API_KEY;

export async function fetchPhoto(query, page, perPage) {
    const url = `${URL}?key=${KEY}&q=${query}&page=${page}&per_page=${perPage}&image_type=photo&orientation=horizontal&safesearch=true`;
    const response = await axios.get(url);
    return response.data;          
};