import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import logo from '../assets/logo.webp';
import escritorio from '../assets/escritorio.webp';
import loading from '../assets/loading.gif'
import api from '../services/api';
import { login, usuario, empresa, foto ,idusuario,setor} from "../services/auth";
import './Login.css';

class Login extends Component {
  state = {
    email: "",
    password: "",
    error: ""
  };
  handleSignIn = async e => {
    e.preventDefault();

    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
    } else {
      try {
        document.getElementById('loading').style.display = 'flex';
        let senha = password;
        const response = await api.post("/usuarios/authenticate", { email, senha });
        console.log(response);
        login(response.data.token);
        usuario(response.data.usuario.nome_usuario);
        empresa(response.data.usuario.nome_empresa);
        setor(response.data.usuario.setores);
        foto(response.data.usuario.imagem_perfil);
        idusuario(response.data.usuario.id_usuario);
        this.props.history.push("/dashboard");
      } catch (err) {
        this.setState({
          error:
            "Houve um problema com o login, seu e-mail e senha!"
        });
        document.getElementById('loading').style.display = 'none';
      }
    }
  };
  render(){
    return (
      <>
      <div className="container-fluid" id="page-login">
        <div className="row">
          <div className="col-sm-12 col-md-6 hide-on-small-only fundo-login">
            <img src={escritorio} alt="Escritório T2C" className="img-fluid" />
          </div>
          <div className="col-sm-12 col-md-6 form">
            <div className="row">
              <form onSubmit={this.handleSignIn} className="col-sm-12">

                <img src={logo} alt="Logo T2C Consultoria" className="img-fluid"/>
                {this.state.error && <p>{this.state.error}</p>}
                <div className="row">
                  <div className="col-sm-12 col-md-12 inputs">
                    <input id="usuario" name="usuario" placeholder="E-mail" className="form-control" type="text" onChange={e => this.setState({ email: e.target.value })} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12 inputs">
                    <input id="password" className="password form-control" placeholder="Senha" type="password" onChange={e => this.setState({ password: e.target.value })}/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <button className="btn btn-primary">ACESSAR</button>
                  </div>
                </div>
                
              </form>
            </div>
          </div>
        </div>
      </div>
          <div className="container-fluid" id="loading">
          <span className="carregando">Estamos conectando no seu painel, por favor aguarde</span>
          <span>
            <img src={loading} alt="Carregando" title="Carregando"/>
          </span>
        </div>
      
      </>
    );
  }
}

export default withRouter(Login);