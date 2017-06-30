/*
* Componente de Formulario para gestion de parametros generales
* @Author: Erik Araujo
*/
import React, { Component } from 'react';
import '../../css/App.css';
import Header from './../header';
import firebase from './../Conexion';
import { FormGroup,ControlLabel,FormControl,Alert,ButtonToolbar,Button } from 'react-bootstrap';

const refcorreoAdmin 	= firebase.database().ref().child('parametrosSistema').child('correoAdmin') 
const refdireccionIp 	= firebase.database().ref().child('parametrosSistema').child('direccionIp') 
const reflinkDescargas 	= firebase.database().ref().child('parametrosSistema').child('linkDescargas') 
const reflogoApp 		= firebase.database().ref().child('parametrosSistema').child('logoApp') 
const tituloRef 		= firebase.database().ref().child('parametrosSistema').child('nombreApp') 
var mstate;
class Administracion extends Component {

  constructor (...args) {
    super (...args)

	this.state 					= { correoAdmin: '...' }
	this.state 					= { direccionIp: '...' }
	this.state 					= { linkDescargas: '...' }
	this.state 					= { logoApp: '...' }
	this.state 					= { nombreApp: '...' }
    this.habilitarEdicion 		= this.habilitarEdicion.bind(this);
    this.deshabilitarEdicion 	= this.deshabilitarEdicion.bind(this);
    this.actualizarDatos 		= this.actualizarDatos.bind(this);
	this.state 					= { camposDisabled: true }
    this.state     				= { alertVisible: true}
    this.handleInputChange 		= this.handleInputChange.bind(this);
    
    mstate   					= this;

  }
/*
* Metodo que actualiza los parametros generales
*/
  actualizarDatos(e){
    firebase.database().ref('parametrosSistema').update({
	    correoAdmin: mstate.state.correoAdmin,
	    direccionIp: mstate.state.direccionIp,
	    linkDescargas : mstate.state.linkDescargas,
	    logoApp: mstate.state.logoApp,
	    nombreApp: mstate.state.nombreApp
	});
    this.setState({camposDisabled: true});
  }
  habilitarEdicion(){
  	this.setState({camposDisabled: false});
  }
  deshabilitarEdicion(){
  	this.setState({camposDisabled: true});
  }

  onChange(e) {
  	console.log(e.target.value)
    /*this.setState({text: e.target.value});*/
  }

componentWillMount(){
    this.state 		= { camposDisabled: true }

tituloRef.on('value', snapshot => {  
	        console.log(snapshot.val());
	        this.setState({
	          nombreApp: snapshot.val()
	        })
	    });
    refcorreoAdmin.on('value', snapshot => {  
	        console.log(snapshot.val());
	        mstate.setState({
	          correoAdmin: snapshot.val()
	        })
	    });
    refdireccionIp.on('value', snapshot => {  
	        console.log(snapshot.val());
	        this.setState({
	          direccionIp: snapshot.val()
	        })
	    });
    reflinkDescargas.on('value', snapshot => {  
	        console.log(snapshot.val());
	        this.setState({
	          linkDescargas: snapshot.val()
	        })
	    });
    reflogoApp.on('value', snapshot => {  
	        console.log(snapshot.val());
	        this.setState({
	          logoApp: snapshot.val()
	        })
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

  render() {
    return (
      <div>
          <div id="contenedorP">
            <form>
            <center><h2>Parámetros Generales</h2><br/></center>
			        <FormGroup
			          controlId="formBasicText"
			        >
			          <ControlLabel>Correo Administracion:</ControlLabel>
			          <FormControl
			          	name="correoAdmin"
			            type="text"
			            value={this.state.correoAdmin}
			            placeholder="Ingrese Correo"
			            disabled={this.state.camposDisabled}
			            onChange={this.handleInputChange}
			          />
			        </FormGroup>
			        <FormGroup
			          controlId="formBasicText2"
			        >
			          <ControlLabel>Direcion ip:</ControlLabel>
			          <FormControl
			          	name="direccionIp"
			            type="text"
			            value={this.state.direccionIp}
			            placeholder="Ingrese Direcion ip"
			            disabled={this.state.camposDisabled}
			            onChange={this.handleInputChange}
			          />
			        </FormGroup>
			        <FormGroup
			          controlId="formBasicText"
			        >
			          <ControlLabel>Link descargas:</ControlLabel>
			          <FormControl
			          	name="linkDescargas"
			            type="text"
			            value={this.state.linkDescargas}
			            placeholder="Ingrese Link"
			            disabled={this.state.camposDisabled}
			            onChange={this.handleInputChange}
			          />
			        </FormGroup>
			        <FormGroup
			          controlId="formBasicText2"
			        >
			          <ControlLabel>Url Logo:</ControlLabel>
			          <FormControl
			          	name="logoApp"
			            type="text"
			            value={this.state.logoApp}
			            placeholder="Ingrese Url"
			            disabled={this.state.camposDisabled}
			            onChange={this.handleInputChange}
			          />
			        </FormGroup>
			        <FormGroup
			          controlId="formBasicText2"
			        >
			          <ControlLabel>Nombre App:</ControlLabel>
			          <FormControl
			          	name="nombreApp"
			            type="text"
			            value={this.state.nombreApp}
			            placeholder="Ingrese Nombre App"
			            disabled={this.state.camposDisabled}
			            onChange={this.handleInputChange}
			          />
			        </FormGroup>
			        <ButtonToolbar>
				        <Button bsStyle="primary" onClick={this.habilitarEdicion} disabled={!this.state.camposDisabled}>
					      Editar
					    </Button>
					    <Button bsStyle="success" onClick={this.actualizarDatos} disabled={this.state.camposDisabled}>
					      Guardar
					    </Button>
					    <Button bsStyle="danger" onClick={this.deshabilitarEdicion} disabled={this.state.camposDisabled}>
					      Cancelar
					    </Button>
				    </ButtonToolbar>
		      </form>
          </div>
      </div>
      )
  }
}



export default Administracion;