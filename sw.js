/**
 * Service Worker minimo.
 * No guarda nada en cache (siempre pide todo a internet, para que los datos
 * del checklist y del panel esten siempre actualizados). Solo existe para que
 * el navegador considere la app "instalable" en el celular.
 */
self.addEventListener('install', function (event) {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function (event) {
  const url = new URL(event.request.url);

  // Muy importante: las peticiones hacia OTROS sitios (como Google Apps Script
  // o Google Drive) las deja pasar de largo, sin tocarlas, para no interferir
  // con esas respuestas ni con cuanto tardan en llegar.
  if (url.origin !== self.location.origin) {
    return;
  }

  // Solo para los archivos propios de esta app (mismo origen): los pide a
  // internet tal cual, sin inventar respuestas de reemplazo.
  event.respondWith(fetch(event.request));
});
