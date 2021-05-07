import React from 'react';
import { Link } from "react-router-dom";
import IosKeypadOutline from 'react-ionicons/lib/IosKeypadOutline';
import IosSettingsOutline from 'react-ionicons/lib/IosSettingsOutline';
import IosChatboxesOutline from 'react-ionicons/lib/IosChatboxesOutline';
import IosCreateOutline from 'react-ionicons/lib/IosCreateOutline';
import MdMedical from 'react-ionicons/lib/MdMedical';
import IosCloseCircleOutline from 'react-ionicons/lib/IosCloseCircleOutline';
import Toggle from './Toggle';

function MenuSunset(props) {
  return (
    <Toggle empresa="Sunset" active={props.active}>
      <ul className="dmenu">
        <li className={"nav-item " + props.pgps}><Link to="/sunset/processadas"><IosSettingsOutline /> Processadas</Link></li>
        <li className={"nav-item " + props.pgexs}><Link to="/sunset/excecoes"><MdMedical /> Exceções</Link></li>
        <li className={"nav-item " + props.pgeds}><Link to="/sunset/atualizar"><IosCreateOutline /> Editar</Link></li>
        <li className={"nav-item " + props.pgvs}><Link to="/sunset/valores"><IosCreateOutline /> Valores Divergentes</Link></li>
      </ul>
  
    </Toggle>
  );

}

export default MenuSunset;