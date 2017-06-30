import React, { Component } from 'react';
import './css/App.css';
import Header from './js/header';
import FormAuth2 from './js/autenticacion/formAuth';
import firebase from './js/Conexion';
import {  Switch, Route, Link , Redirect} from 'react-router-dom'


import Home             from './js/home.js';
import administracion   from './js/administracion/adminGeneral.js';

/*Categorias*/
import actCat           from './js/categorias/actualizarCategoria.js';
import consultaCat      from './js/categorias/consultaCategorias.js';
import elimCat          from './js/categorias/eliminarCategoria.js';
import crearCat         from './js/categorias/crearCategoria.js';
/*Categorias*/

/*Grupos Usuarios*/
import actGpr           from './js/gruposUsuarios/actualizarGrupo.js';
import misGrp           from './js/gruposUsuarios/misgrupos.js';
import elimGpr          from './js/gruposUsuarios/eliminarGrupo.js';
import crearGpr         from './js/gruposUsuarios/crearGrupo.js';
/*Grupos Usuarios*/

/*Notificaciones*/
import misNotifi        from './js/notificaciones/misNotificaciones.js';
import elimNotifi       from './js/notificaciones/eliminarNotificacion.js';
import crearNotifi      from './js/notificaciones/crearNotificacion.js';
/*Notificaciones*/

/*Pedidos*/
import actPedido         from './js/pedidos/actualizarPedido.js';
import misPedidos        from './js/pedidos/misPedidos.js';
import cancelarPedido    from './js/pedidos/cancelarPedido.js';
import crearPedido       from './js/pedidos/crearPedido.js';
import consultaPedido    from './js/pedidos/consultaPedidos.js';
/*Pedidos*/

const nameRef = firebase.database().ref().child('parametrosSistema').child('nombreApp') 


  const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={FormAuth2}/>
      <Route path='/SesionUser' component={Home}/>
      <Route path='/adminGeneral' component={administracion}/>
      <Route path='/crearCategorias' component={crearCat}/>
      <Route path='/consultaCategorias' component={consultaCat}/>
    </Switch>
  </main>
)


class App extends Component {

  constructor (...args) {
    super (...args)
    this.state  = { tituloApp: '' }
    this.onBlur = this.onBlur.bind(this);
    this.state  = { isLogin: false}
    nameRef.on('value', snapshot => {  
        this.setState({
          tituloApp: snapshot.val()
        })
    })
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
    nameRef.on('value', snapshot => {  
        this.setState({
          tituloApp: snapshot.val()
        })
    })
  }
  componentWillUnmount(){
    console.log('Unmount');
  }
 onBlur(e) {
  console.log(this.input.value)
    nameRef.set(e.target.value);
  }

  render() {
    console.log(this.state.isLogin)
    if (this.state.isLogin){
      return (
        <div>
          <Header />
          <Main />
        </div>
      )
    }else{
    return (
        <div>
          <Header />
          <FormAuth2 />
        </div>
      )
  }
  }
}



export default App;
