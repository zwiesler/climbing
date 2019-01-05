import _ from "lodash";
import React from 'react';
import { Grid, Dropdown } from 'semantic-ui-react';
import { GoogleApiWrapper } from "google-maps-react";

import API from "../utils/API";
import {GOOGLE_API_KEY} from "../utils/secrets";
import GoogleSheet from '../components/GoogleSheet';
import GoogleMap from '../components/GoogleMap';
import NavigationHeader from '../components/NavigationHeader';
import {handleError, initialCenterDefault, googleSheetURL} from "../utils/Utils";

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
            showingMap: true,
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
        this.setState({isLoading: true});
        API.locations().getLocationCoordinates(data.value).then((resp) => {
            this.setState({
                isLoading: false,
                center: resp.data,
                showingInfoWindow: false,
                dropdownValue: data.value
            });
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

    handleTabClick = () => {
        this.setState({
            showingInfoWindow: false,
            showingMap: false
        })
    };

    render() {

        const { isLoading, google, center, locationOptions, dropdownValue,
            googleSheetURLlatest, showingInfoWindow, showingMap, activeMarker } = this.state;

        const dropdownStyle = {
            margin: '5px 0 5px 10px',
            width: '200px'
        };

        return (
            <Grid className="App">

                <Grid.Row columns={2}>
                    <Grid.Column width={3}>
                        <Dropdown fluid
                                  search
                                  selection
                                  style={dropdownStyle}
                                  value={dropdownValue}
                                  options={locationOptions}
                                  selectOnNavigation={false}
                                  onChange={this.handleChange} />
                    </Grid.Column>
                    <Grid.Column>
                        <NavigationHeader handleTabClick={this.handleTabClick}/>
                    </Grid.Column>
                </Grid.Row>

                <GoogleSheet showingInfoWindow={showingInfoWindow}
                             googleSheetURLlatest={googleSheetURLlatest} />

                <GoogleMap isLoading={isLoading}
                           google={google}
                           center={center}
                           showingInfoWindow={showingInfoWindow}
                           handleMapClicked={this.handleMapClicked}
                           handleMarkerClick={this.handleMarkerClick}
                           activeMarker={activeMarker} />
            </Grid>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: GOOGLE_API_KEY
})(Home)
