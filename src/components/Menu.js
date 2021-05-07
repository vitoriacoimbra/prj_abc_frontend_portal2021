import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { logout } from "../services/auth";
import logo from '../assets/logo.webp';
import IosKeypadOutline from 'react-ionicons/lib/IosKeypadOutline';
import IosChatboxesOutline from 'react-ionicons/lib/IosChatboxesOutline';
import IosCloseCircleOutline from 'react-ionicons/lib/IosCloseCircleOutline';
import MenuAfrica from './MenuAfrica';
import MenuSunset from './MenuSunset';
import MenuTribal from './MenuTribal';

import './Menu.css';




class Menu extends Component {

  
  handleSignOut = async e => {
    e.preventDefault();
    try{
      logout();
      this.props.history.push("/login");
    }catch (err) {
      this.setState({
        alert:
          "Houve um problema com o login, verifique suas credenciais. T.T"
      });
    }

  };


  render(){
    const username = localStorage.getItem('usuario');
    const empresa = localStorage.getItem('empresa');
    const foto = localStorage.getItem('foto');
    const setor = localStorage.getItem('setor');

    let menuAfrica;
    let menuSunset;
    let menuTribal;
    
    if(setor.indexOf("África") !==-1 || setor.indexOf("Africa") !==-1){
      menuAfrica = <MenuAfrica pgp={this.props.pgp} pgex={this.props.pgex} pged={this.props.pged} pgv={this.props.pgv} active={this.props.activeA}/>
    }
    if(setor.indexOf("Sunset") !==-1){
      menuSunset = <MenuSunset pgps={this.props.pgps} pgexs={this.props.pgexs} pgeds={this.props.pgeds} pgvs={this.props.pgvs} active={this.props.activeS}/>
    }
    if(setor.indexOf("Tribal") !==-1){
      menuTribal = <MenuTribal pgpt={this.props.pgpt} pgext={this.props.pgext} pgedt={this.props.pgedt} pgvt={this.props.pgvt} active={this.props.activeT}/>
    }


    return (
      <>
        <div className="menu-lateral">
          <div className="usuario">
            <div id="usuario">
              <img src={foto} alt={username}/>
            </div>
            <div id="nome">{username}</div>
            <div id="empresa">{empresa}</div>  
          </div>
          <ul>
          <li className="dropdown">
              <Link to="/dashboard" className="item"><IosKeypadOutline /> Dashboard</Link>           
            </li>
           
          {menuAfrica}
          {menuSunset}
          {menuTribal}



            
            <li className="dropdown">
              <a href="https://t2cconsultoria.freshdesk.com/support/tickets/new" target="_blank" rel="noopener noreferrer" className="item"><IosChatboxesOutline /> Suporte </a> 
            </li>
            

            <li className="dropdown" >
              <span onClick={this.handleSignOut} className="item"><IosCloseCircleOutline /> Sair</span> 
            </li>




          </ul>
          <div className="logotipo text-center">
            <Link to="/dashboard" >
              <img src={logo} className="d-inline-block align-top" alt="Logotipo"/>
              <p className="text-center">Todos os direitos reservados. &copy; 2019</p>
            </Link> 
          </div>
        </div>
          
      
        

      </>
    );
  }
}

export default withRouter(Menu);