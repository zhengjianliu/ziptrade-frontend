import './App.css';
import React, {Component} from 'react'
import Navbar from './containers/Navbar'
import Homepage from './containers/Homepage'
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';
import Login from './containers/Login'
import Signup from './containers/Signup'
import {connect} from 'react-redux'
import Account from './containers/Account'
import Newlisting from './containers/Newlisting'

class App extends Component{
  state={
    items:[]
}

componentDidMount(){
    fetch('http://localhost:3000/items')
    .then(resp => resp.json())
    .then(data=>this.setState({items:data}))
}
checkinguser = () =>{
  if(this.props.user.id === undefined){
    return <Redirect to="/" />
  }
}
  render(){
    
    return (
      <Router>
        {this.checkinguser()}
        <div className="App">
          <Navbar/>
          <Route exact path="/" render={()=> <Homepage items={this.state.items}/>}/>
          <Route exact path="/signup" render={()=> (this.props.user.id!==undefined? <Redirect to="/"/>:<Signup/>)}/>
          <Route path="/login" render={()=>(this.props.user.id!==undefined? <Redirect to="/"/>:<Login/>)}/>
          <Route path="/account" render={()=> <Account items={this.state.items}/>}/>
          <Route path="/newlisting" render={()=> <Newlisting/>}/>
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
