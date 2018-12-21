import React from 'react';

import GoogleApiWrapper from '../components/Container';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="App">
                <GoogleApiWrapper />
            </div>
        )
    }
}

export default Home;