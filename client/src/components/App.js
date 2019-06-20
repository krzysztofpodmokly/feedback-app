import React, { Component } from 'react';

// BrowserRouter accepts only one child => that is why div must be added
import { BrowserRouter, Route } from 'react-router-dom';

// connect function is imported to give certain components the ability to call action creators
import { connect } from 'react-redux';
import { fetchUser } from '../actions';
// import * as actions from '../actions';

import Header from './Header';

const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>
const Landing = () => <h2>Header</h2>

class App extends Component {
    componentDidMount() {
        // Once this component (App) is rendered to the screen, fetch the current user
        this.props.fetchUser()
    }

    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route path="/" exact component={Landing} />
                        <Route path="/surveys" exact component={Dashboard} />
                        <Route path="/surveys/new" exact component={SurveyNew} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}



export default connect(null, { fetchUser })(App);
// export default connect(null, actions)(App);