import { galleryItems } from './gallery-items.js';

const galleryContainer = document.querySelector('.gallery');

const galleryMarkup = makeGalleryMarkup(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);
galleryContainer.addEventListener('click', openInstanceModal);

function makeGalleryMarkup(pictures) { //розмітка карточок
  return pictures
      .map(({ preview, original, description }) => { //дестурктуризація
        //шаблонні строки
      return `<div class="gallery__item"> 
  <a class="gallery__link" href="${original}"> 
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}" 
      alt="${description}"
    />
  </a>
</div>`;
    })
    .join('');
     
}

const gallery = basicLightbox.create(
  `<img src="" />`,
  {
    onShow: () => {
      console.log('add listener ');
      document.addEventListener('keydown', escBtnHandler);
    },
    onClose: () => {
      console.log('remove listener ');
      document.removeEventListener('keydown', escBtnHandler);
    },
  }
);

function escBtnHandler(e) {
  if (e.code === 'Escape') {
    gallery.close();
  }
}

function openInstanceModal(e) {
  e.preventDefault();
  gallery.element().querySelector('img').src = e.target.dataset.source;
  gallery.show();
}