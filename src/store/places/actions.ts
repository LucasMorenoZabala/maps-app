import { ActionTree } from 'vuex';
import { PlacesState } from './state';
import { StateInterface } from '../index';
import { searchApi } from '@/api';
import { Places } from '@/interfaces/places';


const actions: ActionTree<PlacesState, StateInterface> = {
    getInitialLocation( { commit } ) {
        //TODO: colocar loading
        //este Action, lo que hace es coger la posicion (latitud y longuitud) actual de la persona. Le pasamos las coordenadas
        navigator.geolocation.getCurrentPosition(
            ({coords}) => commit('setLngLat', {lng : coords.longitude, lat: coords.latitude}),
            (err) => {
                console.log(err)
                throw new Error('No geolocation :( ')
            }
        )
    },
    //TODO: colocar el valor de retorno
    async searchPlacesByTerm({commit, state}, query: string){
        
        const resp = await searchApi.get<Places>(`/${query}.json`, {
            params: {
                proximity: state.userLocation?.join(',')
            }
        })

        console.log(resp.data.features)

    }
}



export default actions;