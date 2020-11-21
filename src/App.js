import './App.css';
import React, {Component} from 'react'
import ImageUploader from './components/ImageUploader'
import Locator from './components/locator';
import Navbar from './containers/Navbar'
import Homepage from './containers/Homepage'
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';
import Login from './containers/Login'
import Signup from './containers/Signup'
import {connect} from 'react-redux'

class App extends Component{
  render(){
    console.log(this.props.user)
    return (
      <Router>
        <div className="App">
          <Navbar/>
          
          <Route exact path="/" render={()=> <Homepage/>}/>
          <Route exact path="/signup" render={()=> (this.props.user.length!==0 ? <Redirect to="/"/>:<Signup/>)}/>
          <Route path="/login" render={()=>(this.props.user.length!==0 ? <Redirect to="/"/>:<Login/>)}/>
        </div>
      </Router>
    );
  }
}

const msp = state =>{
  return {
    user: state.user
  }
}

export default connect(msp)(App);
