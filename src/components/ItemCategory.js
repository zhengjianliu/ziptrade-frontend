
import React from 'react'
import Item from './Item'

export default class ItemCategory extends React.Component{

  renderItems = () => {
    return this.props.items.map(item =><Item key={item.id} item={item}/>)
  }

  render(){
    return(
      <div className="category">
      {this.props.items.length!== 0? <h1 id={this.props.items[0].category}>{this.props.items[0].category.toUpperCase()}</h1> : null}
      <div>{this.renderItems()}</div>
      </div>
    )
  }
}