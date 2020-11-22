import React, {Component} from 'react'
import { connect } from 'react-redux';

class ImageUploader extends Component{
    state={
        images:[]
    }
    onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                e.preventDefault()
                this.setState({images: [...this.state.images, e.target.result]});
                this.props.getImages(e.target.result)
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    deleteHandler = (imageLink) =>{
        let index = this.state.images.findIndex(image => image === imageLink)
        this.state.images.splice(index,1)
        this.setState({images: this.state.images})
        this.props.imageDeleteHandler(this.state.images)
    }

    previewImages = () =>{
        return this.state.images.map(image=> 
            <div class="container">
                <img className="image" src={image} alt="image"/>
                <div class="overlay" onClick={()=>this.deleteHandler(image)}>
                    <div class="text">Delete</div>
                </div>
            </div>
        )
    }

    submitHandler = e =>{
        e.preventDefault()
        this.props.addImages(this.state)
        this.props.getImages(this.state)
        this.setState({images:[]})
    }

    render(){
        console.log(this.state.images)
        return (
            <div className="App">
                <form onSubmit={event => this.submitHandler(event)}> 
                <input type="file" onChange={this.onImageChange} className="uploadbutton" id="file"/>
                <label for="file" class="uploadbutton" onChange={this.onImageChange} >Upload Images</label>
                <br/>
                
                {/* {this.state.images.length === 0 ? null:<button type="submit">Upload</button>} */}
                
                </form>
                {this.previewImages()}
                
            </div>
            
        );
    }
}
const mdp = dispatch =>{
    return {
        addImages: images=>dispatch({type:'UPLOAD_IMAGE', payload: images})
    }
}

export default connect(null, mdp)(ImageUploader)