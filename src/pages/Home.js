import React from 'react';
import { Grid } from 'semantic-ui-react'

import GoogleApiWrapper from '../components/Container';
import LocationSearch from '../components/LocationSearch';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Grid className="App">
                <Grid.Column>
                    <Grid.Row>
                        <LocationSearch />
                    </Grid.Row>
                    <Grid.Row>
                        <GoogleApiWrapper />
                    </Grid.Row>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Home;