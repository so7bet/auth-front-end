import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import routes from './Routes/routes';
import Public from './Routes/Public';
import PrivateRoute from './Routes/Private';


const App = () => (
        <Router>
            <Switch>
                {routes.map((route, i) => {
                    if(route.auth){
                        return <PrivateRoute key={i} {...route}/>
                    } else {
                         return <Public key={i} {...route}/>
                    }
                })}
            </Switch>
        </Router>
);

export default App;
