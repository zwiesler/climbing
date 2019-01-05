import _ from "lodash";
import React from 'react';
import {Container, Grid} from 'semantic-ui-react';
import {InfoWindow, Map, Marker} from "google-maps-react";

export default class GoogleMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: props.isLoading,
            google: props.google,
            center: props.center,
            showingInfoWindow: props.showingInfoWindow,
            handleMapClicked: props.handleMapClicked,
            handleMarkerClick: props.handleMarkerClick,
            activeMarker: props.activeMarker
        }
    }

    componentWillReceiveProps(nextProps) {
        let newState = {};
        _.each(nextProps, (val, key) => {
            if (this.state.hasOwnProperty(key) && val !== this.state[key]) {
                newState[key] = val;
            }
        });
        this.setState(newState);
    }

    render() {

        const { isLoading, google, center, showingInfoWindow, handleMapClicked, handleMarkerClick,
            activeMarker } = this.state;

        const mapStyle = {
            height: '100vh',
            width: '100vw',
            marginTop: showingInfoWindow ? '400px' : 0
        };

        return (
            <Grid.Row>
                <Map google={google}
                     style={mapStyle}
                     loading={isLoading}
                     center={center}
                     zoom={8}
                     onClick={handleMapClicked}>
                    <Marker position={center} onClick={handleMarkerClick}/>
                    <InfoWindow marker={activeMarker} visible={showingInfoWindow}>
                        <Container>
                            <p>Hi there</p>
                        </Container>
                    </InfoWindow>
                </Map>
            </Grid.Row>
        )
    }
}