import React, { Component } from 'react';
import '../../css/App.css';
import Header from './../header';
import firebase from './../Conexion';
import CargaLista from './consultaCategorias';
import { FormGroup,ControlLabel,FormControl,Alert,ButtonToolbar,Button } from 'react-bootstrap';

var categorias = firebase.database().ref('categorias');
var mstate;


class crearCategoria extends Component {

  constructor (...args) {
    super (...args)

	this.state 					= { codigo: '...' }
	this.state 					= { nombre: '...' }
    this.habilitarEdicion 		= this.habilitarEdicion.bind(this);
    this.deshabilitarEdicion 	= this.deshabilitarEdicion.bind(this);
    this.guardarDatos 			= this.guardarDatos.bind(this);
	this.state 					= { camposDisabled: true }
    this.state     				= { alertVisible: true}
    this.handleInputChange 		= this.handleInputChange.bind(this);
    this.state = {
    listOfPositions: []
};

    
    mstate   					= this;

  }
/*
* Metodo que actualiza los parametros generales
*/
  guardarDatos(e){
    firebase.database().ref('categorias').push({
	    codigo: mstate.state.codigo,
	    nombre: mstate.state.nombre
	});
    this.setState({camposDisabled: true});
    this.setState({codigo: ''});
    this.setState({nombre: ''});
  }
  habilitarEdicion(){
  	this.setState({camposDisabled: false});
  }
  deshabilitarEdicion(){
  	this.setState({camposDisabled: true});
  }

  onChange(e) {
  	console.log(e.target.value)
  }

componentWillMount(){
    this.state 		= { camposDisabled: true }
}

handleInputChange(event) {
	const target = event.target;
	const value = target.type === 'checkbox' ? target.checked : target.value;
	const name = target.name;
	console.log(name);
	this.setState({
	  [name]: value
	});
}

  render() {
    return (
      <div>
          <div id="contenedorP">
            <form>
            <center><h2>Nueva Categoría</h2><br/></center>
			        <FormGroup
			          controlId="formBasicText"
			        >
			          <ControlLabel>Código:</ControlLabel>
			          <FormControl
			          	name="codigo"
			            type="text"
			            value={this.state.codigo}
			            placeholder="Ingrese codigo"
			            disabled={this.state.camposDisabled}
			            onChange={this.handleInputChange}
			          />
			        </FormGroup>
			        <FormGroup
			          controlId="formBasicText2"
			        >
			          <ControlLabel>Nombre:</ControlLabel>
			          <FormControl
			          	name="nombre"
			            type="text"
			            value={this.state.nombre}
			            placeholder="Ingrese Nombre"
			            disabled={this.state.camposDisabled}
			            onChange={this.handleInputChange}
			          />
			        </FormGroup>
			        
			        <ButtonToolbar>
				        <Button bsStyle="primary" onClick={this.habilitarEdicion} disabled={!this.state.camposDisabled}>
					      Editar
					    </Button>
					    <Button bsStyle="success" onClick={this.guardarDatos} disabled={this.state.camposDisabled}>
					      Guardar
					    </Button>
					    <Button bsStyle="danger" onClick={this.deshabilitarEdicion} disabled={this.state.camposDisabled}>
					      Cancelar
					    </Button>
				    </ButtonToolbar>
		      </form>
		      <div>
		      	<CargaLista />
		      </div>
          </div>
      </div>
      )
  }
}



export default crearCategoria;