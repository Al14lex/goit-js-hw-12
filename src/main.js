
import iziToast from 'izitoast'; 
import 'izitoast/dist/css/iziToast.min.css'; 

import SimpleLightbox from 'simplelightbox'; 
import 'simplelightbox/dist/simple-lightbox.min.css'; 

import { fetchImages } from "./js/pixabay-api";
import {renderImg} from "./js/render-functions"


let currentPage = 1;
let query;
let maxPage = 0;
const perPage = 15;

export const select = {
  form: document.querySelector('.form'),
  loader: document.querySelector('.loader'),
  gallery: document.querySelector('.gallery-img'),
  btnMore: document.querySelector('.btn-load-more'),
}

select.form.addEventListener('submit', submit);
select.btnMore.addEventListener('clicl', clickloadMore);

deleteLoader();
hideLoadMore();

function showLoadMore() {
  select.btnMore.classList.remove('is-hidden');
}
function hideLoadMore() {
  select.btnMore.classList.add('is-hidden');
}
function deleteLoader() {
  select.loader.classList.add('is-hidden');
}
function addLoader() {
  select.loader.classList.remove('is-hidden');
}

async function submit(e) {
  e.preventDefault();
  addLoader();

  query = e.target.elements.request.value.trim();
  select.gallery.innerHTML = '';
  currentPage = 1;

  if (!query) {
    deleteLoader();
    hideLoadMore();
    iziToast.error({
      message: 'Please enter a request',
      position: 'topRight',
    });
    return;
  }

  try {
    const data = await fetchImages(query, currentPage);
    if (data.hits.length === 0) {
       deleteLoader();
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }
    maxPage = Math.ceil(data.totalHits / perPage);
    renderImg(data.hits);
  } catch (error) {
    console.log(error);
  }

  deleteLoader();
  finishItems();
  select.form.reset();
}

async function clickloadMore() {
  currentPage += 1;
  addLoader();
  try {
    const data = await fetchImages(query, currentPage);
    renderImg(data.hits);
  } catch (error) {
    console.log(error);
  }

  scroll();
  finishItems();
  deleteLoader();
}

function finishItems() {
  if (currentPage >= maxPage) {
    hideLoadMore();
    iziToast.error({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
  } else {
    showLoadMore();
  }
}
function scroll() {
  const size = select.gallery.firstChild.getBoundingClientRect().size;

  scrollBy({
    top: size,
    behavior: 'smooth',
  });
}