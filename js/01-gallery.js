import { galleryItems } from "./gallery-items.js";
// Change code below this line
const gallery = document.querySelector(".gallery");

function createImagesMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
        <li class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img
              class="gallery__image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
            />
          </a>
        </li>
      `;
    })
    .join("");
}

const imagesMarkup = createImagesMarkup(galleryItems);
gallery.innerHTML = imagesMarkup;

gallery.addEventListener("click", onImageClick);

function onImageClick(event) {
  event.preventDefault();
  const target = event.target;

  if (!target.classList.contains("gallery__image")) {
    return;
  }
  const imageSource = target.dataset.source;
  const instance = basicLightbox.create(`
    <img src="${imageSource}" width="800" height="600">
  `);

  instance.show();

  document.addEventListener("keydown", closeModalOnEscape);

  function closeModalOnEscape(event) {
    if (event.key === "Escape") {
      instance.close();
      document.removeEventListener("keydown", closeModalOnEscape);
    }
  }
}
