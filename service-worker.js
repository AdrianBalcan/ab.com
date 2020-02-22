'use strict';

const PREFIX = 'adrianbalcan.com';
const HASH = '0a2b8979'; // Computed at build time.
const OFFLINE_CACHE = `${PREFIX}-${HASH}`;

var dataCacheName = 'AdrianBalcan.com';
var cacheName = 'AdrianBalcan.com';
var filesToCache = [
  '/',
  '/index.html',
  '/js/main.js',
  '/js/assets/jquery-3.2.1.min.js',
  '/css/style.css',
  'images/about-me.jpg',
  'images/contact.jpg',
  'images/lamp.jpg',
  'images/logo.svg',
  'images/medium.svg',
  'images/twitter.svg',
  'images/linkedin.svg',
  'images/coffee.jpg',
  'images/main-banner.jpg',
  'images/notebook.jpg',
  'images/logo.png',
  'images/keyboard.jpg',
  'manifest.json',
  'favicon.ico',
  'service-worker.js'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(OFFLINE_CACHE).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(event) {
	// Delete old asset caches.
	event.waitUntil(
		caches.keys().then(function(keys) {
			return Promise.all(
				keys.map(function(key) {
					if (
						key != OFFLINE_CACHE &&
						key.startsWith(`${PREFIX}-`)
					) {
						return caches.delete(key);
					}
				})
			);
		})
	);
});

self.addEventListener('fetch', function(event) {
	if (event.request.mode == 'navigate') {
		console.log('Handling fetch event for', event.request.url);
		console.log(event.request);
		event.respondWith(
			fetch(event.request).catch(function(exception) {
				// The `catch` is only triggered if `fetch()` throws an exception,
				// which most likely happens due to the server being unreachable.
				console.error(
					'Fetch failed; returning offline page instead.',
					exception
				);
				return caches.open(OFFLINE_CACHE).then(function(cache) {
					return cache.match('/');
				});
			})
		);
	} else {
		// It’s not a request for an HTML document, but rather for a CSS or SVG
		// file or whatever…
		event.respondWith(
			caches.match(event.request).then(function(response) {
				return response || fetch(event.request);
			})
		);
	}

});

