import _ from 'lodash';
import React from 'react';
import {GoogleApiWrapper, Map} from 'google-maps-react';

import {initialCenterDefault, handleError} from '../utils/Utils';
import API from "../utils/API";
import {GOOGLE_API_KEY} from "../utils/secrets";

export class ClimbingMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            google: props.google,
            center: null,
            locationsOptions: [],
            isLoading: false
        };
    }

    componentDidMount() {
        // Query the API for search box locations options

        this.setState({isLoading: true});
        API.locations().getAll().then((resp) => {
            let locationsOptions = [];
            _.forOwn(resp.data['_items'], (value) => {
                locationsOptions.push({
                    location_name: value['location_name'],
                    lat: value['lat'],
                    lng: value['lng']
                })
            });
            this.setState({
                locationsOptions: locationsOptions,
                center: initialCenterDefault,
                isLoading: false
            })
        }).catch((error) => {
            this.setState({isLoading: false});
            handleError(error, this);
        })
    }

    render() {

        // Styles
        const mapStyle = {
            height: '100vh',
            width: '100vw',
        };

        const { google, center, isLoading } = this.state;
        console.log(this.state.locationsOptions);
        return(
            <Map google={google}
                 style={mapStyle}
                 loading={isLoading}
                 center={center}
                 zoom={8} />
        )
    }
}

export default GoogleApiWrapper({
    apiKey: GOOGLE_API_KEY
})(ClimbingMap)