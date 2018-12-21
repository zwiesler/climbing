import React from 'react';
import { Map } from 'google-maps-react';

import { ChooseLocation } from '../utils/Utils';

export default class ClimbingMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            google: props.google,
            initialCenter: ChooseLocation()
        };
    }
    render() {

        // Styles
        const mapStyle = {
            height: '100vh',
            width: '100vw',
        };

        const { google, initialCenter } = this.state;

        return(
            <Map google={google}
                 style={mapStyle}
                 initialCenter={initialCenter}
                 searchBox={true}
                 zoom={8} />
        )
    }
}
