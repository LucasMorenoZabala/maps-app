<template>
    <!--Si la localizacion del user no esta lista, entonces muestra el mapa-->
   <div v-if="!isUserLocationReady" class="loading-map d-flex justify-content-center align-items-center">
        <div class="text-center">
            <h3>Espere por favor...</h3>
            <span>Localizando...</span>
        </div>
   </div>

   <!--En este caso no se usa el v-else, porque si no el componente no se crea, es decir, no existe. Con el v-show, siempre va a existir-->
   <div v-show="isUserLocationReady" class="map-container" ref="mapElement">
    
   </div>
</template>


<script lang="ts" src="./MapView.ts"></script>


<style scoped>

.map-container{
    position: fixed;
    width: 100vw;
    height: 100vh;
}

.loading-map{
    color:white;
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    z-index: 999;
    background-color: rgba(0,0,0,0.8);
}

</style>