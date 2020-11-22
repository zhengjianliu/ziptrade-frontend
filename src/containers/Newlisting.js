import React, {Component} from 'react'
import ImageUploader from '../components/ImageUploader'
import {connect} from 'react-redux'

class Newlisting extends Component{
    state={
        name:"",
        category:"",
        price:"",
        description:"",
        condition:"",
        images: []
    }

    getImages = (image)=>{
        this.setState({images:[...this.state.images, image]})
    }

    changeHandler= e =>{
        this.setState({[e.target.name]: e.target.value})
    }

    imageDeleteHandler = (images)=>{
        this.setState({images:images})
    }
    render(){
        console.log(this.state)
        return(
            <div className="accountpage">
                <div className="accountleftside">
                    <h1>Image Uploader:</h1>
                    <small>Maxmium image size: 2MB</small>
                    <br/>
                    <br/>
                    <ImageUploader getImages={this.getImages} imageDeleteHandler={this.imageDeleteHandler}/>
                </div>

                <div className="accountrightside">
                    <form id="newlisitingform">
                        <label className="labelname">Product Name: </label>
                        <br/>
                        <input className="inputbox" type="text" name="name" placeholder="Product Name" value={this.state.name} onChange={this.changeHandler} required/>

                        <br/>
                        <label className="labelname">Price: </label>
                        <br/>
                        <input className="inputbox" type="number" name="price" placeholder="Price" value={this.state.price} onChange={this.changeHandler} required/>

                        <br/>
                        <label for="category" className="labelname">Choose a Category: </label>
                        <br/>
                        <select className="inputbox" name="category" id="category" form="newlisitingform" value={this.state.category} onChange={this.changeHandler} required>
                            <option value="">...</option>
                            <option value="electronic">Electronic</option>
                            <option value="smartphone">Smart Phone</option>
                            <option value="laptop">Laptop</option>
                            <option value="camera">Camera</option>
                            <option value="car">Car</option>
                            <option value="art">Art</option>
                            <option value="furniture">Furniture</option>
                            <option value="accessories">Accessories</option>
                            <option value="others">Others</option>
                        </select>

                        <br/>
                        <label for="condition" className="labelname">Condition: </label>
                        <br/>
                        <select className="inputbox" name="condition" id="condition" form="newlisitingform" value={this.state.condition} onChange={this.changeHandler} required>
                            <option value="new">New</option>
                            <option value="mint">Mint</option>
                            <option value="good">Good</option>
                            <option value="fair">Fair</option>
                        </select>

                        <br/>
                        <label className="labelname">Description: </label>
                        <br/>
                        <textarea className="inputarea" type="text" name="description" placeholder="Description" value={this.state.description} onChange={this.changeHandler} required/>
                        <button type="submit" className="loginbutton">Create</button>
                    </form>
                </div>
            </div>
        )
    }
}
const msp = state =>{
    return {
        images: state.images
    }
}

export default connect(msp)(Newlisting)