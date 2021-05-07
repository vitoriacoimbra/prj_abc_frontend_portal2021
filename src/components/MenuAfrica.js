import React from 'react';
import { Link } from "react-router-dom";
import IosKeypadOutline from 'react-ionicons/lib/IosKeypadOutline';
import IosSettingsOutline from 'react-ionicons/lib/IosSettingsOutline';
import IosChatboxesOutline from 'react-ionicons/lib/IosChatboxesOutline';
import IosCreateOutline from 'react-ionicons/lib/IosCreateOutline';
import MdMedical from 'react-ionicons/lib/MdMedical';
import IosCloseCircleOutline from 'react-ionicons/lib/IosCloseCircleOutline';
import Toggle from './Toggle';

function MenuAfrica(props) {
  return (
    <Toggle empresa="África" active={props.active}>
      <ul className="dmenu">
        <li className={"nav-item " + props.pgp}><Link to="/africa/processadas"><IosSettingsOutline /> Processadas</Link></li>
        <li className={"nav-item " + props.pgex}><Link to="/africa/excessoes"><MdMedical /> Exceções</Link></li>
        <li className={"nav-item " + props.pged}><Link to="/africa/atualizar"><IosCreateOutline /> Editar</Link></li>
        <li className={"nav-item " + props.pgv}><Link to="/africa/valores"><IosCreateOutline /> Valores Divergentes</Link></li>
      </ul>
    </Toggle>
  )

}

export default MenuAfrica;