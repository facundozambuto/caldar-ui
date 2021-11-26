import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AuthContainer from './components/shared/AuthContainer';
import MainContainer from './components/shared/MainContainer';
import BuildingModule from './components/shared/BuildingModule';
import Home from './components/containers/Home';
import SignIn from './components/containers/SignIn';
import Boilers from './components/containers/Boilers';

class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <AuthContainer>
            <MainContainer>
              <Switch>
                <Route exact path="/" render={(routeProps) => { return routeProps.history.push('/home') }} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/signin" component={SignIn} />
                <Route exact path="/boilers" component={Boilers} />
                <Route component={BuildingModule} />
              </Switch>
            </MainContainer>
          </AuthContainer>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;