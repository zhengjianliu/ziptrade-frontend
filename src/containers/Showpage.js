import React from 'react'

class Showpage extends React.Component{
    state={
        items:[]
    }

    componentDidMount(){
        fetch('http://localhost:3000/items')
        .then(resp => resp.json())
        .then(data=>this.setState({items:data}))
    }

    renderData = () =>{
    return this.state.items.map((item,index)=><h1>{index+1}: ${item.price}</h1>)
    }

    render(){
        return(
            <div className="homepage">
                {/* <h1>HomePage</h1> */}
                {this.renderData()}
            </div>
        )
    }
}

export default Showpage