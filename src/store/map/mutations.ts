import { MutationTree } from 'vuex';
import state, { MapState } from './state';
import { Feature } from '@/interfaces/places';
import mapboxgl from 'mapbox-gl';


const mutation: MutationTree<MapState> = {
    setMap(  state, map: mapboxgl.Map ) {
       state.map = map
    },

    setDistanceDuration(state, {distance, duration}: {distance: number, duration: number}){

        //Convertimos la distancia de M a KM
        let kms = distance / 1000
            kms = Math.round(kms * 100)
            kms /= 100


        state.distance = kms
        state.duration = Math.floor(duration / 60)
    },


    //Con esta mutation, lo que hacemos es recorrer nuestros markers y borrarlos de nuestro state.
    setPlaceMarkers(state, places: Feature[]){
        state.markers.forEach(marker => marker.remove())
        state.markers = []

          //si el mapa no existe, que no haga nada
          if(!state.map) return

        //Crear nuevos markers
        for (const place of places) {
            const [lng, lat] = place.center

            const popup = new mapboxgl.Popup().setLngLat([lng, lat]).setHTML(`
                <h4>${place.text}</h4>
                <p>${place.place_name}</p>
            `)

            //Con esta linea de codigo, creamos y mostramos el marcador. Además, añadimos el PopUp
            const marker = new mapboxgl.Marker().setLngLat([lng, lat]).setPopup(popup).addTo(state.map!)

            //con esto añadimos los markers al array
            state.markers.push(marker) 
        }

         //Aquí vamos a borrar la polyline, porque no queremos que cuando el usuario borre el nombre en el input, que se quede la línea trazada.
         if(state.map.getLayer('RouteString')){
            state.map.removeLayer('RouteString')
            state.map.removeSource('RouteString')
            state.distance = undefined
            state.duration = undefined
        }
    },

    //Esta mutation, lo que va a hacer es coger el punto inicial y el final y trazar la línea (ruta).
    setRoutePolyline(state, coords: number[][]){
        //Punto inicial
        const start = coords[0]
        //Punto final
        const end = coords[coords.length - 1]

        //Definir los bounds. Bounds son los puntos que quiero que sean contenidos en el mapa.
        const bounds = new mapboxgl.LngLatBounds(
            [start[0], start [1]],
            [start[0], start [1]]
        )

        //Aquí agregamos cada punto a nuestros bounds.
        for (const coord of coords) {
            const newCoord: [number, number] = [coord[0], coord[1]]
            bounds.extend(newCoord)
        }

        state.map?.fitBounds(bounds, {
            padding: 150
        })

        //Aquí obtenemos la polyline
        const sourceData: mapboxgl.AnySourceData = {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: coords
                        }

                    }
                ]
            }
        }  

        //Esto comprueba que no existen dos ID iguales, ya que, da un error si primero trazas una ruta y luego quieres otra. Primero hay que eliminar que haya un ID y un SOURCE igual, y ya te dejará hacer las peticiones.
        if(state.map?.getLayer('RouteString')){
            state.map.removeLayer('RouteString')
            state.map.removeSource('RouteString')
        }

        state.map?.addSource('RouteString', sourceData)

       state.map?.addLayer({
        id: 'RouteString',
        type: 'line',
        source: 'RouteString',
        layout: {
            'line-cap': 'round',
            'line-join': 'round'
        },
        paint: {
            'line-color': 'black',
            'line-width': 3
        }
       })
    },
}


export default mutation;