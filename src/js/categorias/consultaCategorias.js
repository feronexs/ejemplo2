import React, { Component } from 'react';
import '../../css/App.css';
import Header from './../header';
import firebase from './../Conexion';
import { FormGroup,ControlLabel,FormControl,Alert,ButtonToolbar,Button } from 'react-bootstrap';

var categorias = firebase.database().ref('categorias');
var mstate;


class CargaLista extends Component {

  constructor(){
	    super();
	    this.state = {
		    listOfPositions: []
		};
	}

	componentDidMount(){
		categorias.on('child_added', snap => {
		    const previousList = this.state.listOfPositions;
		    previousList[previousList.length] = ({
		    	id: snap.key,
		        nombre: snap.val().nombre
		    });
		    this.setState({
		        listOfPositions: previousList
		    });
		});
	  
	}


	render() {
    const listOfPositions = this.state.listOfPositions.map(position => 
	        <li key={position.id} >{position.nombre}</li>
	    );
	    return (

	    	<div>
          <div id="contenedorP">
            
		    	<h2>Lista de Categorías</h2>
		        <ul>{listOfPositions}</ul>
          </div>
      </div>
	    );
	}
}




export default CargaLista;