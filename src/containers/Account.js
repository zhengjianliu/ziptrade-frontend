import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Showpage from './Showpage'

class Account extends React.Component{
    state={
        show:false,
        fullscreen:false,
        currentItem:[]
    }
    renderListings = (items) =>{
        return items.map(item=>
            <div className="listing" onClick={()=>this.clickHandler(item)} style={{cursor:"pointer"}}>
                <div className="listingleftside">
                    <img src={item.images[0]} alt={item.name}/>
                </div>
                <div className="listingrightside">
                    <h4>Product Name: {item.name.toUpperCase()}</h4>
                    <h4>Category: {item.category}</h4>
                    <h4>Price: {item.price}</h4>
                    <h4>Condition: {item.condition}</h4>
                    <h4>Available: {item.available?"Yes":"No"}</h4>
                </div>
            </div>
        )
    }
    clickHandler = (item)=>{
        if(this.state.currentItem.id === item.id){
            this.setState({currentItem:item, show:!this.state.show})
        }else{
            this.setState({currentItem:item, show:true})
        }
    }
    closeHandler=()=>{
        this.setState({show:false,currentItem:[],fullscreen:false})
    }
    fullscreenHandler=()=>{
        this.setState({fullscreen:!this.state.fullscreen})
    }
    render(){
        return(
            <>
            {this.props.user.id!== undefined?
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
                    {this.renderListings(this.props.userItems)}
                    <h1>Favorites:</h1>
                    <div className="listingcontainer">
                        {this.renderListings(this.props.userFavorites)}
                    </div>
                </div>
                <Showpage
                currentItem={this.state.currentItem}
                show={this.state.show}
                fullscreen={this.state.fullscreen}
                fullscreenHandler = {this.fullscreenHandler}
                closeHandler={this.closeHandler}
                />
            </div>
            :
            null
            }
            </>
        )
    }
}
const msp = state =>{
    return{
        user: state.user,
        userItems: state.items,
        userFavorites: state.favorites,
    }
}
export default connect(msp)(Account)
