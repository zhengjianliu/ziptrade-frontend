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
  render(){
    return(
      <div className="navbarcontainer">
      <div id="navbar">
        <div className="leftside">
          <NavLink to="/">Home</NavLink>
        </div>
        <form className="searchbar">
          <input type="text" name="searchbar" placeholder="Search..."/>
        </form>

        <div className="rightside">
          <NavLink to="/login">Account</NavLink>
          <NavLink to="/login">Login</NavLink>
        </div>

        <div className="burgermenu" onClick={this.clickHandler}>
          <img src={menu} />
        </div>
      </div>

      <div className={this.state.open? "menu open": "menu" } >
        <NavLink to="/login" onClick={this.clickHandler}>Account</NavLink>
        <NavLink to="/login" onClick={this.clickHandler}>Login</NavLink>
      </div>
      </div>
    )
  }
}
const msp = () =>{

}

export default connect(msp)(Navbar)