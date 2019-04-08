import React, { Component} from 'react';
import {
    Header,
    Segment,
} from 'semantic-ui-react';
import PageHeader from '../common/pageHeader';
import { connect } from 'react-redux'


class AdminDashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <PageHeader heading="Dashboard"/>
                <Segment vertical textAlign='center' style={{minHeight: '100vh'}}>
                    <Header as='h1'>AdminDashboard</Header>
                </Segment>
            </div>
        );
    }
}

export default connect()(AdminDashboard);
