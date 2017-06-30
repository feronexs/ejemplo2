import React, { Component } from 'react';
import firebase from './Conexion';
import { Navbar,Nav,NavItem,NavDropdown,MenuItem,Row,Grid,Col,Image } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';

const tituloRef = firebase.database().ref().child('parametrosSistema').child('nombreApp') 

class Header extends Component {
	constructor (...args) {
	    super (...args)
	     this.state 		= { tituloApp: '...' }
	     this.state 		= { username: '...' }
	     this.state 		= { foto: ''}
	     this.logout 		= this.logout.bind(this);
	     this.handleSelect 	= this.handleSelect.bind(this);
	     this.state = { isLogin: false}
	     const mstate 		= this;

	     tituloRef.on('value', snapshot => {  
	        console.log(snapshot.val());
	        this.setState({
	          tituloApp: snapshot.val()
	        })
	    })
	     firebase.auth().onAuthStateChanged(function(user) {
		  if (user) {
		  	console.log(user)
		  	var user2 = firebase.auth().currentUser;
			var name, email, photoUrl, uid;

			if (user != null) {
			  name = user2.displayName;
			  email = user2.email;
			  photoUrl = user2.photoURL;
			  uid = user2.uid;  // The user's ID, unique to the Firebase project. Do NOT use
			                   // this value to authenticate with your backend server, if
			                   // you have one. Use User.getToken() instead.
			}
			mstate.setState({username: email})
			mstate.setState({foto: photoUrl})
      		mstate.setState({ isLogin: true});

		    
		    // User is signed in.
		  } else {
		    // No user is signed in.
		    mstate.setState({username: "No login"});
        	mstate.setState({ isLogin: false});
		  }
		});
	}

	componentWillMount(){
    console.log('Mount');
    tituloRef.on('value', snapshot => {  
	        console.log(snapshot.val());
	        this.setState({
	          tituloApp: snapshot.val()
	        })
	    })
	}
	componentWillUnmount(){
	    console.log('Unmount');
	}	
	handleSelect(eventKey) {
    	event.preventDefault();
    	//alert(`selected ${eventKey}`);
    	if(eventKey === 5){
    		this.logout();
    	}
  	}

  	logout(){
	    const ref = this
	    firebase.auth().signOut().then(function() {
	      console.log("logoutHeder");
	        // Sign-out successful.
	    }, function(error) {
	      console.log(error);
	      ref.setState({
	            msgError: error
	          })
	        // An error happened.
	    });
	  }

	  validaLogin(){
	  	if(this.state.isLogin){
		  	return (<NavItem eventKey={5} href="#">logout</NavItem>)
		}else{
			return ("")
		}
	  }

  render() {
	    return (
	        <Navbar fixedTop inverse collapseOnSelect onSelect={this.handleSelect}>
			    <Navbar.Header>
			      <Navbar.Brand>
			        <a href="/">{this.state.tituloApp}</a>
			      </Navbar.Brand>
			      <Navbar.Toggle />
			    </Navbar.Header>
			    <Navbar.Collapse>
			      <Nav>
			        <NavItem eventKey={1} href="#"><Link to="/adminGeneral">Administracion</Link></NavItem>
			        <NavDropdown eventKey={3} title="Categorias" id="basic-nav-dropdown">
			          <MenuItem eventKey={3.1}><Link to="/crearCategorias">Nueva</Link></MenuItem>
			          <MenuItem eventKey={3.2}><Link to="/consultaCategorias">Consulta</Link></MenuItem>
			          <MenuItem eventKey={3.3}>Something else here</MenuItem>
			          <MenuItem divider />
			          <MenuItem eventKey={3.3}>Separated link</MenuItem>
			        </NavDropdown>
			        <NavDropdown eventKey={3} title="Grupos" id="basic-nav-dropdown">
			          <MenuItem eventKey={3.1}>Action</MenuItem>
			          <MenuItem eventKey={3.2}>Another action</MenuItem>
			          <MenuItem eventKey={3.3}>Something else here</MenuItem>
			          <MenuItem divider />
			          <MenuItem eventKey={3.3}>Separated link</MenuItem>
			        </NavDropdown>
			        <NavDropdown eventKey={3} title="Notificaciones" id="basic-nav-dropdown">
			          <MenuItem eventKey={3.1}>Action</MenuItem>
			          <MenuItem eventKey={3.2}>Another action</MenuItem>
			          <MenuItem eventKey={3.3}>Something else here</MenuItem>
			          <MenuItem divider />
			          <MenuItem eventKey={3.3}>Separated link</MenuItem>
			        </NavDropdown>
			        <NavDropdown eventKey={3} title="Pedidos" id="basic-nav-dropdown">
			          <MenuItem eventKey={3.1}>Action</MenuItem>
			          <MenuItem eventKey={3.2}>Another action</MenuItem>
			          <MenuItem eventKey={3.3}>Something else here</MenuItem>
			          <MenuItem divider />
			          <MenuItem eventKey={3.3}>Separated link</MenuItem>
			        </NavDropdown>
			      </Nav>
			      <Nav pullRight>
			      
			        <NavItem eventKey={4} href="#">{this.state.username}</NavItem>
			        {this.validaLogin()}
			        
			      </Nav>
			    </Navbar.Collapse>
		  </Navbar>
	      )
  }
}

export default Header;