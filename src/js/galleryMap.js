const int = {
    searchForm : document.querySelector('.search-form'),
    gallery : document.querySelector('.gallery'),
    buttonLoadMore : document.querySelector('.load-more'),
}



const { gallery } = int;

export function createGalleryMap(searchPhoto) {
    const arrPhotos = searchPhoto(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>{
        return `<div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item"><b>Likes: ${likes}</b></p>
          <p class="info-item"><b>Views: ${views}</b></p>
          <p class="info-item"><b>Comments: ${comments}</b></p>
          <p class="info-item"><b>Downloads: ${downloads}</b></p>
        </div>
      </div>`
    });
    gallery.insertAdjacentHTML("beforeend", arrPhotos.join(''));
}

export {int};