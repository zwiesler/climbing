import _ from 'lodash';
import React from 'react';
import { Input, Popup } from 'semantic-ui-react'


export const SOURCE = [
    {locationName: 'Boston', lat: 42.3601, lng: -71.0589},
    {locationName: 'San Francisco', lat: 37.7740, lng: -122.4313},
    {locationName: 'Steamboat Springs', lat: 40.4840, lng: -106.8686}
];

export default class LocationSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            results: [],
            value: ''
        };
    }

    resetComponent = () => {
        this.setState({isLoading: false, results: [], value: ''});
    };

    handleChange = (e, { value }) => {
      this.setState({isLoading: true, value: value});

      setTimeout(() => {

          if (this.state.value.length < 1) {
             return this.resetComponent();
          }

          const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
          const isMatch = result => re.test(result.locationName);
          const results = _.filter(SOURCE, isMatch);
          this.setState({isLoading: false, results: results});

      }, 300);
    };

    createSearchSuggestions = (locations) => {
        const suggestions = [];
        _.each(locations, (l) => suggestions.push(<Popup.Content content={l.locationName}/>));
        return suggestions
    };

    render() {

        // Styles
        const searchBoxStyle = {
            marginTop: '2vh',
            marginBottom: '2vh',
            marginLeft: '10px'
        };
        const popUpStyle = {
            left: 0,
            width: '200px',
            marginLeft: '10px'
        };

        const { isLoading, results } = this.state;
        return (
            <Popup trigger={<Input loading={isLoading}
                                   style={searchBoxStyle}
                                   placeholder={'Search Location'}
                                   icon={'search'}
                                   onChange={_.debounce(this.handleChange, 500, {leading: true})} />}
                   style={popUpStyle}
                   inverted={true}
                   positon={'left'}
                   on={'click'}>
                {results.length > 0 ? this.createSearchSuggestions(results): 'No search results'}
            </Popup>

        )
    }
}