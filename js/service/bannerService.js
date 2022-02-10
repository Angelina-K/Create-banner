'use strict';
import { storageService } from './storage-service.js';

export const bannerService = {
  getBanners,
  saveBanners,
  removeBanners,
};

const KEY = 'banners-data';

function saveBanners(banners) {
  storageService.save(KEY, banners);
}

function getBanners() {
  return storageService.load(KEY) || [];
}

function removeBanners() {
  storageService.remove(KEY);
  document.location.reload();
}
