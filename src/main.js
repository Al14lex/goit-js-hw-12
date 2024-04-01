import iziToast from 'izitoast'; 
import 'izitoast/dist/css/iziToast.min.css'; 

import { fetchImages } from "./js/pixabay-api";
import {renderImg} from "./js/render-functions"

const perPage = 15;
let page = 1, query, maxPage = 0;

export const select = {
  form: document.querySelector('.form'),
  input: document.getElementById('query'),
  loader: document.querySelector('.loader'),
  gallery: document.querySelector('.gallery-img'),
  btnMore: document.querySelector('.btn-load-more'),
}

select.form.addEventListener('submit', submitBtn);
select.btnMore.addEventListener('click', clickloadMore);

const toggleLoader = (show) => select.loader.classList[show ? 'remove' : 'add']('is-hidden');
const toggleLoadMore = (show) => select.btnMore.classList[show ? 'remove' : 'add']('is-hidden');

toggleLoader(false);
toggleLoadMore(false);

async function submitBtn(event) {
  event.preventDefault();
  toggleLoader(true);
  query = select.input.value.trim();
  page = 1;
  select.gallery.innerHTML = ''
  if (!query) {
    iziToast.error({
      message: 'Please enter a request',
      position: 'topRight',
    });
    toggleLoadMore(false);
    scroll();
    return;
  } try {
    const data = await fetchImages(query, page);
    if (data.hits.length === 0) {
      toggleLoadMore(false);
      toggleLoader(false);
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }
    maxPage = Math.ceil(data.totalHits / perPage);
    renderImg(data.hits);
  } catch (error) {console.error(error);}
  toggleLoader(false);
  finishItems();
  select.form.reset();
}

async function clickloadMore() {
  page += 1;
  toggleLoader(true);
  try {
    const data = await fetchImages(query, page);
    renderImg(data.hits);
  } catch (error) {console.error(error);}
  scroll();
  finishItems();
  toggleLoader(false);
}

function finishItems() {
  if (page >= maxPage) {
    toggleLoadMore(false);
    iziToast.error({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
      color: 'yellow'
    });
  } else {toggleLoadMore(true);}
}

function scroll() {
  const cardHeight = select.gallery.firstChild.getBoundingClientRect().height;
  const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  window.scroll({
    top: currentScrollPosition + cardHeight * 2,
    behavior: 'smooth',
  });
}
