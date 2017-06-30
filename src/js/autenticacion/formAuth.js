import React, { Component } from 'react';
import firebase from '../Conexion';
import ReactDOM from 'react-dom';
import Home from '../home';
import App from '../../App';
import { FormGroup,ControlLabel,FormControl,Alert,ButtonToolbar,Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

class FormAuth extends Component {
	constructor (...args) {
	    super (...args)
	     this.state 		= { tituloApp: '...' }
	     this.state 		= { correo: '' }
	     this.state 		= { pass: '' }
	     this.state 		= { msgError: '' }
	     this.login 		= this.login.bind(this);
	     this.state 		= { isLogin: false}
	     this.loginGoogle 	= this.loginGoogle.bind(this);
	     this.logout 		= this.logout.bind(this);
    	 this.handleInputChange 		= this.handleInputChange.bind(this);
	     const mstate 		= this;
	     firebase.auth().onAuthStateChanged(function(user) {
		  if (user) {
		  	console.log(user)
			mstate.setState({msgError: user.email})
			mstate.setState({ isLogin: true});
		    // User is signed in.
		  } else {
		    // No user is signed in.
		    mstate.setState({msgError: "No login3"})
		    /*ReactDOM.render(
			  <App />,
			  document.getElementById('root')
			);*/
		  }
		});
	     
	}

	/*
	* Metodo que inicia sesion por correo
	*/
	login(e){
		var email = this.state.correo
		var password = this.state.pass
		const ref = this

		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		  // Handle Errors here.
		  alert(error.message);
		  var errorMessage = error.message;
		  alert(errorMessage);
		  ref.setState({
	          msgError: errorMessage
	        })
		  // ...
		});

	}
	/*
	* Metodo que inicia sesion con google
	*/
	loginGoogle(e){
		const ref = this

		var provider = new firebase.auth.GoogleAuthProvider();

		firebase.auth().signInWithPopup(provider).then(function(result) {
		  // This gives you a Google Access Token. You can use it to access the Google API.
		  var token = result.credential.accessToken;
		  // The signed-in user info.
		  var user = result.user;
		  // ...
		}).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // The email of the user's account used.
		  var email = error.email;
		  // The firebase.auth.AuthCredential type that was used.
		  var credential = error.credential;
		  // ...
		});

	}

	/*
	* Metodo que cerrar sesion
	*/
	logout(e){
		const ref = this
		firebase.auth().signOut().then(function() {
			console.log("logout");
	  		// Sign-out successful.
		}, function(error) {
			console.log(error);
			ref.setState({
	          msgError: error
	        })
	  		// An error happened.
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
  	console.log(this.state.isLogin)
  	if (this.state.isLogin){
  		return(<Redirect to='/SesionUser'/>)
  	}else{
	    return (
	        <div>
	          <div id="contenedorP">
	          	<center><h2>Iniciar Sesión</h2></center>
	          	<form>
			        <FormGroup
			          controlId="formBasicText"
			        >
			          <ControlLabel>Correo:</ControlLabel>
			          <FormControl
			          	name="correo"
			            type="text"
			            value={this.state.correo}
			            onChange={this.handleInputChange}
			            placeholder="Ingrese Correo"
			          />
			        </FormGroup>
			        <FormGroup
			          controlId="formBasicText2"
			        >
			          <ControlLabel>Contraseña:</ControlLabel>
			          <FormControl
			          	name="pass"
			            type="password"
			            value={this.state.pass}
			            onChange={this.handleInputChange}
			            placeholder="Ingrese Contraseña"
			          />
			        </FormGroup>

			        <ButtonToolbar>
				        <Button onClick={this.login}>
					      Login
					    </Button>
					    <Button bsStyle="primary" onClick={this.loginGoogle}>
					      Login Google
					    </Button>
				    </ButtonToolbar>
		      </form>
	          </div>
	      </div>
	      )
    }
  }
}

export default FormAuth;