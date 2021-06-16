import { Route, Redirect, Switch } from 'react-router-dom';

import Home from './pages/Home/Home'

import Actives from './pages/Actives/Actives';

function Routes() {
    return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/actives" component={Actives} />
                <Redirect from='*' to="/" />
            </Switch>
    )
}

export default Routes;

