import React, { Component } from 'react';
import '../css/App.css';
import Header from './header';
import firebase from './Conexion';
import { Row,Grid,Col,Image,Carousel,Alert,Button } from 'react-bootstrap';


class Home extends Component {

  constructor (...args) {
    super (...args)
    this.logout = this.logout.bind(this);
    this.handleAlertDismiss = this.handleAlertDismiss.bind(this);
    this.handleAlertShow = this.handleAlertShow.bind(this);
    this.state     = { alertVisible: true}
    const mstate    = this;

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

        
        // User is signed in.
      } else {
        // No user is signed in.
        mstate.setState({username: "No login"})
      }
    });
  }

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
  getInitialState() {
    return {
      alertVisible: true
    };
  }
   handleAlertDismiss() {
    this.setState({alertVisible: false});
  }

  handleAlertShow() {
    this.setState({alertVisible: true});
  }

  render() {
    return (
      <div>
          <div id="contenedorP">
            <Carousel>
              <Carousel.Item>
                <img width={900} height={500} alt="900x500" src="/img/Assassin1.jpg"/>
                <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img width={900} height={500} alt="900x500" src="/img/Assassin2.jpg"/>
                <Carousel.Caption>
                  <h3>Second slide label</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
            
          </div>
      </div>
      )
  }
}



export default Home;