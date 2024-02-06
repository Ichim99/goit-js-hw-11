import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchPhoto } from './axios';
import { createGalleryMap } from './galleryMap';
import { int } from './galleryMap';

const { searchForm, gallery, buttonLoadMore } = int;