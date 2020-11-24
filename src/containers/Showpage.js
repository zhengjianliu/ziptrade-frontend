import React from 'react'
import arrowup from '../images/arrowup.png'
import {connect} from 'react-redux'

class Showpage extends React.Component{
    render(){
        return(
            <div id={this.props.fullscreen?"fullshowpage":"showpage"} className={this.props.show?"show":null}>
                <div className="arrowup" onClick={this.props.fullscreenHandler}>
                    <img src={arrowup}/>
                </div>
                <button className="closebutton" onClick={this.props.closeHandler}>X</button>
                
                <div className="fullleftside">
                    <img onClick={this.props.fullscreenHandler} style={{cursor:"pointer"}}className="itemimage"src={this.props.currentItem.length!==0?this.props.currentItem.images[0]:""}/>
                    <h3>Product Name: {this.props.currentItem.name}</h3>
                    <h4>Price: ${this.props.currentItem.price}</h4>
                    <h4>Condition: {this.props.currentItem.condition}</h4>
                    <h4>Category: {this.props.currentItem.category}</h4>
                    <h4>Description: {this.props.currentItem.description}</h4>
                </div>
                {this.props.fullscreen?
                    this.props.currentItem.ownerId === this.props.user.id?
                    <div className="fullrightside">
                        <h2>This is your listing:</h2>
                        <hr/>
                        <h3>Your Name: {this.props.seller.fullname}</h3>
                        <h3>Contact Info: </h3>
                        {this.props.seller.displayphone?<h4>Phone: {this.props.seller.phone}</h4>:null}
                        <h4>Email: {this.props.seller.email}</h4>
                    </div>
                    :
                    <div className="fullrightside">
                        <h2>Seller's Info:</h2>
                        <hr/>
                        <h3>Seller's Name: {this.props.seller.fullname}</h3>
                        <h3>Contact Info: </h3>
                        {this.props.seller.displayphone?<h4>Phone: {this.props.seller.phone}</h4>:null}
                        <h4>Email: {this.props.seller.email}</h4>
                        <div className="sellerstore">
                            {this.props.currentItem.ownerId}
                        </div>
                    </div>
                    :
                    null
                }
            </div>
        )
    }
}

const msp = state =>{
    return {
        user: state.user
    }
}

export default connect(msp)(Showpage)