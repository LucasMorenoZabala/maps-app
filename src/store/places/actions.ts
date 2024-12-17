import { ActionTree } from 'vuex';
import { PlacesState } from './state';
import { StateInterface } from '../index';
import { searchApi } from '@/api';
import { Feature, Places } from '@/interfaces/places';


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
    async searchPlacesByTerm({commit, state}, query: string): Promise<Feature[]>{
        
        
        //Devolvemos un array vacio, ya que lo que nos va a devolver si o si, va a ser un array, ya sea vacio o con los datos
        if(query.length === 0){
            commit('setPlaces', [])
            return []
        }

        if(!state.userLocation){
            throw new Error('No hay ubicación del usuario')
        }

        commit('setIsLoadingPlaces')

        const resp = await searchApi.get<Places>(`/${query}.json`, {
            params: {
                proximity: state.userLocation?.join(',')
            }
        })

        commit('setPlaces', resp.data.features)

        return resp.data.features

    }
}



export default actions;