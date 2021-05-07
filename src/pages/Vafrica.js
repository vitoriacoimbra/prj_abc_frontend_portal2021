import React, {Component} from 'react';
import Menu from '../components/Menu';
import {MDBDataTable} from 'mdbreact';
import api from '../services/api';
import ExcelValor from '../components/ExcelValor';
import MonthPicker from 'react-simple-month-picker';
import MonthPickerInput from 'react-month-picker-input';
import 'react-month-picker-input/dist/react-month-picker-input';


export default class Vafrica extends Component{
	
	state={
		processos: [],
    modalIsOpen: false,
    filtro:'',
    coluna: ''
	}

	async componentDidMount(){
    document.querySelector('input[type="search"]').setAttribute('placeholder', 'Buscar em todas as colunas')
		this.loadProcessos();
	}

	loadProcessos = async () =>{
		const {data} = await api.get('/valores/africa');

		const processos = data.map(
			processo => Object.keys(processo).reduce(
				(obj, key) =>{
					obj[key] = processo[key] != null && processo[key] !=='' ? processo[key]: ' ';
					return obj;
				}, {}
			)
		);

		this.setState({processos});
	
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
        data = await api.get(`/busca/valores?empresa=1&coluna=${coluna}&busca=${filtro}`);
        data = data.data
      }
  
      const processos = data.map(
        processo => Object.keys(processo).reduce(
            (obj, key) => {
                obj[key] = processo[key] != null && processo[key] !== '' ? processo[key] : ' ';
                return obj
            }, {}
        )
      )
      this.setState({processos});
    }
  }





	render(){


	const dados = {
      columns: [
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
        }
      ],
      rows: this.state.processos
  }



		return(
			<>
				<Menu pgv="active" activeA={true}/>
        <div className="paineldireito">
          <div className="painel container-fluid">
            <div className="row">
              <div className="col-sm-12 header">
                <div className="download">
                  <ExcelValor empresa="africa"/>
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
			</>
		)
	}
}