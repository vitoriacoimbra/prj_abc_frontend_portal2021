import React, { Component } from 'react';

import MdBriefcase from 'react-ionicons/lib/MdBriefcase';
import IosArrowDown from 'react-ionicons/lib/IosArrowDown';
import IosHeart from 'react-ionicons/lib/IosHeart';

export default class Toggle extends Component{
  state = {
    on: false,
  }
toggle = () =>{
  this.setState({
    on: !this.state.on
  })
}

async componentDidMount() {
  if(this.props.active){
    this.setState({
      on: true
    })
  }

}



  render(){
    let icone;
    if(this.props.empresa ==="Universal"){
      icone = <IosHeart />
    }else{
      icone = <MdBriefcase />
    }
    return(
      <li onClick={this.toggle} className="dropdown">
         <span className="item">
            {icone} {this.props.empresa} <IosArrowDown  className="float-right"/>
          </span> 
        {this.state.on && this.props.children}
      </li>
    );
  }
}
