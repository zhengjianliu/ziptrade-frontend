import React from 'react'
import ImageUploader from '../components/ImageUploader'
import Loader from '../components/Loader'

class Homepage extends React.Component{


    renderData = () =>{
    return this.props.items.map((item,index)=>
        <div className="item">
            <img className="itemimage" src={item.images[0]}/>
            <h1>${item.price}</h1>
        </div>
        )
    }

    render(){
        return(
            <div className="homepage">
                <Loader/>
                {/* <ImageUploader/> */}
                {/* <h1>HomePage</h1> */}
                {this.renderData()}
            </div>
        )
    }
}

export default Homepage