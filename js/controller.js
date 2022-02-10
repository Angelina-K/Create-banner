'use strict';
import { bannerService } from './service/bannerService.js';

window.onInit = onInit;
window.onRedirect = onRedirect;
window.createNewBanner = createNewBanner;
window.onSaveBanners = onSaveBanners;
window.toggleModal = toggleModal;
window.onClear = onClear;

function onInit() {
  const banners = bannerService.getBanners();

  banners.forEach((banner) => {
    const { bannerImg, redirectLink } = banner;
    createNewBanner(bannerImg, redirectLink);
  });
}

function createNewBanner(bannerImg, redirectLink, elementId = 'banners-list') {
  let el = document.getElementById(elementId);
  el.innerHTML += `<img onclick="onRedirect('${redirectLink}')" data-link=${redirectLink} class="banner-img" src="${bannerImg}" alt="banner">`;

  let elBtns = document.querySelectorAll('.action-btn');
  elBtns.forEach((elBtn) => (elBtn.hidden = false));
}

function onRedirect(url) {
  window.open(url, '_blank');
}

function onSaveBanners() {
  const existingBanners = bannerService.getBanners();
  const elImages = document.querySelectorAll('.banner-img');

  if (elImages.length > existingBanners.length) {
    const banners = [...elImages].map((elImg) => {
      return {
        bannerImg: elImg.getAttribute('src'),
        redirectLink: elImg.getAttribute('data-link'),
      };
    });
    bannerService.saveBanners(banners);
    toggleModal('Saving banners');
  } else {
    toggleModal('No new banners');
  }
}
function onClear() {
  bannerService.removeBanners();
}

function toggleModal(msg) {
  let elModal = document.querySelector('.modal');
  elModal.innerHTML = `<h3>${msg}</h3>
  <button onclick="toggleModal()">OK</button>`;

  elModal.hidden = !elModal.hidden;
  if (!elModal.hidden)
    setTimeout(() => {
      elModal.hidden = true;
    }, 1500);
}
