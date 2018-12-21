import React from 'react';
import { GoogleApiWrapper, Map } from 'google-maps-react';

import { GOOGLE_API_KEY } from '../utils/secrets';
// import Map from '../components/Map';

export class Container extends React.Component {
    render() {

        // Styles
        const containerStyle = {
            width: '100vw',
            height: '100vh'
        };

        return (
            <div style={containerStyle}>
                <Map google={this.props.google} />
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: GOOGLE_API_KEY
})(Container)
