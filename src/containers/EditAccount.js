import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Locator from '../images/locator.png'
import {withRouter} from 'react-router-dom'

class EditAccount extends React.Component{
    state = {
      id:this.props.user.id,
      username: this.props.user.username,
      fullname: this.props.user.fullname,
      password: this.props.user.password,
      address: this.props.user.address,
      zipcode:this.props.user.zipcode,
      city:this.props.user.city,
      displayphone: this.props.user.displayphone,
      phone:this.props.user.phone,
      email:this.props.user.email
      }

      changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
      }
      displayHandler = () =>{
        this.setState({displayphone:!this.state.displayphone})
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
        this.updateHander(this.state)
      }

      updateHander = (newInfo) =>{
        const options ={
          method: "PATCH",
          headers: {
              "content-type": "application/json",
              accepts: "application/json"
          },
          body: JSON.stringify({
              user: {
                id: newInfo.id,
                username: newInfo.username,
                fullname: newInfo.fullname,
                password: newInfo.password,
                address: newInfo.address,
                zipcode:newInfo.zipcode,
                city:newInfo.city,
                displayphone: newInfo.displayphone,
                phone:newInfo.phone,
                email:newInfo.email,
              }
          })
        }
        fetch(`http://localhost:3000/users/${this.props.user.id}`,options)
        .then(resp=>resp.json())
        .then(updatedInfo=>{
          this.props.updateInfo(updatedInfo)
          console.log(updatedInfo)
        })
        this.props.history.push('/account')

      }


      render(){
        return(
          <div className="logincontainer signupcontainer editform">
            <form className="edituserform" onSubmit={this.submitHandler.bind(this)}>
              <h3>Edit User Info</h3>
              <hr/>
              <br/>
              <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.changeHandler} required/>
              <input type="text" name="fullname" placeholder="fullname" value={this.state.fullname} onChange={this.changeHandler} required/>
              <input type="text" name="address" placeholder="address" value={this.state.address} onChange={this.changeHandler} required/>
              <input type="text" id="city" name="city" placeholder="city" value={this.state.city} onChange={this.changeHandler} required/>
              <input type="text" id="zipcode" name="zipcode" placeholder="zipcode" value={this.state.zipcode} onChange={this.changeHandler} required/>
              <img className="locator"src={Locator} onClick={this.locator} alt="location helper"/>
              <input type="phone" name="phone"  pattern="[0-9]{3}[0-9]{3}[0-9]{4}" placeholder="phone format 1234567890" value={this.state.phone} onChange={this.changeHandler} required/>
              <div onClick={this.displayHandler} className={this.state.displayphone?"displayphone":"hidephonenumber"}>Display Phone Number: {this.state.displayphone?"YES":"NO"}</div>
              <input type="email" name="email" placeholder="email" value={this.state.email} onChange={this.changeHandler} required/>
              <button type="submit" className="loginbutton">Update</button>
            </form>
          </div>
        )
      }
    }

const msp = state =>{
  return{
    user: state.user
  }
}

const mdp = dispatch=>{
  return{
    updateInfo: newUserInfo => dispatch({type:"UPDATE_USER", newUserInfo})
  }
}
export default connect(msp,mdp)(withRouter(EditAccount))
