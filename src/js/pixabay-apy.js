

export async function fetchImages(searchQuery) {
  const apiKey = '43045926-d10eb038526040017b5fd39ad'; 
  const baseUrl = 'https://pixabay.com/api/';
  const url = `${baseUrl}?key=${apiKey}&q=${encodeURIComponent(searchQuery)}&image_type=photo&orientation=horizontal&safesearch=true`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.hits; 
  } catch (error) {
    console.error('Error fetching data: ', error);
    throw error;
  }
}
