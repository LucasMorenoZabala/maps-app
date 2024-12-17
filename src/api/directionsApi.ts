import axios from "axios";

const directionsApi = axios.create({
    baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
    params: {
        alternatives: false,
        geometries: 'geojson',
        overview: 'simplified',
        steps: false,
        access_token: 'pk.eyJ1IjoibHVrYXNtejAzIiwiYSI6ImNtNHF4OHIxejE1YmYyaXM1ZGkxdmRmNjYifQ.hqLlgzM7tO36eZNZ_KJlDw'
    }
})

export default directionsApi