
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// main.js
import { fetchImages } from './js/pixabay-apy';
import { renderGallery } from './js/render-functions';

document.getElementById('form').addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const query = document.getElementById('query').value.trim();
  
  if (!query) {
    alert('Please enter a search term');
    return;
  }
  
  document.getElementById('loader').style.display = 'block';

  try {
    const images = await fetchImages(query);
    renderGallery(images);
  } catch (error) {
    console.error('Failed to fetch images:', error);
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.',
    });
  } finally {
        document.getElementById('loader').style.display = 'none';
  }
});
