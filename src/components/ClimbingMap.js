import React from 'react';
import { GoogleApiWrapper, Map } from 'google-maps-react';

export default class ClimbingMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {google: props.google};
    }
    render() {
        const {google} = this.state;
        return(
            <Map google={google}/>
        )
    }
}
