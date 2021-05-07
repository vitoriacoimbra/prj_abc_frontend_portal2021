/* eslint max-len: 0 */
import React from 'react';
import Menu from '../components/Menu';
import Modals from '../components/Modal';

import { MDBBtn, MDBTable, MDBTableBody, MDBTableHead  } from 'mdbreact';
import api from '../services/api';




export default class Processadas extends React.Component {
  state = {
      processos: [],
      modalIsOpen:false
    
  };

  
  async componentDidMount() {
    const {data} = await api.get('editar/africa/manual');

    const processos = data.map(
        processo => Object.keys(processo).reduce(
            (obj, key) => {
                obj[key] = processo[key] != null && processo[key] !== '' ? processo[key] : ' ';
                return obj
            }, {}
        )
    ).map(
        processo => ({
            ...processo,
            actions: (
              <>
              
                <MDBBtn
                    onClick={()=> this.toggleModal(processo.id_nf)}
                    color="primary"
                    rounded
                    size="sm"
                >Editar
                </MDBBtn>
                <MDBBtn
                onClick={()=> this.manual(processo.id_nf)}
                color="warning"
                rounded
                size="sm"
            >Manual
            </MDBBtn>
            </>
            )
        })
    );

    this.setState({processos});
    console.log(this.state.processos);
}


async manual(id){
  let status = "ENTRADA MANUAL";
  const id_user = localStorage.getItem('id_user');
  try {
    if(window.confirm('Tem certeza que deseja gravar esses dados?')){
    const response = await api.get(`/processos/africa/${id}`);

    let statusAnterior = response.data[0].status;
    console.log(statusAnterior);


    await api.put(`/processos/africa/${id}`,{status,statusAnterior,id_user});
    alert('Dados atualizados com sucesso');
    }
  } catch (err) {
    this.setState({
      error:
        "Houve um problema com a atualização, verifique sua conexão de internet! Caso continue acesse nosso suporte."
    });
  }
}

toggleModal(id){
  this.setState({
    modalIsOpen: !this.state.modalIsOpen,
    idProcesso: id
  });
}

  render() {
    const columns= [
        {
          label: '#',
          field: 'id_nf',
          sort: 'asc',
          width: 150
        },
        {
          label: 'R. Tomador',
          field: 'razaoTomador',
          sort: 'asc',
          width: 270
        },
        {
          label: 'CNPJ Tomador',
          field: 'cnpjTomador',
          sort: 'asc',
          width: 200
        },
        {
          label: 'R. Prestador',
          field: 'razaoPrestador',
          sort: 'asc',
          width: 270
        },
        {
          label: 'CNPJ Prestador',
          field: 'cnpjPrestador',
          sort: 'asc',
          width: 200
        },
        {
          label: 'Nota',
          field: 'NumNota',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Série',
          field: 'Serie',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Emissão',
          field: 'Emissao',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Total',
          field: 'valorTotal',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Vencimento',
          field: 'vencimento',
          sort: 'asc',
          width: 50
        },
        {
          label: 'AP',
          field: 'numAP',
          sort: 'asc',
          width: 150
        },
        {
          label: 'PI',
          field: 'numPI',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Status',
          field: 'status',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Erro',
          field: 'descricaoErro',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Caminho',
          field: 'caminhoAbsoluto',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Ações',
          fiel: 'actions',
          sort: 'asc',
          width: 150
        }
      ];
      const rows= this.state.processos;

    return (
      <>
        <Menu/>
        <div className="paineldireito" id="tabela-over">
          <div className="painel container-fluid">
            <div className="conteudo">
              <div className="titulo">
                <h2>Notas para Atualização</h2>
              </div>
              <MDBTable btn striped bordered responsive >
              <MDBTableHead columns={columns} key="sunset"/>
              <MDBTableBody rows={rows} paging={true}/>
            </MDBTable>
            </div>
           
            
          </div>
        </div>
        <Modals processoId ={this.state.idProcesso} isOpen={this.state.modalIsOpen} hideModal={() => this.setState({modalIsOpen: false})}></Modals>
      </>
        
    );
  }
}

