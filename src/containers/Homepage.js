import React from 'react'
import Loader from '../components/Loader'
import Item from '../components/Item'

import Showpage from './Showpage'

class Homepage extends React.Component{
    state={
        show:false,
        fullscreen:false,
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
    }
    closeHandler=()=>{
        this.setState({show:false,currentItem:[],fullscreen:false})
    }
    fullscreenHandler=()=>{
        this.setState({fullscreen:!this.state.fullscreen})
    }
    renderLoader = () =>{
        if(this.props.items.length===0){
            if(this.props.searchterm===""){
                return <Loader/>
            }
        }
    }

    render(){
      console.log(this.state.currentItem)
        return(
            <section>
            <div className="homepage">
                {this.renderLoader()}
                {this.renderData()}
            </div>
            <Showpage
              allItems={this.props.allItems}
              currentItem={this.state.currentItem}
              show={this.state.show}
              fullscreen={this.state.fullscreen}
              fullscreenHandler = {this.fullscreenHandler}
              closeHandler={this.closeHandler}
              clickHandler={this.clickHandler}
            />
            </section>
        )
    }
}

export default Homepage
