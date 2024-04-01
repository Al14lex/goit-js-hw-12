import axios from "axios";

export async function fetchImages(query, page) {
  const url = 'https://pixabay.com/api/';
  
  const params = {
    key: '43045926-d10eb038526040017b5fd39ad',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page: page,
  };

  const response = await axios.get(url, { params });
  return response.data;
  
}
