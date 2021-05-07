import React, { Component } from 'react';
import Menu from '../components/Menu';

import Dashabc from '../components/Dashabc';
import './Dashboard.css';

class Dashboard extends Component {
  

  render(){

    return (
      <>
        <Menu></Menu>
        <div className="paineldireito">
          <div className="painel container-fluid">
            <Dashabc></Dashabc>
          </div>
        </div>
      </>
    );
  }
}

export default Dashboard;