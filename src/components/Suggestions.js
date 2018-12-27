import React from 'react';
import { Popup, Button } from 'semantic-ui-react'

export default class Suggestions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: props.location
        };
    }

    render() {

        const { idx, location } = this.state;
        return (
            <Popup.Content>
                <Button>{location.locationName}</Button>
            </Popup.Content>
        )
    }
}