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
            google: props.google,
            center: null,
            locationOptions: [],
            isLoading: false,
            refreshCenter: false
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
                center: initialCenterDefault,
                isLoading: false
            });
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
        const { google, center, locationOptions, isLoading } = this.state;
        return (
            <Grid className="App">
                <Grid.Column>
                    <Grid.Row>
                        <Dropdown fluid
                                  search
                                  selection
                                  options={locationOptions} />
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
