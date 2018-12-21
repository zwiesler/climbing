import React from 'react';
import { Grid, Search } from 'semantic-ui-react'


export default class LocationSearch extends React.Component {
    render() {

        // Styles
        const searchBoxStyle = {
            marginTop: '2vh',
            marginBottom: '2vh'
        }

        return (
                <Search category
                        style={searchBoxStyle}
                        placeholder={'Search Location'}
                        icon={'search'}/>
        )
    }
}