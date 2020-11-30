import React from 'react'
import arrowup from '../images/arrowup.png'
import {connect} from 'react-redux'
import redheart from '../images/redheart.png'
import heart from '../images/heart.png'
import Item from '../components/Item'
import {Link} from 'react-router-dom'

class Showpage extends React.Component{

  itemLikefilter = item =>{
     return this.props.userFavorites.find(favoritedItem=>favoritedItem.item_id===item.id)
  }
  likeHandler = item =>{
    if(!this.itemLikefilter(item)){
      const options = {
        method: "POST",
        headers:{
          accepts: "application/json",
          "content-type": "application/json"
        },
        body: JSON.stringify({
          user_id: this.props.user.id,
          item_id: item.id
        })
      }
      fetch('http://localhost:3000/favorites',options)
      .then(resp=>resp.json())
      .then(data=>{
        this.props.likeItem(data)
      })
    }
  }

  unlikeHandler = item =>{
      let favor  = this.props.userFavorites.find(f => f.item_id ===item.id && f.user_id === this.props.user.id)
      const options = {
        method: 'DELETE'
      }
      fetch(`http://localhost:3000/favorites/${favor.id}`,options)
      .then(resp=>resp.json())
      .then(data=>{
        this.props.unlike(data)
      })
  }
  renderStore = () =>{
    let sellerItems = this.props.allItems.filter(item =>
      item.ownerId === this.props.currentItem.ownerId
    )
    return sellerItems.map(item=>
      <div className="storeitem" onClick={()=>this.props.clickHandler(item)}>
          <img className="storeimg" src={item.images[0]}/>

      </div>
    )
  }

  editClickHandler = (currentItem) =>{
    this.props.setCurrentItem(currentItem)
  }

    render(){
        return(
            <div id={this.props.fullscreen?"fullshowpage":"showpage"} className={this.props.show?"show":null}>
                <div className="arrowup" onClick={this.props.fullscreenHandler}>
                    <img src={arrowup} alt="arrowup"/>
                </div>
                <button className="closebutton" onClick={this.props.closeHandler}>X</button>

                <div className="fullleftside">
                    <img onClick={this.props.fullscreenHandler}
                      style={{cursor:"pointer"}}
                      className="itemimage"
                      alt={this.props.currentItem.name}
                      src={this.props.currentItem.length!==0?this.props.currentItem.images[0]:""}/>
                    {this.props.loggedin?
                      !this.itemLikefilter(this.props.currentItem)?
                      <img src={heart}className="heart" onClick={()=>this.likeHandler(this.props.currentItem)}/>
                      :
                      <img src={redheart} className="heart" onClick={()=>this.unlikeHandler(this.props.currentItem)}/>
                      :null}
                    <br/>
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
                          <Link to="/editlisting"><button className="editbutton" onClick={this.editClickHandler(this.props.currentItem)}>Edit</button></Link>
                        <hr/>
                        <h3>Your Name: {this.props.user.fullname}</h3>
                        <h3>Contact Info: </h3>
                        {this.props.user.displayphone?<h4>Phone: {this.props.user.phone}</h4>:null}
                        <h4>Email: {this.props.user.email}</h4>
                          <br/>
                          <h2>Your's Store:</h2>
                          <hr/>
                          <div className="sellerstore">
                              {this.renderStore()}
                          </div>
                          <button className="deletebutton" onClick={()=>this.props.deleteItemHandler(this.props.currentItem)}>
                            DELETE THIS LISTING
                          </button>
                    </div>
                    :
                    <div className="fullrightside">
                        <h2>Seller's Info:</h2>
                        <hr/>
                        <h3>Seller's Name: {this.props.currentItem.owner.fullname}</h3>
                        <h3>Contact Info: </h3>
                        {this.props.currentItem.owner.displayphone?<h4>Phone: {this.props.currentItem.owner.phone}</h4>:null}
                        <h4>Email: {this.props.currentItem.owner.email}</h4>
                        <br/>
                        <h2>Seller's Store:</h2>
                        <hr/>
                        <div className="sellerstore">
                            {this.renderStore()}
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
        user: state.user,
        loggedin: state.loggedin,
        userFavorites: state.favorites
    }
}
const mdp = dispatch =>{
  return {
    likeItem: likeditem => dispatch({type:'ADD_FAVORITE', data:likeditem }),
    unlike: unlike => dispatch({type:'UNLIKE', unlike}),
    setCurrentItem: selectedItem => dispatch({type:"CURRENT_ITEM", selectedItem})
  }
}
export default connect(msp,mdp)(Showpage)
