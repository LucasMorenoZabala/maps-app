import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import mapboxgl from 'mapbox-gl'; 
mapboxgl.accessToken = 'pk.eyJ1IjoibHVrYXNtejAzIiwiYSI6ImNtNHF4OHIxejE1YmYyaXM1ZGkxdmRmNjYifQ.hqLlgzM7tO36eZNZ_KJlDw';

if(!navigator.geolocation){
    alert('Tu navegador no soporta el GeoLocation')
    throw new Error('Tu navegador no soporta el GeoLocation')
}

createApp(App).use(store).use(router).mount('#app')
