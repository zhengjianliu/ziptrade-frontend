import React, {Component} from 'react'
import menu from '../images/menu.png'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'

class Navbar extends Component{
  state={
    open: false,
  }

  clickHandler = () =>{
    this.setState({open: !this.state.open})
  }
  logoutHandler = () =>{
    this.props.userLogout()
  }
  render(){
    return(
      <div className="navbarcontainer">
      <div id="navbar">
        <div className="leftside">
          <NavLink to="/">Home</NavLink>
        </div>
        <form className="searchbar" onSubmit={(e)=>{ e.preventDefault()}}>
          <input type="text" name="searchbar" placeholder="Search..." onChange={this.props.searchHandler}/>
        </form>

        <div className="rightside">
          {this.props.loggedin?<NavLink to="/account">Account</NavLink>:null}
          {this.props.loggedin?<NavLink to="/" onClick={this.logoutHandler}>Logout</NavLink>:<NavLink to="/login">Login</NavLink>}
        </div>

        <div className="burgermenu" onClick={this.clickHandler}>
          <img src={menu} alt="menu icon"/>
        </div>
      </div>

      <div className={this.state.open? "menu open": "menu" } onClick={this.clickHandler}>
        {this.props.loggedin?<NavLink to="/account">Account</NavLink>:null}
        {this.props.loggedin?<NavLink to="/" onClick={this.logoutHandler}>Logout</NavLink>:<NavLink to="/login">Login</NavLink>}
      </div>
      </div>
    )
  }
}
const msp = state =>{
  return{
    user: state.user,
    loggedin: state.loggedin
  }
}
const mdp = dispatch =>{
  return{
    userLogout: ()=>dispatch({type:'USER_LOGOUT'})
  }
}

export default connect(msp,mdp)(Navbar)
