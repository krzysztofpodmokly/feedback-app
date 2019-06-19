import React from 'react';

// BrowserRouter accepts only one child => that is why div must be added
import { BrowserRouter, Route } from 'react-router-dom';

const Header = () => <h2>Header</h2>
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>
const Landing = () => <h2>Header</h2>

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <div>
                    <Route path="/" component={Landing} />
                    <Route path="/" component={Landing} />
                    <Route path="/" component={Landing} />
                    <Route path="/" component={Landing} />
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;