import React from 'react'

class Item extends React.Component{

    render(){
        return(
          <>
          {this.props.item.available?
            <div className="item" onClick={()=>this.props.clickHandler(this.props.item)}>
                <img className="itemimage" src={this.props.item.images[0]} alt={this.props.item.name}/>
                <div className="itemrightside">
                    <h2>Price: ${this.props.item.price}</h2>
                    <h3>Condition: {this.props.item.condition.toUpperCase()}</h3>
                    <h5>Product Name:<br/> {this.props.item.name.toUpperCase()}</h5>
                </div>
            </div>
            :
            null
          }
          </>
        )
    }
}

export default Item
