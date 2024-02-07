import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchPhoto } from './axios';
import { createGalleryMap } from './galleryMap';
import { int } from './galleryMap';


const { searchForm, gallery, buttonLoadMore } = int;

const paramsNotify = {
    position: 'center-center',
    timeout: 4000000,
    width: '400px',
    fontSize: '28px'
};

let lightbox = new SimpleLightbox('.img-wrap a', { 
    captionsData: 'alt',
    captionDelay: 250,
});

const perPage = 40;
let page = 1;
let keyOfSearchPhoto = '';

buttonLoadMore.classList.add('is-hidden');

searchForm.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
    event.preventDefault();

    gallery.innerHTML = '';
    page = 1;
    const { searchQuery } = event.currentTarget.elements;
    keyOfSearchPhoto = searchQuery.value
        .trim()
        .toLowerCase()
        .split(' ')
        .join('+');
    

    if (keyOfSearchPhoto === '') {
        Notify.info('Enter your request, please!', paramsNotify);
        return;
    }

    fetchPhoto(keyOfSearchPhoto, page, perPage)
        .then(data => {
            const searchPhoto = data.hits;
            if (data.totalHits === 0) {
                Notify.failure('Sorry, there are no images matching your search query. Please try again.', paramsNotify);
            } else {
                Notify.info(`Hooray! We found ${data.totalHits} images.`, paramsNotify);
                
                createGalleryMap(searchPhoto);
                lightbox.refresh();

            };
            if (data.totalHits > perPage) {
                buttonLoadMore.classList.remove('is-hidden');
                window.addEventListener('scroll', showLoadMorePage);
            };
            
        })
        .catch(onFetchError);

    buttonLoadMore.addEventListener('click', onClickLoadMore);

    event.currentTarget.reset();
};

function onClickLoadMore() {
    page += 1;
    fetchPhoto(keyOfSearchPhoto, page, perPage)
        .then(data => {
            const searchPhoto = data.hits;
            const numberOfPage = Math.ceil(data.totalHits / perPage);
            
            createGalleryMap(searchPhoto);
            if (page === numberOfPage) {
                buttonLoadMore.classList.add('is-hidden');
                Notify.info("We're sorry, but you've reached the end of search results.", paramsNotify);
                buttonLoadMore.removeEventListener('click', onClickLoadMore);
                window.removeEventListener('scroll', showLoadMorePage);
            };
            lightbox.refresh();

        })
        .catch(onFetchError);
};

function onFetchError() {
    Notify.failure('Oops! Something went wrong! Try reloading the page or make another choice!', paramsNotify);
};

function showLoadMorePage() {
    if (checkIfEndOfPage()) {
        onClickLoadMore();
    };
};

function checkIfEndOfPage() {
  return (
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight
  );
}