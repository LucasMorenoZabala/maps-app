import { GetterTree } from 'vuex';
import { MapState } from './state';
import { StateInterface } from '../index';


const getters: GetterTree<MapState, StateInterface> = {
    //este getter es para comprobar que el mapa esta listo.
    isMapReady(  state  ) {
        return !!state.map
    }
}



export default getters;