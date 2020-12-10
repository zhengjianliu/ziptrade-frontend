import React, {Component} from 'react'
import ImageUploader from '../components/ImageUploader'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class EditListing extends Component{
    state={
        name:this.props.currentItem.name,
        category:this.props.currentItem.category,
        price:this.props.currentItem.price,
        description:this.props.currentItem.description,
        available: this.props.currentItem.available,
        condition:this.props.currentItem.condition,
        images: this.props.currentItem.images,
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

    submitHandler = e =>{
        e.preventDefault()
        const options ={
            method: "PATCH",
            headers: {
                "content-type":"application/json",
                "accept":"application/json"
            },
            body: JSON.stringify({
                id:this.props.currentItem.id,
                name: this.state.name,
                category: this.state.category,
                ownerId: this.props.user.id,
                price: this.state.price,
                available: this.state.available,
                description: this.state.description,
                condition: this.state.condition,
                images: this.state.images,
            })
        }
        fetch(`https://zip-trade-api.herokuapp.com/items/${this.props.currentItem.id}`,options)
        .then(resp=>resp.json())
        .then(newlisting=>{
            this.props.updateEditedItem(newlisting)
            this.props.updateItem(newlisting)
        })
        this.props.history.push('/')
    }

    displayHandler = () =>{
      this.setState({available:!this.state.available})
    }

    render(){
        return(
            <div className="accountpage">
                <div className="accountleftside">
                    <h1>Image Uploader:</h1>
                    <small>Maxmium image size: 2MB</small>
                    <br/>
                    <br/>
                    <ImageUploader images={this.state.images} getImages={this.getImages} imageDeleteHandler={this.imageDeleteHandler}/>
                </div>

                <div className="accountrightside">
                    <form id="newlisitingform" onSubmit={this.submitHandler.bind(this)}>
                        <label className="labelname">Product Name: </label>
                        <br/>
                        <input className="inputbox" type="text" name="name" maxlength="20" placeholder="Product Name" value={this.state.name} onChange={this.changeHandler} required/>

                        <br/>
                        <label className="labelname">Price: </label>
                        <br/>
                          <input className="inputbox" type="number" name="price"  min="0" max="999999" placeholder="Price" value={this.state.price} onChange={this.changeHandler} required/>
                          <br/>
                        <label for="category" className="labelname">Choose a Category: </label>
                        <br/>
                        <select className="inputbox" name="category" id="category" form="newlisitingform" value={this.state.category} onChange={this.changeHandler} required>
                            <option value="">Choose a category</option>
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
                            <option value="">Choose a condition</option>
                            <option value="new">New</option>
                            <option value="mint">Mint</option>
                            <option value="good">Good</option>
                            <option value="fair">Fair</option>
                        </select>
                        <br/>
                        <br/>
                        <div onClick={this.displayHandler} className={this.state.available?"displayphone":"hidephonenumber"}>Hide this item: {this.state.available?"NO":"YES"}</div>

                        <br/>
                        <label className="labelname">Description: </label>
                        <br/>
                        <textarea className="inputarea" type="text" name="description" placeholder="Description"  maxlength="300" value={this.state.description} onChange={this.changeHandler} required/>
                        {this.state.name!=="" &&
                            this.state.category!==""&&
                            this.state.price!=="" &&
                            this.state.condition!==""&&
                            this.state.description!==""&&
                            this.state.images.length!==0?
                        <button type="submit" className="loginbutton">Update</button>
                        :
                        null
                        }
                    </form>
                </div>
            </div>
        )
    }
}

const msp = state =>{
    return{
        user:state.user,
        currentItem: state.currentItem,
    }
}
const mdp = dispatch =>{
    return{
      updateItem: updatedItem => dispatch({type:'UPDATE_EDITED_ITEM', updatedItem})
    }
}
export default connect(msp,mdp)(withRouter(EditListing))
