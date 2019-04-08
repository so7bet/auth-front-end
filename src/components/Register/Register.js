import React, { Component } from 'react';
import {Button, Dimmer, Form, Grid, Header, Loader, Message, Segment} from 'semantic-ui-react';
import {Link, Redirect} from 'react-router-dom';
import { register } from "../helpers/UserFunctions";
import PageHeader from '../common/pageHeader'
import { connect } from 'react-redux';


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            username: '',
            email: '',
            password: '',
            isLoading: false,
            isSuccess: true,
        };
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

     handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})

     };


    onSubmit = (event) => {
        event.preventDefault();
        const newUser = {
            name: this.state.name,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        };
        this.props.dispatch(register(newUser, this.props.history))
            .then((result) => {
                this.setState({
                    isLoading: false,
                    isSuccess: true,
                    name: '',
                    username: '',
                    email: '',
                    password: '',
                });
            })
            .then(res => this.props.history.push('./login'))
            .catch(err => {
                this.setState({
                    isLoading: true
                })
            })
    };


    componentDidMount() {
        this.setState({
            isLoading: false
        });
    }

    render() {

        return (
            <div>
                <PageHeader heading="Register"/>
                <Segment className='page-loader' style={{display: this.state.isLoading ? 'block' : 'none'}}>
                    <Dimmer active inverted>
                        <Loader size='large'>Registering...</Loader>
                    </Dimmer>
                </Segment>
                <Grid
                    textAlign='center'
                    verticalAlign='middle'
                    className='login-form'
                >
                    <Grid.Column style={{maxWidth: '450px'}}>
                        <Header as='h2' color='teal' textAlign='center'>
                            Register for new account
                        </Header>
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    icon='user'
                                    iconPosition='left'
                                    name='name'
                                    placeholder='Name'
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                />
                                <Form.Input
                                    fluid
                                    icon='user'
                                    iconPosition='left'
                                    name='username'
                                    placeholder='UserName'
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                />
                                <Form.Input
                                    fluid
                                    icon='mail'
                                    iconPosition='left'
                                    name='email'
                                    value={this.state.email}
                                    placeholder='E-mail address'
                                    onChange={this.handleChange}
                                />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    name='password'
                                    placeholder='Password'
                                    type='password'
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                                <Button color='teal' fluid size='large' onClick={this.onSubmit}>Register</Button>
                            </Segment>
                        </Form>
                        <Message>
                            Already register ? <Link to='/login' replace>Login</Link>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.Auth.isAuthenticated
    }
};

export default connect(mapStateToProps)(Register);
