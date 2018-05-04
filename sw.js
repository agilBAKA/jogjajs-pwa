importScripts('./node_modules/workbox-sw/build/workbox-sw.js')

const staticAssets = [
    './',
    './dist/style.css',
    './app.js',
    'https://fonts.googleapis.com/css?family=Overpass:400,700'
];

const wb = new WorkboxSW();
    wb.precache(staticAssets);