import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { Route, Redirect } from 'react-router'
import { Favorite } from '@material-ui/icons'

class Login extends React.Component{
    renderListings = (items) =>{
        return items.map(item=>
            <div className="listing">
                <div className="listingleftside">
                    <img src={item.images[0]}/>
                </div>

                <div className="listingrightside">
                    <h4>Product Name: {item.name.toUpperCase()}</h4>
                    <h4>Category: {item.category}</h4>
                    <h4>Price: {item.price}</h4>
                    <h4>Condition: {item.condition}</h4>
                    <h4>Available: {item.available?"Yes":"no"}</h4>
                    <h4>Visiable: {item.visiable?"Yes":null}</h4>
                    <h4>Created At: {item.created_at}</h4>
                </div>
            </div>
        )
    }
    renderFavorites = () =>{
        let favorites = []
        this.props.items.forEach(item=>{
            this.props.user.favorites.forEach(favorite=>{
                if(item.id === favorite.item_id){
                    favorites.push(item)
                }
            })
        })
        return favorites
    }
    render(){
        return(
            <div className="accountpage">
                <div className="accountleftside">
                    <h1>Account Info: </h1>
                    <h3>Username: {this.props.user.username.toUpperCase()}</h3>
                    <h3>Fullname: {this.props.user.fullname.toUpperCase()}</h3>
                    <h3>Address: {this.props.user.address.toUpperCase()}</h3>
                    <h3>Zip Code: {this.props.user.zipcode}</h3>
                    <h3>city: {this.props.user.city.toUpperCase()}</h3>
                    <h3>Phone Number: {this.props.user.phone}</h3>
                    <h3>Displayphone: {this.props.user.displayphone?"yes":"no"}</h3>
                    <h3>Email: {this.props.user.email.toUpperCase()}</h3>
                    <button className="loginbutton">Edit</button>
                    <br/>
                    <br/>
                </div>
            
                <div className="accountrightside">
                    <Link to="/newlisting"><button className="loginbutton newlistingbutton">+ New Listing</button></Link>
                    <h1>Listings:</h1>
                    <br/>
                    <br/>
                    {this.renderListings(this.props.user.items)}
                    <h1>Favorites:</h1>
                    {this.renderListings(this.renderFavorites())}
                </div>
            </div>
        )
    }
}
const msp = state =>{
    return{
        user: state.user
    }
}
export default connect(msp)(Login)