import React, {Component} from 'react'
import menu from '../images/menu.png'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import Locator from '../images/locator.png'

class Navbar extends Component{
  state={
    open: false,
    openfilter:false,
  }

  clickHandler = () =>{
    this.setState({open: !this.state.open})
  }
  filterHandler = () =>{
    this.setState({openfilter: !this.state.openfilter})
  }
  logoutHandler = () =>{
    this.props.userLogout()
  }
  render(){
    return(
      <div className="wholenavbar">
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
          {this.props.loggedin?<NavLink to="/" onClick={this.logoutHandler}>Logout</NavLink>:null}
        </div>


          {this.props.loggedin?
            <div className="burgermenu" onClick={this.clickHandler}>
              <img src={menu} alt="menu icon"/>
            </div>
            :
              <NavLink to="/login">Login</NavLink>
            }
        </div>


      <div className={this.state.open? "menu open": "menu" } onClick={this.clickHandler}>
        {this.props.loggedin?<NavLink to="/account">Account</NavLink>:null}
        {this.props.loggedin?<NavLink to="/" onClick={this.logoutHandler}>Logout</NavLink>:<NavLink to="/login">Login</NavLink>}
      </div>
      </div>
      <button id="filterbutton" onClick={this.filterHandler}>Filter {this.state.openfilter?"<":">"}</button>
      <div id="secondnav" className={this.state.openfilter?"on":null}>
        <div className="secondnavcontainer">
        <div className="secondnavleft">
        <button id="inputbutton" className={this.props.searchterm === ""? "active":null} onClick={e=>this.props.clickFilterHandler("")}>ALL</button>
        <button id="inputbutton" className={this.props.searchterm.toUpperCase() === "NEW"? "active":null} onClick={e=>this.props.clickFilterHandler("new")}>NEW</button>
        <button id="inputbutton" className={this.props.searchterm.toUpperCase() === "MINT"? "active":null} onClick={e=>this.props.clickFilterHandler("mint")}>MINT</button>
        <button id="inputbutton" className={this.props.searchterm.toUpperCase() === "GOOD"? "active":null} onClick={e=>this.props.clickFilterHandler("good")}>GOOD</button>
        <button id="inputbutton" className={this.props.searchterm.toUpperCase() === "FAIR"? "active":null} onClick={e=>this.props.clickFilterHandler("fair")}>FAIR</button>
        </div>
        <div className="secondnavright">
          <img className="locator" src={Locator} onClick={this.props.locator}/>
          <form onSubmit={(e)=>{ e.preventDefault()}}>
            <input value={this.props.zipcode}  maxlength="5" placeholder="ZIPCODE" onChange={this.props.changeHandler}/>
          </form>
        </div>
      </div>
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
