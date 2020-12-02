import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Locator from '../images/locator.png'
class Signup extends React.Component{
    state = {
        username: "",
        fullname: "",
        password: "",
        address: "",
        zipcode:"",
        city:"",
        phone:"",
        email:""
      }

      changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
      }
      locator = () =>{
        alert('This is locator helper won\'t save or share your location. Your info are protected!')
        fetch('https://freegeoip.app/json/')
        .then(resp => resp.json())
        .then(result =>{
          this.setState({

            zipcode: result.zip_code,
            city: result.city
          })
        })
      }

      submitHandler = (e) => {
        e.preventDefault()
        this.signupHandler(this.state)
      }
      signupHandler = (newUserInfo) =>{
        fetch("http://localhost:3000/users",{
          method: "POST",
          headers:{
            accepts: "application/json",
            "content-type": "application/json"
          },
          body: JSON.stringify({user: newUserInfo})
        })
        .then(resp=>resp.json())
        .then(data=>{
            this.props.userLogin(data)
            this.setState({
              username: "",
              fullname: "",
              password: "",
              address: "",
              zipcode:"",
              city:"",
              phone:"",
              email:""
            })
        })
      }

    render(){
        return(
            <div className="logincontainer signupcontainer">
                <form onSubmit={this.submitHandler}>
                    <h3>Sign Up</h3>
                    <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.changeHandler} required/>
                    <input type="text" name="fullname" placeholder="fullname" value={this.state.fullname} onChange={this.changeHandler} required/>
                    <input type="password" name="password" placeholder="password" onChange={this.changeHandler} value={this.state.password} required/>
                    <input type="text" name="address" placeholder="address" value={this.state.address} onChange={this.changeHandler} required/>
                    <input type="text" id="city" name="city" placeholder="city" value={this.state.city} onChange={this.changeHandler} required/>
                    <input type="text" id="zipcode" name="zipcode" placeholder="zipcode" value={this.state.zipcode} onChange={this.changeHandler} required/>
                    <img className="locator" src={Locator} onClick={this.locator} alt="location helper"/>
                    <input type="phone" name="phone"  pattern="[0-9]{3}[0-9]{3}[0-9]{4}" placeholder="phone format 1234567890" value={this.state.phone} onChange={this.changeHandler} required/>
                    <input type="email" name="email" placeholder="email" value={this.state.email} onChange={this.changeHandler} required/>
                    <button className="loginbutton" type="submit">Register</button>
                    <Link to="/login"><button className="loginbutton signupbutton">Go Back</button></Link>
                </form>
            </div>
        )
    }
}
const mdp = dispatch =>{
  return{
    userLogin: user => dispatch({type:'USER_LOGIN', payload: user})
  }
}
export default connect(null,mdp)(Signup)
