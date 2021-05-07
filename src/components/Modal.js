import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import api from '../services/api';
import Form from 'react-bootstrap/Form';


export default class Modals extends Component{
  state={
    processos:[],
    vencimento:'',
    vencimentoAnterior:'',
    numAP:'',
    numAPAnterior:'',
    numPI: '',
    numPIAnterior: '',
    cnpjPrestador: '',
    cnpjPrestadorAnterior: '',
    status:'',
    statusAnterior:'',
    error: '',
   
    modalIsOpen:false
  }
  toggleModal(){
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  }
  async componentDidUpdate(prevProps, prevState) {
    
    if(prevProps.processoId !== this.props.processoId){
      const response = await api.get(`/processos/africa/${this.props.processoId}`);

      var dia = response.data[0].vencimento;
      if (dia ==="" | dia === null){
        this.setState({vencimento: ""});
      }else{
        var venc = dia.split('/');
        this.setState({vencimento: venc[2]+"-"+venc[1]+"-"+venc[0]});
      }
      
      this.setState({vencimentoAnterior: response.data[0].vencimento});
      this.setState({ numAP: response.data[0].numAP});
      this.setState({ numAPAnterior: response.data[0].numAP});
      this.setState({ cnpjPrestador: response.data[0].cnpjPrestador});
      this.setState({ cnpjPrestadorAnterior: response.data[0].cnpjPrestador});
      this.setState({ numPI: response.data[0].numPI});
      this.setState({ numPIAnterior: response.data[0].numPI});
      this.setState({ status: response.data[0].status });
      this.setState({ statusAnterior: response.data[0].status });
      this.setState({ processos: response.data[0] });
      
    }else{
      // console.log('nao mudou')
    }
    
  }
  
  handleSave = async e => {
    e.preventDefault();

    const { numAP, numPI, vencimento, cnpjPrestador, numAPAnterior, numPIAnterior, vencimentoAnterior, cnpjPrestadorAnterior, statusAnterior } = this.state;
    const id_user = localStorage.getItem('id_user');
      try {

        var obj = vencimento;
        var objeto = obj.split('-');
        var venci = objeto[2]+"/"+objeto[1]+"/"+objeto[0];
        var status = "EM ABERTO"; 
        
        if(window.confirm('Tem certeza que deseja gravar esses dados?')){
          await api.put(`/processos/africa/${this.props.processoId}`, { numAP, numPI, venci, cnpjPrestador, status,numAPAnterior, numPIAnterior, vencimentoAnterior, cnpjPrestadorAnterior, statusAnterior, id_user });
          alert("dados atualizados com sucesso");
        }
        
        this.props.loadProcessos();
        this.props.hideModal();
        
      } catch (err) {
        this.setState({
          error:
            "Houve um problema na atualização dos dados, verifique sua conexão de internet! Caso persista o erro, contate nosso suporte."
        });
      }

  };

  render(){
    return(
      <Modal isOpen={this.props.isOpen}>
        <ModalHeader >Nota Fiscal: {this.props.processoId}</ModalHeader>
          <ModalBody>
          {this.state.error && <p>{this.state.error}</p>}
            <Form>
            <Form.Group controlId={'nap' + this.props.processoId}>
                <Form.Label>Número AP </Form.Label>
                <Form.Control placeholder="AP" name="numAP" type="text" value={this.state.numAP} onChange={e => this.setState({ numAP: e.target.value })}/>
                </Form.Group>
              <Form.Group controlId={"npi" + this.props.processoId}>
                <Form.Label>Número PI</Form.Label>
                <Form.Control placeholder="PI" name="numPI" type="text" value={this.state.numPI} onChange={e => this.setState({ numPI: e.target.value })}/>
                </Form.Group>
              <Form.Group controlId={"dvencimento" + this.props.processoId}>
                <Form.Label>Data Vencimento</Form.Label>
                <Form.Control placeholder="Data Vencimento" name="vencimento" type="date" value={this.state.vencimento ||'' } onChange={e => this.setState({ vencimento: e.target.value })}/>
                </Form.Group>
                <Form.Group controlId={"cprestador" + this.props.processoId}>
                <Form.Label>CNPJ Prestador</Form.Label>
                <Form.Control placeholder="CNPJ Prestador" name="cnpjPrestador" type="text" value={this.state.cnpjPrestador ||'' } onChange={e => this.setState({ cnpjPrestador: e.target.value })}/>
                </Form.Group>
                <input type="hidden" name="cnpjPrestadorAnterior" value={this.state.cnpjPrestadorAnterior}/>
              
              
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => this.props.hideModal()}>Fechar</Button>
            <Button color="primary" onClick={this.handleSave}>Salvar</Button>
          </ModalFooter>
        </ Modal>
    );
  }
}
