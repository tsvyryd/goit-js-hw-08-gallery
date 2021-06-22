const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const galleryContainer = document.querySelector('.js-gallery');
const galleryMarkup = createGallery(galleryItems);
galleryContainer.insertAdjacentHTML('afterbegin', galleryMarkup);
galleryContainer.addEventListener('click', onGalleryContainerClick);

function createGallery(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }, idx) => {
      return `
<li class="gallery__item">
<a
  class="gallery__link"
  href="#"
>
  <img
    class="gallery__image"
    src="${preview}"
    data-source="${original}"
    alt="${description}"
    data-index="${idx}"
  />
</a>
</li>`;
    })
    .join('');
}

const originalImg = document.querySelector('img.lightbox__image');
const modal = document.querySelector('div.lightbox');

function onOpenModal() {
  window.addEventListener('keydown', onKeyPress);
  modal.classList.add('is-open');
}

function onGalleryContainerClick(evt) {
  if (!evt.target.classList.contains('gallery__image')) {
    return;
  }
  onOpenModal();
  lightBoxImgContent(evt.target.dataset.source, evt.target.alt, evt.target.dataset.index);
}

const closeModalBtn = document.querySelector('[data-action="close-lightbox"]');
closeModalBtn.addEventListener('click', onCloseModal);
const backdrop = document.querySelector('.lightbox__overlay');
backdrop.addEventListener('click', onBackdropClick);

function onCloseModal() {
  window.removeEventListener('keydown', onKeyPress);
  modal.classList.remove('is-open');  
  originalImg.setAttribute('src', '');
}

function onBackdropClick(evt){
  if(evt.currentTarget === evt.target){
    onCloseModal();
  }
}

function onKeyPress(evt) {
  if (evt.code === 'Escape') {
    onCloseModal();
  }
  if (evt.code === 'ArrowRight') {
    onArrowRight();
  }
  if (evt.code === 'ArrowLeft') {
    onArrowLeft();
  }
}

function lightBoxImgContent(src, alt, idx) {
  originalImg.setAttribute('src', src);
  originalImg.setAttribute('alt', alt);
  originalImg.setAttribute('idx', idx);
}

function onArrowRight() {
  let currentIndex = Number(originalImg.getAttribute('idx'));

  if (currentIndex + 1 > galleryItems.length - 1) {
    currentIndex = 0;
  } else {
    currentIndex += 1;
  }
  lightBoxImgContent(
    galleryItems[currentIndex].original,
    galleryItems[currentIndex].description,
    currentIndex
  );
}

function onArrowLeft() {
  let currentIndex = Number(originalImg.getAttribute('idx'));
  if (currentIndex - 1 < 0) {
    currentIndex = galleryItems.length - 1;
  } else {
    currentIndex -= 1;
  }
  lightBoxImgContent(
    galleryItems[currentIndex].original,
    galleryItems[currentIndex].description,
    currentIndex
  );
}
