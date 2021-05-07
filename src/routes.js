import React from 'react';
import {  BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { isAuthenticated } from "./services/auth";
// admin
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Atualizar from './pages/Atualizar';

// abc
import Atafrica from './pages/Atafrica';
import Attribal from './pages/Attribal';
import Atsunset from './pages/Atsunset';
import Excessoes from './pages/Excessoes';
import Eafrica from './pages/Eafrica';
import Etribal from './pages/Etribal';
import Esunset from './pages/Esunset';
import Processadas from './pages/Processadas';
import Pafrica from './pages/Pafrica';
import Ptribal from './pages/Ptribal';
import Psunset from './pages/Psunset';
import ValoresAfrica from './pages/Vafrica';
import ValoresTribal from './pages/Vtribal';
import ValoresSunset from './pages/Vsunset';


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Login} />

      <Route path="/login" exact component={Login} />
      
      <PrivateRoute path="/dashboard" exact component={Dashboard} />

      <PrivateRoute path="/processadas" exact component={Processadas} />
      <PrivateRoute path="/excessoes" exact component={Excessoes} />
      <PrivateRoute path="/atualizar" exact component={Atualizar} />

      <PrivateRoute path="/africa/processadas" exact component={Pafrica} />
      <PrivateRoute path="/africa/atualizar" exact component={Atafrica} />
      <PrivateRoute path="/africa/excessoes" exact component={Eafrica} />
      <PrivateRoute path="/africa/valores" exact component={ValoresAfrica} />

      <PrivateRoute path="/tribal/processadas" exact component={Ptribal} />
      <PrivateRoute path="/tribal/atualizar" exact component={Attribal} />
      <PrivateRoute path="/tribal/excessoes" exact component={Etribal} />
      <PrivateRoute path="/tribal/valores" exact component={ValoresTribal} />

      <PrivateRoute path="/sunset/processadas" exact component={Psunset} />
      <PrivateRoute path="/sunset/atualizar" exact component={Atsunset} />
      <PrivateRoute path="/sunset/excecoes" exact component={Esunset} />
      <PrivateRoute path="/sunset/valores" exact component={ValoresSunset} />
 
    </Switch>
  </BrowserRouter>
);

export default Routes;