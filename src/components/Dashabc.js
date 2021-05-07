import React, { Component } from 'react';
import abc from '../assets/novologo_grupoabc.svg'
import tribal from '../assets/tribal-logo-152x50px.png';
import africa from '../assets/logo-africa-02.png';
import sunset from '../assets/logo-sunset-2019.png';

class Dashabc extends Component {
  render(){
    return (
      <>

        <div className="row">
        <div className="col-sm-12 text-center">
          <h1>Painel de Acompanhamento de Notas Fiscais Grupo ABC</h1>
        </div>
        </div>
        <div className="row">
        <div className="col-sm-12 text-center">
          <p className="paragrafo">Estamos trabalhando para criar um ambiente mais completo para sua empresa. Em breve disponibilizaremos mais recursos.</p>
        </div>
        </div>

        <div className="row">
        <div className="col-sm-12 col-md-3">
          <img src={abc} alt="Grupo ABC" className="img-fluid"/> 
        </div>
        <div className="col-sm-12 col-md-3">
          <img src={africa} alt="Agência África" className="img-fluid"/>
        </div>
        <div className="col-sm-12 col-md-3">
          <img src={tribal} alt="Agência Tribal" className="img-fluid"/>
        </div>
        <div className="col-sm-12 col-md-3">
          <img src={sunset} alt="Agência Sunset" className="img-fluid"/>
        </div>
        </div>
        </>
    );
  }
}

export default Dashabc;