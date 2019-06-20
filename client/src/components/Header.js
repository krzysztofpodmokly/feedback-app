import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Header will be a class-based component because additional functions will be added
// to decide what kind of button to render (login or logout)

class Header extends Component {

    // Helper method which inspects this.props.auth property and depending on its value
    // some different blob of JSX will be returned 
    renderContent() {
        switch (this.props.auth) {
            case null:
                return; // don't show anything at all
            case false:
                return <li><a href="/auth/google">Login with Google</a></li>
            default:
                return <li><a href="/api/logout">Logout</a></li>

        }
    }

    render() {
        // this.props is coming from mapStateToProps function
        // console.log(this.props)
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link
                        to={this.props.auth ? '/surveys' : '/'}
                        className="left brand-logo"
                    >
                        Feedback
                    </Link>
                    <ul className="right">
                        { this.renderContent() }
                    </ul>
                </div>
            </nav>
        );
    }
}

// function is called with entire state object out of the redux store
// then we have to return an object from this function which will be passed
// to the component as PROPS
//function mapStateToProps(state) { return { auth: state.auth }; }
function mapStateToProps({ auth }) {
    return { auth }
}

export default connect(mapStateToProps)(Header);