import React from 'react';
import Menu from '../components/Menu';
import Modals from '../components/ModalT';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { MDBDataTable, MDBBtn} from 'mdbreact';
import api from '../services/api';
import MonthPicker from 'react-simple-month-picker';
import ExcelEd from '../components/ExcelEd';
import MonthPickerInput from 'react-month-picker-input';
import 'react-month-picker-input/dist/react-month-picker-input';
import moment from 'moment';



export default class Processadas extends React.Component {

  state = {
      processos: [],
      modalIsOpen:false,
      classname: 'picker hide',
      buscaMes: '02/2020',
      filtro: '',
      coluna: ''
  };

  
  async componentDidMount() {
    document.querySelector('input[type="search"]').setAttribute('placeholder', 'Buscar em todas as colunas')
    this.loadProcessos();

}
async manual(id){
  let status = "ENTRADA MANUAL";
  const id_user = localStorage.getItem('id_user');
  try {
    if(window.confirm('Tem certeza que deseja gravar esses dados?')){
    const response = await api.get(`/processos/tribal/${id}`);

    let statusAnterior = response.data[0].status;
    console.log(statusAnterior);


    await api.put(`/processos/tribal/${id}`,{status,statusAnterior,id_user});
    alert('Dados atualizados com sucesso');
    }
  } catch (err) {
    this.setState({
      error:
        "Houve um problema com a atualização, verifique sua conexão de internet! Caso continue acesse nosso suporte."
    });
  }

  this.loadProcessos();
}



toggleModal(id){
  this.setState({
    modalIsOpen: !this.state.modalIsOpen,
    idProcesso: id
  });
}

loadProcessos = async()=>{
  const {data} = await api.get('editar/tribal');

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
        caminhoAbsoluto:processo.caminhoAbsoluto !== ' '?(
          <CopyToClipboard text={processo.caminhoAbsoluto} >
          <button className="btn btn-outline-success">{processo.caminhoAbsoluto}</button>
        </CopyToClipboard>
        ): ' ',
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
        ),
        actions2: (
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
}


pegaMes(valor){
  let mes;
  mes = valor.split("/");
  mes = mes[0] + '-' + mes[1];
  this.setState({buscaMes: mes});
 }

 buscar = async (e) =>{
  e.preventDefault();
  let {filtro, coluna} = this.state;
  let data;

  if(!filtro || filtro === '' || filtro === " " || filtro === null){
    this.loadProcessos();
  }else{
    if(!coluna || coluna ==="" || coluna === null){
      alert('Defina a coluna para busca')
      return
    }else{
      data = await api.get(`/busca/editar?empresa=2&coluna=${coluna}&busca=${filtro}`);
      data = data.data
    }

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
          caminhoAbsoluto:processo.caminhoAbsoluto !== ' '?(
            <CopyToClipboard text={processo.caminhoAbsoluto} >
            <button className="btn btn-outline-success">{processo.caminhoAbsoluto}</button>
          </CopyToClipboard>
          ): ' ',
          actions: (
            <>
            
              <MDBBtn
                  onClick={()=> this.toggleModal(processo.id_nf)}
                  color="primary"
                  rounded
                  size="sm"
                  key={"ed1" + processo.id_nf}
              >Editar
              </MDBBtn>
              <MDBBtn
              onClick={()=> this.manual(processo.id_nf)}
              color="warning"
              rounded
              size="sm"
              key={"mn1" + processo.id_nf}
          >Manual
          </MDBBtn>
          </>
          ),
          actions2: (
            <>
            
              <MDBBtn
                  onClick={()=> this.toggleModal(processo.id_nf)}
                  color="primary"
                  rounded
                  size="sm"
                  key={"ed2" + processo.id_nf}
              >Editar
              </MDBBtn>
              <MDBBtn
                  onClick={()=> this.manual(processo.id_nf)}
                  color="warning"
                  rounded
                  size="sm"
                  key={"mn2" + processo.id_nf}
              >Manual
              </MDBBtn>
          </>
          )
      })
    );
  
    this.setState({processos});
  }
}



  render() {
    const dados = {
      columns: [
        {
          label: 'Ação',
          field: 'actions2',
          sort: 'asc',
          width: 250
        },
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
          label: 'R. Prestador',
          field: 'razaoPrestador',
          sort: 'asc',
          width: 270
        },
        {
          label: 'Nota',
          field: 'NumNota',
          sort: 'asc',
          width: 100
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
          label: 'Total Recebido',
          field: 'valorTotalRecebido',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Vencimento',
          field: 'vencimento',
          sort: 'asc',
          width: 150
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
          label: 'Caminho',
          field: 'caminhoAbsoluto',
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
          label: 'Status',
          field: 'status',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Ultima Alteracao',
          field: 'dtLog',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Usuario responsável',
          field: 'nome_usuario',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Ação',
          field: 'actions',
          sort: 'asc',
          width: 250
        }
      ],
      rows: this.state.processos
  }


    return (
      
      <>
        <Menu pgedt="active" activeT={true}/>
        <div className="paineldireito">
          <div className="painel container-fluid">
          <div className="row">
              <div className="col-sm-12 header">
                <div className="download">
                  <ExcelEd mes={this.state.buscaMes} empresa="tribal"/>
                  
                </div>
                <div className="filtro">
                  <div className="select">
                    <label htmlFor="filtro">Filtrar por:</label>
                    <select name="filtro" id="filtro" onChange={e => this.setState({ coluna: e.target.value })}>
                      <option value="">Sem filtro</option>
                      <option value="NumNota">Nº Nota</option>
                      <option value="valorTotal">Valor Total</option>
                    </select>
                  </div>
                  <div className="input">
                    <input type="text" placeholder="Buscar" onChange={e => this.setState({filtro: e.target.value})}/>
                    <button onClick={e => this.buscar(e)}>Buscar</button>
                  </div>
                </div>
                
              </div>
            </div>
            <MDBDataTable striped bordered hover data={dados} responsive />
          </div>
        </div>
        <Modals 
          processoId ={this.state.idProcesso} 
          isOpen={this.state.modalIsOpen} 
          hideModal={() => this.setState({modalIsOpen: false})}
          loadProcessos={this.loadProcessos}
        ></Modals>
      </>
        
    );
  }
}

