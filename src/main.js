import iziToast from 'izitoast'; 
import 'izitoast/dist/css/iziToast.min.css'; 

import { fetchImages } from "./js/pixabay-api";
import {renderImg} from "./js/render-functions"

let page = 1;
let query;
let maxPage = 0;
const perPage = 15;

export const select = {
  form: document.querySelector('.form'),
  input: document.getElementById('query'),
  loader: document.querySelector('.loader'),
  gallery: document.querySelector('.gallery-img'),
  btnMore: document.querySelector('.btn-load-more'),
}

select.form.addEventListener('submit', submitBtn);
select.btnMore.addEventListener('click', clickloadMore);

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

deleteLoader();
hideLoadMore();

async function submitBtn(event) {
  event.preventDefault();
  addLoader();

  query = select.input.value.trim();
  page = 1;
  select.gallery.innerHTML = ''

  if (!query) {
    iziToast.error({
      message: 'Please enter a request',
      position: 'topRight',
    });

    hideLoadMore();
    scroll();
    return;
  }

  try {
    const data = await fetchImages(query, page);
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
  page += 1;
  addLoader();

  try {
    const data = await fetchImages(query, page);
    renderImg(data.hits);
  } catch (error) {
    console.log(error);
  }

  scroll();
  finishItems();
  deleteLoader();
}

function finishItems() {
  if (page >= maxPage) {
    hideLoadMore();
    iziToast.error({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
      color: 'yellow'
    });
  } else {
    showLoadMore();
  }
}

function scroll() {
  const cardHeight = select.gallery.firstChild.getBoundingClientRect().height;
  const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  
  window.scroll({
    top: currentScrollPosition + cardHeight * 2,
    behavior: 'smooth',
  });
}
