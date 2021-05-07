import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import api from '../services/api';


class BSTable extends React.Component {
  
  render() {
    var processadas = this.props.processadas;
    

    function addProducts(quantity) {
      const startId = quantity;
      for (let i = 0; i < quantity; i++) {
        const define = processadas[i];
        const id = startId + i;

        if (i < 7) {
          processadas.push({
            id: id,
            tomador: define.razaoTomador,
            prestador: define.razaoPrestador,
            nota: define.NumNota,
            emissao: define.Emissao,
            valor: define.valorTotal,
            vencimento: define.vencimento,
            expand: [ {
              cnpjTomador: define.cnpjTomador,
              cnpjPrestador: define.cnpjPrestador,
              serie: define.Serie,
              valorTr: define.valoTotalRecebido,
              ap: define.numAP,
              pi: define.numPI,
              status: define.status
            }]
          });
        } else {
          processadas.push({
            id: define.id_nf,
            tomador: define.razaoTomador,
            prestador: define.razaoPrestador,
            nota: define.NumNota,
            emissao: define.Emissao,
            valor: define.valorTotal,
            vencimento: define.vencimento,
          });
        }
      }
    }
    var retorno = this.processos.length;
    addProducts(retorno);
    if (this.props.data) {
      console.log('data', this.props.data)
      return (
        <BootstrapTable data={ this.props.data }>
          <TableHeaderColumn dataField='cnpjTomador' isKey={ true }>CNPJ Tomador</TableHeaderColumn>
          <TableHeaderColumn dataField='cnpjPrestador'>CNPJ Prestador</TableHeaderColumn>
          <TableHeaderColumn dataField='serie'>Serie</TableHeaderColumn>
          <TableHeaderColumn dataField='valorTr'>Total Recebido</TableHeaderColumn>
          <TableHeaderColumn dataField='ap'>AP</TableHeaderColumn>
          <TableHeaderColumn dataField='pi'>PI</TableHeaderColumn>
          <TableHeaderColumn dataField='status'>Status</TableHeaderColumn>
        </BootstrapTable>);
    } else {
      return (<p>?</p>);
    }
  }
}

class Processadas extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      processos: [],
    
    };
  }
  
  async componentDidMount(){
    const response = await api.get('processos');
  
    this.setState({ processos: response.data });
  
  }


  isExpandableRow(row) {
    console.log('rowid:', row.id)
    if (row.id < 7) return true;
    else return false;
  }
  
  expandComponent(row) {
    console.log('props processdas:', this.props.processdas);
    return (
      <BSTable data={ row.expand } processadas={this.props.processadas}/>
    );
  }

  render() {
    const processadas = this.state.processos;
    const options = {
      expandRowBgColor: 'rgb(242, 255, 163)'
    };
    return (
      <BootstrapTable data={ processadas }
        options={ options }
        expandableRow={ this.isExpandableRow }
        expandComponent={ this.expandComponent }
        expandColumnOptions={ { expandColumnVisible: true } }>
        <TableHeaderColumn isKey={true} dataField='id'>ID</TableHeaderColumn>
        <TableHeaderColumn dataField='tomador'>Razao Tomador</TableHeaderColumn>
        <TableHeaderColumn dataField='prestador'>Razão Prestador</TableHeaderColumn>
        <TableHeaderColumn dataField='nota'>Nº Nota</TableHeaderColumn>
        <TableHeaderColumn dataField='Serie'>Série</TableHeaderColumn>
        <TableHeaderColumn dataField='emissao'>Emissao</TableHeaderColumn>
        <TableHeaderColumn dataField='vencimento'>Vencimento</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default Processadas;