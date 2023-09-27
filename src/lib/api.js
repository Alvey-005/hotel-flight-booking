// lib/api.js
import axios from 'axios';

const instance = axios.create({
  baseURL: '/', // This assumes you will proxy requests to /api using Next.js API routes
});

export const fetchData = async () => {
  try {
    const response = await instance.get('data/hoteldata.js'); // Change the path to match your local JSON file
    return response.data;
  } catch (error) {
    throw error;
  }
};
