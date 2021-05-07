import React from 'react';
import { Link } from "react-router-dom";
import IosKeypadOutline from 'react-ionicons/lib/IosKeypadOutline';
import IosSettingsOutline from 'react-ionicons/lib/IosSettingsOutline';
import IosChatboxesOutline from 'react-ionicons/lib/IosChatboxesOutline';
import IosCreateOutline from 'react-ionicons/lib/IosCreateOutline';
import MdMedical from 'react-ionicons/lib/MdMedical';
import IosCloseCircleOutline from 'react-ionicons/lib/IosCloseCircleOutline';
import Toggle from './Toggle';

function MenuTribal(props) {
  return (
    <Toggle empresa="Tribal" active={props.active}>
      <ul className="dmenu">
        <li className={"nav-item " + props.pgpt}><Link to="/tribal/processadas"><IosSettingsOutline /> Processadas</Link></li>
        <li className={"nav-item " + props.pgext}><Link to="/tribal/excessoes"><MdMedical /> Exceções</Link></li>
        <li className={"nav-item " + props.pgedt}><Link to="/tribal/atualizar"><IosCreateOutline /> Editar</Link></li>
        <li className={"nav-item " + props.pgvt}><Link to="/tribal/valores"><IosCreateOutline /> Valores Divergentes</Link></li>
      </ul>
  
    </Toggle>
  );
}

export default MenuTribal;