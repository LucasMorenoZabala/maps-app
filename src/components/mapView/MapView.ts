import { useMapStore, usePlacesStore } from "@/composables";
import mapboxgl from "mapbox-gl";
import { defineComponent, onMounted, ref, watch } from "vue";

export default defineComponent({
    name: 'MapView',
    setup(){

        const mapElement = ref<HTMLDivElement>()
        const { userLocation, isUserLocationReady} = usePlacesStore()
        const {setMap} = useMapStore()
 
        const initMap = async() => {
            if(!mapElement.value) throw new Error('Div Element no existe')
            if(!userLocation.value) throw new Error('user location no existe')

            //Primero va a terminar los procesos síncronos y luego todo lo demas.
            await Promise.resolve()

            const map = new mapboxgl.Map({
                container: mapElement.value,
                style: 'mapbox://styles/mapbox/streets-v12', 
                center: userLocation.value, 
                zoom: 15,
            });

            const myLocationPopUp = new mapboxgl.Popup().setLngLat(userLocation.value).setHTML(`
                    <h4>Aquí estoy</h4>
                    <p>Actualmente en Berlín</p>
                `)

            //Con esta linea de codigo, creamos y mostramos el marcador. Además, añadimos el PopUp
            const myLocationMarker = new mapboxgl.Marker().setLngLat(userLocation.value).setPopup(myLocationPopUp).addTo(map)

            //TODO: establecer el mapa en VUEX
            setMap(map)
        }

        //Aqui lo que hacemos es, si existe algun valor en la variable "isUserLocationReady" (que es un booleano), nos devuelve el mapa.
        onMounted(() => {
            if(isUserLocationReady.value) return initMap()
        })

        //Esto es para esperar a que cargue el mapa, ya que no es instantaneo que se obtenga la geolocalizacion
        watch(isUserLocationReady, (newVal) => {
            if(isUserLocationReady.value)
                initMap()
        })

        return {
            isUserLocationReady,
            mapElement
        }
    }
})