
import React from 'react'
import Item from './Item'

export default class ItemCategory extends React.Component{

  renderItems = () => {
      return this.props.items.map((item,index)=><Item key={index} item={item} clickHandler={this.props.clickHandler}/>)
  }

  render(){
    return(
      <div className="category">

      {this.props.items.length!== 0?
        <h1 id={this.props.items[0].category}>{this.props.items[0].category.toUpperCase()} <span>{this.props.items.length}</span></h1>
        : null}
      <div>{this.renderItems()}</div>
      </div>
    )
  }
}
