<template>

    <!--Con este v-if, mostramos el contendor de la distancia y duración, en caso de que exista distancia.-->
    <div v-if="distance" class="trip-container column">
        <div class="col">Duración: <strong>{{ distance }} minutos</strong></div>
        <div class="col">Distancia: <strong>{{duration}} kms</strong></div>
    </div>
</template>

<script lang="ts">
import { useMapStore } from '@/composables';
import { defineComponent } from 'vue';

export default defineComponent({

    name: 'tripDetails',
    setup(){

        const {distance, duration} = useMapStore()


        return{
            distance,
            duration
        }
    }

})

</script>


<style scoped>

.trip-container{
    padding: 10px;
    position: fixed;
    bottom: 50px;
    left: 20px;
    border-radius: 10px;
    background-color: white;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
    font-size: 20px;
    width: 350px;
}

strong{
    color: #42b983;
}

</style>