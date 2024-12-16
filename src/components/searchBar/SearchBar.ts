import { computed, defineComponent, ref } from "vue";
import SearchResults from "@/components/searchResults/SearchResults.vue";
import { usePlacesStore } from "@/composables";


export default defineComponent({
    name: 'SearchName',
    components: {SearchResults},

    setup() {

        const {searchPlacesByTerm} = usePlacesStore()

        const debouncedTimeout = ref()
        const debouncedValue = ref('')


        return {
            debouncedValue,

            //Esto es para que a la hora de buscar un lugar, no sea asíncrono del todo, es decir, que no filtre las ciudades mientras yo voy escribiendo, si no que en este caso que espere X tiempo para actualizar el SearchBar. Esto se hace para no hacer un montón de peticiones a API.
            searchTerm: computed({
                get(){
                    return debouncedValue.value
                },
                set(val: string){
                    
                    if(debouncedTimeout.value) clearTimeout(debouncedTimeout.value)

                    debouncedTimeout.value = setTimeout(() => {
                        debouncedValue.value = val
                        searchPlacesByTerm(val)
                    }, 500)
                }
            })
        }
    }
})