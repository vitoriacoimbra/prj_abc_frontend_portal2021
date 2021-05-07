/* eslint max-len: 0 */
import React from 'react';
import Menu from '../components/Menu';
import { MDBDataTable } from 'mdbreact';
import api from '../services/api';




export default class Processadas extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      processos: [],
    
    };
  }
  
  async componentDidMount() {
    const {data} = await api.get('processos');

    const processos = data.map(
        processo => Object.keys(processo).reduce(
            (obj, key) => {
                obj[key] = processo[key] != null && processo[key] !== '' ? processo[key] : ' ';
                return obj
            }, {}
        )
    );

    this.setState({processos});
}
  render() {
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
          label: 'Status',
          field: 'status',
          sort: 'asc',
          width: 150
        }
      ],
      rows: this.state.processos
  }
    return (
      <>
        <Menu/>
        <div className="paineldireito">
          <div className="painel container-fluid">
            <MDBDataTable striped bordered hover data={dados} responsive />
          </div>
        </div>
        
      </>
        
    );
  }
}

