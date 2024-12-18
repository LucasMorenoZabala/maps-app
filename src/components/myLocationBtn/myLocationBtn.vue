<template>
    <button v-if="isBtnReady" @click="onMyLocationClick" class="btn btn-primary location-btn">Ir a mi ubicación</button>
</template>

<script lang="ts">
import { useMapStore, usePlacesStore } from '@/composables';
import { computed, defineComponent } from 'vue';

export default defineComponent({
    name: 'myLocationBtn',
    setup() {
        const { userLocation, isUserLocationReady } = usePlacesStore();
        const { map, isMapReady } = useMapStore();

        return {
            isBtnReady: computed<boolean>(() => isUserLocationReady.value && isMapReady.value),
            onMyLocationClick: () => {
                map.value?.flyTo({
                    center: userLocation.value!,
                    zoom: 14
                });
            }
        };
    }
});
</script>

<style scoped>
.location-btn {
    position: fixed;
    top: 30px;
    right: 30px;
    padding: 10px 15px;
    font-size: 16px;
    border-radius: 5px;
    z-index: 1000;
}


@media (max-width: 768px) {
    .location-btn {
        top: 20px; 
        right: 20px; 
        font-size: 14px; 
        padding: 8px 12px; 
    }
}


@media (max-width: 480px) {
    .location-btn {
        top: 15px; 
        right: 15px; 
        font-size: 12px; 
        padding: 6px 10px; 
    }
}
</style>
