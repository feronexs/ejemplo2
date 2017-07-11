import React, { Component } from 'react';
import '../../css/App.css';
import Header from './../header';
import firebase from './../Conexion';
import CargaLista from './consultaCategorias';
import { FormGroup,ControlLabel,FormControl,Alert,ButtonToolbar,Button,Glyphicon } from 'react-bootstrap';

var categorias = firebase.database().ref('categorias');
var mstate;


class crearCategoria extends Component {

  constructor (...args) {
    super (...args)
console.log(this.props.codigo);
	this.state 					= { idCat: '' }
	this.state 					= { codigo: '' }
	this.state 					= { nombre: '' }
    this.limpiarCampos 			= this.limpiarCampos.bind(this);
    this.habilitarEdicion 		= this.habilitarEdicion.bind(this);
    this.deshabilitarEdicion 	= this.deshabilitarEdicion.bind(this);
    this.guardarDatos 			= this.guardarDatos.bind(this);
	this.state 					= { camposDisabled: true }
	this.state 					= { esNuevo: false }
	this.state 					= { esViejo: false }
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
  /*
* Metodo que actualiza los parametros generales
*/
  guardarDatosActualizados(e){
    firebase.database().ref('categorias/' + mstate.state.idCat).set({
	    codigo: mstate.state.codigo,
	    nombre: mstate.state.nombre
	  });
    this.setState({camposDisabled: true});
    this.setState({codigo: ''});
    this.setState({nombre: ''});
  }
  /*
* Metodo que elimina los parametros generales
*/
  eliminarDatosActualizados(e){
    firebase.database().ref('categorias/' + mstate.state.idCat).set(null);
    this.setState({camposDisabled: true});
    this.setState({codigo: ''});
    this.setState({nombre: ''});
    this.limpiarCampos();

  }
  habilitarEdicion(){
  	if(this.state.codigo == undefined || this.state.codigo == ''){
  		console.log(this.state.codigo);
  		this.setState({esNuevo: true});
  		this.setState({esViejo: false});
  	}else{
		this.setState({esNuevo: false});
  		this.setState({esViejo: true});
  	}
  	this.setState({camposDisabled: false});
  }
  deshabilitarEdicion(){
  	this.setState({camposDisabled: true});
  	this.setState({esNuevo: false});
  	this.setState({esViejo: false});
  }

  limpiarCampos(){
  	this.setState({idCat: undefined});
	this.setState({codigo: undefined});
	this.setState({nombre: undefined});
	this.deshabilitarEdicion();
  }

  onChange(e) {
  	console.log(e.target.value)
  }

componentWillMount(){
    this.state 		= { camposDisabled: true }
}

cargarCamposActualizar(e){
	e.preventDefault();
	var id = e.target.id;
	return firebase.database().ref('categorias/' + id).once('value').then(function(snapshot) {
		console.log(snapshot.val().id);
		console.log(snapshot.val().codigo);
	  	console.log(snapshot.val().nombre);
	  	mstate.setState({ idCat: id });
	  	mstate.setState({ codigo: snapshot.val().codigo });
	  	mstate.setState({ nombre: snapshot.val().nombre });
	});
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


getValidationNombre(){
    console.log('this is:', event.target);
    const target = event.target;
	const value = target.type === 'checkbox' ? target.checked : target.value;
	const name = target.name;
    if (target.value !== undefined){

    const length = target.value;
    console.log(length)
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';

    }
  }

getValidationState() {
    console.log('this is:', event.target);
    const target = event.target;
	const value = target.type === 'checkbox' ? target.checked : target.value;
	const name = target.name;
    if (target.value !== undefined){

    const length = target.value;
    console.log(length)
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';

    }
  }
  render() {
    return (
     <div className="contenedorP">
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
			            validationState={this.getValidationState()}
			          />
      				<FormControl.Feedback />
			        </FormGroup>
			        <FormGroup
			          controlId="formBasicText2"
			            validationState={this.getValidationNombre()}
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
      				<FormControl.Feedback />
			        </FormGroup>
			        
			        <ButtonToolbar>
				        <Button bsStyle="primary" onClick={this.habilitarEdicion} disabled={!this.state.camposDisabled} >
					      Editar
					    </Button>
					    <Button bsStyle="success" onClick={this.guardarDatos} disabled={!this.state.esNuevo}>
					      Guardar
					    </Button>
					    <Button bsStyle="warning" onClick={this.guardarDatosActualizados} disabled={!this.state.esViejo}>
					      Actualizar
					    </Button>
					    <Button bsStyle="danger" onClick={this.eliminarDatosActualizados} disabled={!this.state.esViejo}>
					      Eliminar
					    </Button>
					    <Button bsStyle="danger" onClick={this.deshabilitarEdicion} disabled={this.state.camposDisabled}>
					      Cancelar
					    </Button>
					    <Button type='submit' bsStyle="success" onClick={this.limpiarCampos} disabled={this.state.camposDisabled}>
					      Nuevo
					    </Button>
				    </ButtonToolbar>
		      </form>
		      <div>
		      	<CargaLista cargarCamposActualizar={this.cargarCamposActualizar} />
		      </div>
          </div>
      )
  }
}



export default crearCategoria;