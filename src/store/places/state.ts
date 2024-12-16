export interface PlacesState {
    isLoading: boolean;
    userLocation?: [number, number]; //LNG, LAT
}

function state(): PlacesState {
    return {
        isLoading: true,
        userLocation: undefined,
       
    }
}

export default state;