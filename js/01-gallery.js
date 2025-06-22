import { galleryItems } from "./gallery-items.js";

const galleryContainer = document.querySelector(".gallery");

const galleryMarkup = galleryItems
  .map(
    ({ preview, original, description }) => `
      <li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>`
  )
  .join("");

galleryContainer.innerHTML = galleryMarkup;

galleryContainer.addEventListener("click", (event) => {
  event.preventDefault();

  const img = event.target;
  if (img.nodeName !== "IMG") return;

  const instance = basicLightbox.create(`
    <img src="${img.dataset.source}" alt="${img.alt}">
  `);

  instance.show();

  const onEsc = (e) => {
    if (e.key === "Escape") {
      instance.close();
      window.removeEventListener("keydown", onEsc);
    }
  };

  window.addEventListener("keydown", onEsc);
});
