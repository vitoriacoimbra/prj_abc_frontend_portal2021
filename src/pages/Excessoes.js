/* eslint max-len: 0 */
import React from 'react';
import Menu from '../components/Menu';
import { MDBDataTable } from 'mdbreact';
import api from '../services/api';
import {CopyToClipboard} from 'react-copy-to-clipboard';



export default class Excessao extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      excessao: [],
    
    };
  }

  async componentDidMount() {
    const {data} = await api.get('excessao');

    const excessao = data.map(
      excessoes => Object.keys(excessoes).reduce(
          (obj, key) => {
              obj[key] = excessoes[key] != null && excessoes[key] !== '' ? excessoes[key] : ' ';
              return obj
          }, {}
      )
  ).map(
    excessoes => ({
        ...excessoes,
        caminhoAbsoluto:excessoes.caminhoAbsoluto !== ' '?(
          <CopyToClipboard text={excessoes.caminhoAbsoluto} >
          <button className="btn btn-outline-success">{excessoes.caminhoAbsoluto}</button>
        </CopyToClipboard>
        ): ' '
    })
);

    this.setState({excessao});
}
  
  render() {
    const dados = {
      columns: [
        {
          label: '#',
          field: 'id_excecao',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Data Erro',
          field: 'data_erro',
          sort: 'asc',
          width: 270
        },
        {
          label: 'Tipo Erro',
          field: 'tipoErro',
          sort: 'asc',
          width: 200
        },
        {
          label: 'Descrição Erro',
          field: 'descricaoErro',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Caminho Absoluto',
          field: 'caminhoAbsoluto',
          sort: 'asc',
          width: 150
        }
      ],
      rows: this.state.excessao
  }
    return (
      <>
        <Menu/>
        <div className="paineldireito">
          <div className="painel container-fluid">
            <MDBDataTable striped bordered hover data={dados} />
          </div>
        </div>
        
      </>
        
    );
  }
}