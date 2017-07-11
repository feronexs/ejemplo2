import React, { Component } from 'react';
import '../../css/App.css';
import Header from './../header';
import firebase from './../Conexion';
import CrearCate from './crearCategoria.jsx';
import { FormGroup,ControlLabel,FormControl,Alert,ButtonToolbar,Button, Modal, Popover, Tooltip, OverlayTrigger } from 'react-bootstrap';

var categorias = firebase.database().ref('categorias');
var mstate;


class CargaLista extends Component {

  constructor(){
	    super();
	    this.state = {
		    listOfPositions: []
		}; 
    mstate   					= this;
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

		categorias.on('child_changed', snap => {
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

	componentWillMount(){
	}
	
	render() {


		function Example(props){
			    return (
			      <div >
			        
			        <Button
			          bsStyle="primary"
			          bsSize="large"
			          onClick={props.open}
			        >
			          Launch demo modal
			        </Button>

			        <Modal show={props.showModal} onHide={props.close}>
			          <Modal.Header closeButton>
			            <Modal.Title>Modal heading</Modal.Title>
			          </Modal.Header>
			          <Modal.Body>
			           <CrearCate codigo={props.codigo} nombre={props.nombre}/>
			          </Modal.Body>
			          <Modal.Footer>
			            <Button onClick={props.close}>Close</Button>
			          </Modal.Footer>
			        </Modal>
			      </div>
			    );
			  }


    	const listOfPositions = this.state.listOfPositions.map(elemento => 
	        <li key={elemento.id}><a id={elemento.id} href="#" onClick={this.props.cargarCamposActualizar}>{elemento.nombre}</a></li>
	    );
	    return (

	    	<div className="contenedorP">
		    	<h2>Lista de Categorías</h2>
		        <ul>{listOfPositions}</ul>
          </div>
	    );
	}
}




export default CargaLista;