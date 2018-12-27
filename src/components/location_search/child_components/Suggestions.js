import React from 'react';
import { Popup, Button } from 'semantic-ui-react'

export default class Suggestions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: props.location,
            handleClick: props.handleClick
        };
    }

    render() {

        const { location, handleClick } = this.state;
        return (
            <Popup.Content>
                <Button onClick={handleClick}>{location.locationName}</Button>
            </Popup.Content>
        )
    }
}