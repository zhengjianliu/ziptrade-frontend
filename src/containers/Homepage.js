import React from 'react'
import ImageUploader from '../components/ImageUploader'

class Homepage extends React.Component{
    state={
        items:[]
    }

    componentDidMount(){
        fetch('http://localhost:3000/items')
        .then(resp => resp.json())
        .then(data=>this.setState({items:data}))
    }

    renderData = () =>{
    return this.state.items.map((item,index)=>
        <div className="item">
            <img className="itemimage" src={item.images[0]}/>
            <h1>${item.price}</h1>
        </div>
        )
    }

    render(){
        return(
            <div className="homepage">
                {/* <ImageUploader/> */}
                {/* <h1>HomePage</h1> */}
                {this.renderData()}
            </div>
        )
    }
}

export default Homepage