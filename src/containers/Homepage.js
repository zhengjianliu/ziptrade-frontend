import React from 'react'
import Loader from '../components/Loader'
import Item from '../components/Item'
import arrowup from '../images/arrowup.png'

class Homepage extends React.Component{
    state={
        currentItem:[],
        show:false,
        fullscreen:false,
        seller:[]
    }
    renderData = () =>{
        return this.props.items.map((item,index)=><Item item={item} clickHandler={this.clickHandler}/>)
    }
    locator = () =>{
        fetch('https://freegeoip.app/json/')
        .then(resp => resp.json())
        .then(result => console.log(result))
    }

    clickHandler = (item)=>{
        if(this.state.currentItem.id === item.id){
            this.setState({currentItem:item, show:!this.state.show})
        }else{
            this.setState({currentItem:item, show:true})
        }

        fetch('http://localhost:3000/users')
        .then(resp=>resp.json())
        .then(users=>{
            if(users){
                let seller = users.find(user=>user.id === this.state.currentItem.ownerId)
                this.setState({seller:seller})
            }
        })
        
    }
    closeHandler=()=>{
        this.setState({show:false,currentItem:[],fullscreen:false})
    }
    fullscreenHandler=()=>{
        this.setState({fullscreen:!this.state.fullscreen})
    }

    render(){
        console.log(this.state.seller)
        return(
            <section>
            <div className="homepage">
                {this.renderData()}
            </div>
            
            <div id={this.state.fullscreen?"fullshowpage":"showpage"} className={this.state.show?"show":null}>
                <div className="arrowup" onClick={this.fullscreenHandler}>
                    <img src={arrowup}/>
                </div>
                <button className="closebutton" onClick={this.closeHandler}>X</button>
                
                <div className="fullleftside">
                    <img onClick={this.fullscreenHandler} style={{cursor:"pointer"}}className="itemimage"src={this.state.currentItem.length!==0?this.state.currentItem.images[0]:""}/>
                    <h3>Product Name: {this.state.currentItem.name}</h3>
                    <h4>Price: ${this.state.currentItem.price}</h4>
                    <h4>Condition: {this.state.currentItem.condition}</h4>
                    <h4>Category: {this.state.currentItem.category}</h4>
                    <h4>Description: {this.state.currentItem.description}</h4>
                </div>
                {this.state.fullscreen?
                    <div className="fullrightside">
                        <h2>Seller's Info:</h2>
                        <hr/>
                        <h3>Seller's Name: {this.state.seller.fullname.toUpperCase()}</h3>
                        <h3>Contact Info: </h3>
                        {this.state.seller.displayphone?<h4>Phone: {this.state.seller.phone}</h4>:null}
                        <h4>Email: {this.state.seller.email.toUpperCase()}</h4>
                    </div>
                    :
                    null
                }
            </div>
            </section>
        )
    }
}

export default Homepage