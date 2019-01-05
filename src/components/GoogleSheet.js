import _ from "lodash";
import React from 'react';
import { Grid } from 'semantic-ui-react';

export default class GoogleSheet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showingSheet: props.showingSheet,
            showingMap: props.showingMap,
            googleSheetURLlatest: props.googleSheetURLlatest
        }
    }

    componentWillReceiveProps(nextProps) {
        let newState = {};
        _.each(nextProps, (val, key) => {
            if (this.state.hasOwnProperty(key) && val !== this.state[key]) {
                newState[key] = val;
            }
        });
        this.setState(newState);
    }

    render() {
        const { showingSheet, showingMap, googleSheetURLlatest } = this.state;

        const googleSheetStyle = {
            position: 'absolute',
            width: '100%',
            height: showingMap ? '400px' : '100vh',
            border: null
        };

        if (!showingSheet) {
            return null
        } else {
            return (
                <Grid.Row>
                    <div>
                        <iframe style={googleSheetStyle}
                                scrolling="yes"
                                title="googleSheet"
                                src={googleSheetURLlatest} />
                    </div>
                </Grid.Row>
            )
        }
    }
}