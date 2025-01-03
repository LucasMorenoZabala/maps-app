import { defineComponent, ref, watch } from 'vue';
import { usePlacesStore, useMapStore } from '@/composables';
import { Feature } from '@/interfaces/places';


export default defineComponent({
  name: 'SearchResults',
  setup() {

    const { isLoadingPlaces, places, userLocation } = usePlacesStore();
    const { map, setPlaceMarkers, getRouteBetweenPoints } = useMapStore();

    const activePlace = ref('');

    //Este watch lo que hace es mirar a ver cuando cambia el array de los lugares, tanto cuando se rellena como cuando esta vacío
    watch(places, (newPlaces) => {
        activePlace.value = ''
        setPlaceMarkers(newPlaces)
    })



    return {
      isLoadingPlaces,
      places,
      activePlace,
      
      onPlaceClicked: ( place: Feature ) => {
        activePlace.value = place.id;

        const [ lng, lat ] = place.center;
      
        map.value?.flyTo({
          center: [ lng, lat ],
          zoom: 14
        });
      },

      getRouteDirections: (place:Feature) => {
        //si no tenemos la ubicación inicial, no hagas nada
        if(!userLocation.value) return

  
        const [ lng, lat ] = place.center;
        const [lngStart, latStart] = userLocation.value

        const start: [number, number] = [lngStart,latStart]
        const end: [number, number] = [lng, lat]

        getRouteBetweenPoints(start, end)
       }

    }
  }
});