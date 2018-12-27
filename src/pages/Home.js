import _ from "lodash";
import React from 'react';
import { Grid, Dropdown } from 'semantic-ui-react'

import API from "../utils/API";
import {GOOGLE_API_KEY} from "../utils/secrets";
import {GoogleApiWrapper, Map} from "google-maps-react";
import {handleError, initialCenterDefault} from "../utils/Utils";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            google: props.google,
            center: null,
            locationOptions: [],
            dropdownValue: ''
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
            console.log(resp);
            this.setState({isLoading: false, center: resp.data});
        }).catch((error) => {
            this.setState({isLoading: false});
            handleError(error, this);
        })
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
                <Grid.Column>
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
                        <Map google={google}
                             style={mapStyle}
                             loading={isLoading}
                             center={center}
                             zoom={8} />
                    </Grid.Row>
                </Grid.Column>
            </Grid>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: GOOGLE_API_KEY
})(Home)
