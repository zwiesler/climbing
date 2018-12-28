import _ from "lodash";
import React from 'react';
import ReactGoogleSheets from 'react-google-sheets';
import { Grid, Dropdown, Container } from 'semantic-ui-react'
import {GoogleApiWrapper, Map, Marker, InfoWindow} from "google-maps-react";

import API from "../utils/API";
import {GOOGLE_API_KEY, CLIMBING_SHEET_ID} from "../utils/secrets";
import { web } from '../utils/client_id';
import {handleError, initialCenterDefault} from "../utils/Utils";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            google: props.google,
            center: null,
            locationOptions: [],
            dropdownValue: '',
            showingInfoWindow: false,
            activeMarker: {},
            sheetLoaded: false
        };
    }

    componentDidMount() {
        // Query the API for search box locations options

        this.setState({isLoading: true});
        API.locations().getAll().then((resp) => {
            let locationOptions = [];
            _.each(resp.data['_items'], (item, idx) => {
                locationOptions.push({key: idx, value: item, text: item})
            });
            const boston = _.filter(locationOptions, (o) => o.value === 'Boston');
            const nonBoston = _.filter(locationOptions, (o) => o.value !== 'Boston');
            locationOptions = boston.concat(_.sortBy(nonBoston, ['value']));
            this.setState({
                locationOptions: locationOptions,
                dropdownValue: locationOptions.length > 0 ? locationOptions[0].value : 'No search results',
                center: initialCenterDefault,
                isLoading: false
            });
        }).catch((error) => {
            this.setState({isLoading: false});
            handleError(error, this);
        })
    }

    handleChange = (e, data) => {
        if (data.value !== this.state.dropdownValue) {
            this.setState({dropdownValue: data.value});
        }
    };

    handleClick = (e, data) => {
        this.setState({isLoading: true});
        API.locations().getLocationCoordinates(this.state.dropdownValue).then((resp) => {
            this.setState({isLoading: false, center: resp.data});
        }).catch((error) => {
            this.setState({isLoading: false});
            handleError(error, this);
        })
    };

    handleMarkerClick = (props, marker, e) =>
        this.setState({
            activeMarker: marker,
            showingInfoWindow: true
        });

    handleMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };

    render() {

        // Styles
        const mapStyle = {
            height: '100vh',
            width: '100vw',
        };
        const dropdownStyle = {
            margin: '5px 0 5px 10px',
            width: '200px'
        };

        const { isLoading, google, center, locationOptions, dropdownValue } = this.state;
        return (
            <Grid className="App">
                <Grid.Row>
                    <Dropdown fluid
                              search
                              selection
                              style={dropdownStyle}
                              value={dropdownValue}
                              options={locationOptions}
                              onChange={this.handleChange}
                              onClick={this.handleClick}/>
                </Grid.Row>
                <Grid.Row>
                    <Container><p>Hi there</p></Container>
                </Grid.Row>
                <Grid.Row>
                    <Map google={google}
                         style={mapStyle}
                         loading={isLoading}
                         center={center}
                         zoom={8}
                         onClick={this.handleMapClicked}>
                        <Marker position={center} onClick={this.handleMarkerClick}/>
                        <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow}>
                            <Container>
                                <p>Hi there</p>
                            </Container>
                        </InfoWindow>
                    </Map>
                </Grid.Row>
            </Grid>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: GOOGLE_API_KEY
})(Home)
