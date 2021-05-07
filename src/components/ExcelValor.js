import React from "react";
import ReactExport from "react-export-excel";
import api from '../services/api';


class Download extends React.Component {
	 state={
	 	processos:[]
	 }


	 async componentDidMount(){
		let empresa = this.props.empresa
			const {data} = await api.get(`excel/valores/${empresa}`);
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
	loadExcel = async e=>{
		e.preventDefault();

		let empresa = this.props.empresa
			const {data} = await api.get(`excel/valores/${empresa}`);
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
		const ExcelFile = ReactExport.ExcelFile;
		const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
		const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;		
		return (
      <ExcelFile element={<button className="btn btn-primary" onClick={e=>this.loadExcel(e)}>Download Processos</button>}>
        <ExcelSheet data={this.state.processos} name="Processadas">
          <ExcelColumn label="ID NF" value="id_nf"/>
          <ExcelColumn label="Razão Tomador" value="razaoTomador"/>
          <ExcelColumn label="Razão Prestador" value="razaoPrestador"/>
          <ExcelColumn label="Nº Nota" value="NumNota"/>
					<ExcelColumn label="Emissão" value="Emissao"/>
					<ExcelColumn label="Valor Total" value="valorTotal"/>
					<ExcelColumn label="Valor Total Recebido" value="valorTotalRecebido"/>
					<ExcelColumn label="Vencimento" value="vencimento"/>
					<ExcelColumn label="AP" value="numAP"/>
					<ExcelColumn label="PI" value="numPI"/>
					<ExcelColumn label="Status" value="status"/>
					<ExcelColumn label="Caminho Absoluto" value="caminhoAbsoluto"/>
					<ExcelColumn label="Descrição do Erro" value="descricaoErro"/>
					<ExcelColumn label="Data Leitura" value="dataLeitura"/>
					<ExcelColumn label="Data Lançamento" value="dataLancamento"/>
					<ExcelColumn label="Data Upload" value="dataUpload"/>
        </ExcelSheet>
      </ExcelFile>
    );
  }
}
export default Download;