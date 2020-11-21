import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { Route, Redirect } from 'react-router'

class Login extends React.Component{
    state = {
        username: "",
        password: "",
      }

      changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
      }
    
      submitHandler = (e) => {
        e.preventDefault()
        this.loginHandler(this.state)
      }

      loginHandler = (userInfo) =>{
        fetch("http://localhost:3000/login",{
          method: "POST",
          headers:{
            accepts: "application/json",
            "content-type": "application/json"
          },
          body: JSON.stringify({user: userInfo})
        })
        .then(resp=>resp.json())
        .then(data=>{
          if(data.user){
            this.props.userLogin(data)
            this.setState({
              username: "",
              password: ""
            })
          }else{
            console.log('failed to login')
            this.setState({
              username: "",
              password:""
            })
          }
        })
      }

    render(){
        return(
            <div className="logincontainer">
                <form onSubmit={this.submitHandler}>
                    <h3>Login</h3>
                    <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.changeHandler} required/>
                    <br/>
                    <input type="password" name="password" placeholder="password" onChange={this.changeHandler} value={this.state.password} required/>
                    <br/>
                    <button className="loginbutton" type="submit">Login</button>
                    <Link to="/signup"><button className="loginbutton signupbutton">SignUp</button></Link>
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
export default connect(null,mdp)(Login)