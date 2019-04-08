import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navigation from './components/common/Navigation/Navigation';
import Footer from './components/common/Footer/Footer';

class Base extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <div>
                <Navigation/>
                <main className='fadeIn animated'>
                    {this.props.children}
                </main>
                <Footer/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.Auth.isAuthenticated
    }
};

export default connect(mapStateToProps)(Base);
