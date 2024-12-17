import axios from "axios";

const searchApi = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params: {
        limit: 5,
        language: 'es',
        access_token: 'pk.eyJ1IjoibHVrYXNtejAzIiwiYSI6ImNtNHF4OHIxejE1YmYyaXM1ZGkxdmRmNjYifQ.hqLlgzM7tO36eZNZ_KJlDw'
    }
})

export default searchApi