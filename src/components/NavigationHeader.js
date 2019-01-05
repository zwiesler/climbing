import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";


export default class NavigationHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            handleTabClick: props.handleTabClick
        };
    }

    render() {

        const { handleTabClick } = this.state;
        const navigationHeaderStyle = {
            marginLeft: '15px'
        };

        return (
            <Grid.Row style={navigationHeaderStyle}>
                <Tabs>
                    <TabList>
                        <Tab onClick={() => handleTabClick('map')}>Map</Tab>
                        <Tab onClick={() => handleTabClick('log')}>Log</Tab>
                        <Tab onClick={() => handleTabClick('freerider')}>Freerider Path</Tab>
                        <Tab onClick={() => handleTabClick('moonlight')}>Moonlight Path</Tab>
                        <Tab onClick={() => handleTabClick('newEngland')}>New England</Tab>
                        <Tab onClick={() => handleTabClick('colorado')}>Colorado</Tab>
                    </TabList>
                    <TabPanel> </TabPanel>
                    <TabPanel> </TabPanel>
                    <TabPanel> </TabPanel>
                    <TabPanel> </TabPanel>
                    <TabPanel> </TabPanel>
                    <TabPanel> </TabPanel>
                </Tabs>
            </Grid.Row>
        )
    }
}
