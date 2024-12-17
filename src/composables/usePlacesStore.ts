import { StateInterface } from "@/store/index"
import { computed, onMounted } from "vue"
import { useStore } from "vuex"


export const usePlacesStore = () => {
    
    const store = useStore<StateInterface>()
    

    //Esto se hace la primera vez que se ejecuta la aplicacion, es decir, una vez obtenga la LAT y la LNG, cuando vuelva a usar el "usePlacesStore()".
    onMounted(() => {
        if(!store.getters['places/isUserLocationReady']){
            //Es un método de Vuex que permite ejecutar una acción (action) en el store. Las acciones son funciones que modifican el estado del store de manera asíncrona o síncrona.
            store.dispatch('places/getInitialLocation')
        }
    })

    return {
        //State
        isLoading: computed(() => store.state.places.isLoading),
        userLocation: computed(() => store.state.places.userLocation),
        places: computed(() => store.state.places.places),
        isLoadingPlaces: computed(() => store.state.places.isLoadingPlaces),
        
        //Getters
        isUserLocationReady: computed<boolean>(() => store.getters['places/isUserLocationReady']),


        //Actions
        searchPlacesByTerm: (query: string ) => store.dispatch('places/searchPlacesByTerm', query),

        //Mutations
    }
}