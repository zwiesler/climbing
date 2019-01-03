import _ from "lodash";
import React from 'react';
import { Grid, Dropdown, Container } from 'semantic-ui-react';
import {GoogleApiWrapper, Map, Marker, InfoWindow} from "google-maps-react";

import API from "../utils/API";
import {GOOGLE_API_KEY} from "../utils/secrets";
import {handleError, initialCenterDefault, googleSheetURL} from "../utils/Utils";
import GoogleSheet from '../components/GoogleSheet';

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
            sheetLoaded: false,
            googleSheetURLlatest: null
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

    handleMarkerClick = (props, marker, e) => {
        API.google_sheets().getLocation(this.state.dropdownValue).then((resp) => {
            this.setState({
                activeMarker: marker,
                showingInfoWindow: true,
                sheetLoaded: true,
                googleSheetURLlatest: googleSheetURL + '/edit#gid=' + resp.data
            });
        })
    };

    handleMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };

    render() {

        const { isLoading, google, center, locationOptions, dropdownValue, googleSheetURLlatest, showingInfoWindow } = this.state;

        // Styles
        const mapStyle = {
            height: '100vh',
            width: '100vw',
            marginTop: showingInfoWindow ? '300px' : 0
        };
        const dropdownStyle = {
            margin: '5px 0 5px 10px',
            width: '200px'
        };

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
                <GoogleSheet showingInfoWindow={showingInfoWindow} googleSheetURLlatest={googleSheetURLlatest}/>
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
