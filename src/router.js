import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'
import App from './containers/App';
import Home from './containers/home/containers/Home';
import ZiXuanDetail from './containers/home/containers/ZiXuanList/ZiXuanDetail';

export default class router extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Route render={({location}) => {
                    return (
                        <Switch key={location.pathname}>
                            <Route location={location} exact path="/" component={Home}/>
                            <Route location={location} path="/zixuandetail" component={ZiXuanDetail}/>
                            <Route component={NoMatch}/>
                        </Switch>
                    )
                }}/>
            </Router>
        )
    }
}

const NoMatch = ({location}) => (
    <div>
        <h3>无法匹配
            <code>
                {location.pathname}
            </code>
        </h3>
    </div>
);