const CACHE_NAME = 'darassa-academy-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// Liste des ressources à mettre en cache
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/src/main.tsx',
  '/src/App.tsx',
  '/src/index.css',
  '/src/pages/Home.tsx',
  '/src/components/layout/Layout.tsx',
  '/src/components/layout/Header.tsx',
  '/src/components/layout/Footer.tsx',
  '/src/components/home/Hero.tsx',
  '/src/components/home/Stats.tsx',
  '/src/components/home/Features.tsx',
  '/src/components/home/Courses.tsx',
  '/src/components/home/Testimonials.tsx',
  '/src/components/home/Partners.tsx',
  '/src/components/home/MLMProgram.tsx',
  '/src/components/home/Blog.tsx',
  '/src/components/home/FAQ.tsx',
  '/src/components/home/FAQItem.tsx',
  '/src/components/shared/Section.tsx',
  '/src/components/shared/Card.tsx',
  '/src/components/shared/OptimizedImage.tsx',
  '/src/hooks/useFAQ.ts',
  '/src/data/faqData.ts',
  '/src/types/faq.ts'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('Mise en cache des ressources statiques');
        return cache.addAll(STATIC_ASSETS);
      }),
      caches.open(DYNAMIC_CACHE)
    ])
  );
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('Suppression de l\'ancien cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interception des requêtes
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Si la ressource est en cache, on la retourne
      if (response) {
        return response;
      }

      // Sinon, on fait la requête réseau
      return fetch(event.request).then((response) => {
        // On ne met en cache que les requêtes réussies
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // On clone la réponse car elle ne peut être utilisée qu'une fois
        const responseToCache = response.clone();

        // On met en cache la réponse
        caches.open(DYNAMIC_CACHE).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      }).catch(() => {
        // En cas d'erreur réseau, on retourne une page d'erreur
        if (event.request.mode === 'navigate') {
          return caches.match('/offline.html');
        }
      });
    })
  );
}); 