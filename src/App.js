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

  filterItem = ()=>{
    if (this.state.searchterm === ""){
      return this.state.items
    }else{
      return this.state.items.filter(
        item=>item.name.toUpperCase().includes(this.state.searchterm.toUpperCase())
      || item.category.toUpperCase().includes(this.state.searchterm.toUpperCase())
      || item.condition.toUpperCase().includes(this.state.searchterm.toUpperCase()) )
    }
  }

  searchHandler = e =>{
    e.preventDefault()
    this.setState({searchterm: e.target.value})
  }

  updateItems= item =>{
    this.setState({items:[...this.state.items, item],newItem:item})
  }

  checkinguser = () =>{
    if(this.props.loggedin===false){
      return <Redirect to="/" />
    }
  }

  deleteItemHandler= deleteditem =>{
    let newItems = this.state.items.filter(item=>item.id !== deleteditem.id)
    const options = {
      method: 'DELETE'
    }
    fetch(`http://localhost:3000/items/${deleteditem.id}`,options)
    .then(resp=>resp.json())
    .then(item=>{
      this.props.deleteItem(item)
      this.setState({items:newItems})
    })
  }

  render(){
    return (
      <Router>
        {this.checkinguser()}
        <div className="App">
          <Navbar searchHandler={this.searchHandler}/>
          <Route exact path="/" render={()=>
              <Homepage
                allItems={this.state.items}
                items={this.filterItem()}
                searchterm={this.state.searchterm}
                deleteItemHandler={this.deleteItemHandler}/>}/>
          <Route exact path="/signup" render={()=> (this.props.user.id!==undefined? <Redirect to="/"/>:<Signup/>)}/>
          <Route path="/login" render={()=>(this.props.loggedin? <Redirect to="/"/>:<Login/>)}/>
          <Route path="/account" render={()=>
              <Account
                allItems={this.state.items}
                items={this.state.items}
                newItem={this.state.newItem}
                deleteItemHandler={this.deleteItemHandler}/>}/>
          <Route path="/newlisting" render={()=> <Newlisting updateItems={this.updateItems}/>}/>
        </div>
      </Router>
    );
  }
}

const msp = state =>{
  return {
    user: state.user,
    loggedin: state.loggedin
  }
}

const mdp = dispatch =>{
  return {
    deleteItem: deletedItem => dispatch({type:'DELETE_ITEM', deletedItem})
  }
}
export default connect(msp,mdp)(App);
