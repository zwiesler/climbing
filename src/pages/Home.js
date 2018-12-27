import React from 'react';
import { Grid } from 'semantic-ui-react'

import LocationSearch from '../components/LocationSearch';
import ClimbingMap from '../components/ClimbingMap';

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
                        <ClimbingMap />
                    </Grid.Row>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Home;