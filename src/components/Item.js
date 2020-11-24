import React from 'react'

class Item extends React.Component{

    render(){
        return(
            <div className="item" onClick={()=>this.props.clickHandler(this.props.item)}>
                <img className="itemimage" src={this.props.item.images[0]}/>
                <div className="itemrightside">
                    <h2>Price: ${this.props.item.price}</h2>
                    <h3>Condition: {this.props.item.condition.toUpperCase()}</h3>
                    <h5>Product Name:<br/> {this.props.item.name.toUpperCase()}</h5>
                    <h5>Category:<br/> {this.props.item.category.toUpperCase()}</h5>
                </div>
            </div>
        )
    }
}

export default Item