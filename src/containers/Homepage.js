import React from 'react'
import Loader from '../components/Loader'
import Item from '../components/Item'

import Showpage from './Showpage'

class Homepage extends React.Component{
    state={
        show:false,
        fullscreen:false,
        seller:[],
        currentItem:[]
    }
    renderData = () =>{
        return this.props.items.map((item,index)=><Item item={item} clickHandler={this.clickHandler}/>)
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
        return(
            <section>
            <div className="homepage">
                {this.props.items.length===0?<Loader/>:null}
                {this.renderData()}
            </div>
            <Showpage 
            currentItem={this.state.currentItem}
            show={this.state.show}
            fullscreen={this.state.fullscreen}
            seller={this.state.seller}
            fullscreenHandler = {this.fullscreenHandler}
            closeHandler={this.closeHandler}
            />
            </section>
        )
    }
}

export default Homepage