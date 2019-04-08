import React, { Component } from 'react';
import {
    Button,
    Divider,
    Dimmer,
    Form,
    Grid,
    Header,
    Icon,
    Loader,
    Message,
    Segment} from 'semantic-ui-react';
import {Link, Redirect} from 'react-router-dom';
import { login } from '../helpers/UserFunctions';
import PageHeader from '../common/pageHeader';
import { connect } from 'react-redux'


class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isLoading: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    };

    onSubmit = (event) => {
        event.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.dispatch(login(user))
            .then ( res => this.props.history.push('./'))
            .catch( err => {
                this.setState({isLoading: false})
            })
    };


    componentDidMount() {
        this.setState({
            isLoading: false
        });
    }


    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const { isAuthenticated } = this.props;
        if (isAuthenticated) {
            return (
                <Redirect to={from}/>
            )
        }
        return (
            <div>
                <PageHeader heading="login"/>
                <Segment className='page-loader' style={{display: this.state.isLoading ? 'block' : 'none'}}>
                    <Dimmer active inverted>
                        <Loader size='large'>Authenticating...</Loader>
                    </Dimmer>
                </Segment>

                <Grid
                    textAlign='center'
                    verticalAlign='middle'
                    className='login-form'
                >
                    <Grid.Column style={{maxWidth: '450px'}}>
                        <Header as='h2' color='teal' textAlign='center'>
                            Login to your account
                        </Header>
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    icon='user'
                                    iconPosition='left'
                                    name='email'
                                    placeholder='E-mail address'
                                    value={ this.state.email }
                                    onChange={this.onChange}
                                />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    name='password'
                                    placeholder='Password'
                                    type='password'
                                    value={this.state.password}
                                    onChange={this.onChange}
                                />
                                <Button color='teal' fluid size='large' onClick={this.onSubmit}>Login</Button>
                                <Link to='/forgot-password' replace>Forgot your password?</Link>
                            </Segment>
                        </Form>
                        <Message>
                            New to us? <Link to='/register' replace>Register</Link>
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

export default connect(mapStateToProps)(LogIn);
