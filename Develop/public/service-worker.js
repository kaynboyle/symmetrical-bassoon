const APP_PREFIX = 'BudgetPlanner-';     
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;

const FILES_TO_CACHE = [
    // "./Develop/public/index.html",
    // "./Develop/public/css/styles.css",
 // do i need to load icons in here?
    "./public/icons/icon-152x152.png"
   
  ];

self.addEventListener('install', function (e){
    e.waitUntil(
        caches.open(CACHE_NAME).then(function (cache){
            console.log('installing cache : ' + CACHE_NAME)
            return cache.addAll(FILES_TO_CACHE)
        })
    )
})

///why wont this work 
// hints at 19.4.7