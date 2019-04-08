import React, { Component } from 'react'
import {
    Header,
    Grid,
    Segment
} from 'semantic-ui-react'

class PageHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Segment inverted className="page-header" textAlign="center" vertical>
                <Header as="h1">{this.props.heading}</Header>
            </Segment>
        );
    }
}

export default PageHeader;
