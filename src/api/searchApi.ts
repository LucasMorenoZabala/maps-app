import axios from "axios";

const searchApi = axios.create({
    baseURL: 'https://api.mapbox.com/search/geocode/v6/forward?',
    params: {
        limit: 5,
        language: 'es',
        access_token: 'pk.eyJ1IjoibHVrYXNtejAzIiwiYSI6ImNtNHF4OHIxejE1YmYyaXM1ZGkxdmRmNjYifQ.hqLlgzM7tO36eZNZ_KJlDw'
    }
})

export default searchApi