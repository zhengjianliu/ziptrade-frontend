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
    searchterm:"",
    items:[],
    newItem:[]
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

  filterItem = ()=>{
    if (this.state.searchterm === ""){
      return this.state.items
    }else{
      return this.state.items.filter(item=>item.name.toUpperCase().includes(this.state.searchterm.toUpperCase()) || item.category.toUpperCase().includes(this.state.searchterm.toUpperCase()) || item.condition.toUpperCase().includes(this.state.searchterm.toUpperCase()) )
    }
  }

  searchHandler = e =>{
    e.preventDefault()
    this.setState({searchterm: e.target.value})
  }

  updateItems= item =>{
    this.setState({items:[...this.state.items, item],newItem:item})
  }

  render(){
    
    return (
      <Router>
        {this.checkinguser()}
        <div className="App">
          <Navbar searchHandler={this.searchHandler}/>
          <Route exact path="/" render={()=> <Homepage items={this.filterItem()} searchterm={this.state.searchterm}/>}/>
          <Route exact path="/signup" render={()=> (this.props.user.id!==undefined? <Redirect to="/"/>:<Signup/>)}/>
          <Route path="/login" render={()=>(this.props.user.id!==undefined? <Redirect to="/"/>:<Login/>)}/>
          <Route path="/account" render={()=> <Account items={this.state.items} newItem={this.state.newItem}/>}/>
          <Route path="/newlisting" render={()=> <Newlisting updateItems={this.updateItems}/>}/>
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
