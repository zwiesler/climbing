import { LOCATION } from './secrets';

export function ChooseLocation() {
    const mapCenterCoordinates = {
        "Boston": {lat: 42.3601, lng: -71.0589},
        "San Francisco":  {lat: 37.773972, lng: -122.431297},
        "Steamboat Springs":  {lat: 40.4840332, lng: -106.8686116}
    };
    return mapCenterCoordinates[LOCATION]
}
