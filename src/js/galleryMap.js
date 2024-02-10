import { reference } from './reference';

 function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const { gallery } = reference;

export function createGalleryMap(searchPhoto) {
    const arrPhotos = searchPhoto.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>{
        return `<div class="photo-card">
        <div class="img-wrap">
            <a class="photo-link" href="${largeImageURL}">
                <img src="${webformatURL}" alt="${tags}" class="img-space" width="350"  loading="lazy" />
            </a>
        </div>
        <div class="info" >
          <p class="info-item"><b>Like: ${formatNumberWithCommas(likes)}</b></p>
          <p class="info-item"><b>View: ${formatNumberWithCommas(views)}</b></p>
          <p class="info-item"><b>Comment: ${formatNumberWithCommas(comments)}</b></p>
          <p class="info-item"><b>Download: ${formatNumberWithCommas(downloads)}</b></p>
        </div></div>
      </div>`
    });
    gallery.insertAdjacentHTML("beforeend", arrPhotos.join(''));
}





