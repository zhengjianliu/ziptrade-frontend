import React, {Component} from 'react'
import menu from '../images/menu.png'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Locator from '../images/locator.png'
import Account from '../images/account.png'
import Loggin from '../images/loggin.png'
import Logout from '../images/logout.png'
import Home from '../images/home.png'
import { Switch, Route } from 'react-router-dom';
class Navbar extends Component{
  state={
    open: false,
    openfilter:true,
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
          <Link to="/"><img src={Home} alt="Home" className="homeicon"/></Link>
        </div>
        <form className="searchbar" onSubmit={(e)=>{ e.preventDefault()}}>
          <input type="text" name="searchbar" placeholder="Search..." onChange={this.props.searchHandler}/>
        </form>

        <div className="rightside">
          {this.props.loggedin?<Link to="/account"><img src={Account} alt="Account" className="accounticon"/></Link>:null}
          {this.props.loggedin?<Link to="/" onClick={this.logoutHandler}><img src={Logout} alt="Logout" className="logouticon"/></Link>:null}
        </div>


          {this.props.loggedin?
            <div className="burgermenu" onClick={this.clickHandler}>
              <img src={menu} alt="menu icon"/>
            </div>
            :
              <Link to="/login"><img src={Loggin} alt="Loggin" className="logginicon"/></Link>
            }
        </div>


      <div className={this.state.open? "menu open": "menu" } onClick={this.clickHandler}>
        {this.props.loggedin?<Link to="/account"><img src={Account} alt="Account" className="accounticon"/></Link>:null}
        {this.props.loggedin?<Link to="/" onClick={this.logoutHandler}><img src={Logout} alt="Logout" className="logouticon"/></Link>:<Link to="/login"><img src={Loggin} alt="Loggin"/></Link>}
      </div>
      </div>

      <Switch>
        <Route exact path="/" render={()=>
          <>
            <button id="filterbutton" onClick={this.filterHandler}>Filter {this.state.openfilter?"X":">"}</button>
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
                <img className="locator" src={Locator} onClick={this.props.locator} alt="locator"/>
                <form onSubmit={(e)=>{ e.preventDefault()}}>
                  <input value={this.props.zipcode}  maxlength="5" placeholder="ZIPCODE" onChange={this.props.changeHandler}/>
                </form>
              </div>
            </div>
            </div>
          </>
          }/>

      </Switch>

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
