import axios from 'axios';

const URL = "https://pixabay.com/api/";
const KEY = "42236985-928e9185476a196bd3da86393";

export async function fetchPhoto(query, page, perPage) {
    const url = `${URL}?key=${KEY}&q=${query}&page=${page}&per_page=${perPage}&image_type=photo&orientation=horizontal&safesearch=true`;
    const response = await axios.get(url);
    return response.data;          
};